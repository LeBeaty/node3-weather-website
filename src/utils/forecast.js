const request = require('request')

const forecast = (latitude, longitude, callback) => { 
    const url = 'https://api.darksky.net/forecast/27f94c7a9d6b524d4898f3c4f4547bde/'+ latitude +','+ longitude +''

    request({ url, json: true}, (error, { body }) => {               // response was deconstructed for body
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another search!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })   
}

module.exports = forecast