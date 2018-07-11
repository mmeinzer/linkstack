const axios = require('axios');
const cheerio = require('cheerio');
const URL = require('url').URL

const targetUrl = 'http://camanoislandcoffee.com/what-the-heck-is-cascara/';
const hostnameToFind = 'www.triplebarcoffee.com';

axios.get(targetUrl)
  .then(res => {
    res.timeStamp = Date.now()
    return res
  })
  .then(res => parse(hostnameToFind, res))
  .catch(err => console.error(err))

function parse(hostnameToFind, res) {
  const { data, timeStamp } = res
  const $ = cheerio.load(data);
  $('a[href!=""]:not([href^=#],[href^="/"])').each(getLinkDetails)
  
  function getLinkDetails(i, ele) {
    const { href, rel } = ele.attribs
    const hostname = new URL(href).hostname.toLowerCase()
    const isMatch = hostnameToFind.toLowerCase() === hostname
    let link = null
    if (isMatch) {
      link = {
        parentPage: targetUrl,
        hostname: hostnameToFind,
        linksTo: href,
        anchorText: $(ele).text().trim(),
        isNoFollow: rel === 'nofollow',
        lastSeen: timeStamp
      }
      console.log(link)
    }
    return link
  }
}
