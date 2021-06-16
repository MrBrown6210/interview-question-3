const https = require('https')

if (process.argv.length !== 3) return console.error('need argument')
const searchText = process.argv.slice(2)[0]

https.get('https://codequiz.azurewebsites.net/', {
    headers: {
        "Cookie": 'hasCookie=true'
    }
}, (resp) => {
    let data = ''
    resp.on('data', (chunk) => {
        data += chunk
    })
    resp.on('end', () => {
        // console.log(data)
        search(data)
    })
})

const search = (data = '') => {
    let index = data.indexOf(searchText)
    if (index < 0) return console.log('not found')
    let result = data.slice(index)
    // find next <td>
    index = result.indexOf('<td>') + 4
    result = result.slice(index)
    index = result.indexOf('</td>')
    result = result.slice(0, index)
    console.log(result)
}
