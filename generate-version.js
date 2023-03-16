const fs = require('fs')
const packageJson = require('./package.json')

const appVersion = packageJson.version
const jsonData = JSON.stringify({ version: appVersion })

fs.writeFile('./public/meta.json', jsonData, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to meta.json')
    return console.log(err)
  }
  console.log(`meta.json file has been saved with version number ${appVersion}`)
})
