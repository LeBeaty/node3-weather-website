const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibGVjYXJsb2IiLCJhIjoiY2swNXVndXAxMDBpYjNjb3Rmd3Z2OWc4OCJ9.ZUNmE4-3Nl5eLgA5U0sVBQ&limit=1'
    
    request({ url, json: true}, (error, {body}) => {       //response was deconstructed for body
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }) 
}

module.exports = geocode