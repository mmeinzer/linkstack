const axios = require('axios');
const cheerio = require('cheerio');
const URL = require('url').URL

function scrapeAndParse(targetUrl, hostnamesToFind) {
  const config = {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    }
  }

  const promise = new Promise((resolve, reject) => {
    axios.get(targetUrl, config)
      .then(res => {
        res.timeStamp = Date.now()
        return res
      })
      .then(res => parse(res))
      .then(links => resolve(links))
      .catch(err => {
        return reject(err)
      })
  })

  return promise

  function parse(res) {
    const { status, data, timeStamp } = res;
    const $ = cheerio.load(data);
    const title = $("title").text();
    const links = [];
    $('a[href!=""]:not([href^=#],[href^="/"])').each(getLinkDetails);
    const page = {
      url: targetUrl,
      dateScraped: timeStamp,
      doFollowLinks: links.reduce(makeCountLinksReducer(), 0),
      noFollowLinks: links.reduce(makeCountLinksReducer({type: 'nofollow'}), 0),
    };
    return {page, links}

    function getLinkDetails(i, ele) {
      const { href, rel } = ele.attribs
      const linkHostname = new URL(href).hostname.toLowerCase()
      const isMatch = hostnamesToFind
        .map(hostname => hostname.toLowerCase())
        .includes(linkHostname)
      if (isMatch) {
        const link = {
          parentPageUrl: targetUrl,
          parentPageTitle: title,
          hostname: linkHostname,
          linksTo: href,
          anchorText: $(ele).text().trim(),
          isNoFollow: rel === 'nofollow',
          lastSeen: timeStamp,
          status
        };
        links.push(link);
      }
    }
  }
}

function makeCountLinksReducer(config) {
  let countFollow = true;
  if (config) {
    countFollow = config.type !== 'nofollow'
  }
  function countLinks(tot, curr) {
    if (!curr.isNoFollow && countFollow) {
      tot++;
    } else if (curr.isNoFollow && !countFollow) {
      tot++;
    }
    return tot
  }
  return countLinks
}

module.exports = scrapeAndParse