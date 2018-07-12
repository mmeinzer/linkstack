const scrapeLinks = require('./index.js')

test('Returns an array of links with linksTo property', () => {
  const site = 'http://www.coffeebrewguides.com/5-ways-coffee-harvesting-and-processing-affects-your-brew/'
  const hostnames = ['www.triplebarcoffee.com', 'triplebarcoffee.com']
  scrapeLinks(site, hostnames)
    .then(res => expect(res[0]).toHaveProperty('linksTo'))
    .catch(err => console.log(err))
})