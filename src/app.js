const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')    
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {    // This uses the hbs file to render a template
    res.render('index', {       //main index page
        title:'Weather',
        name: 'Me Homie'
    })      
}) 

app.get('/about', (req, res) => { // about page make sure to add / before page name
    res.render('about', {
        title: 'About the app',
        name: 'Me Fool'        
    })
})

app.get('/help', (req, res) => { // help page make sure to add / before page name
    res.render('help', {
       title: 'This is the help shit',
       name: 'The Masta'
        
    })
}) 

app.get('/weather', (req, res) => {   //app.com/weather
    if (!req.query.address) {          //asking for a query input
        return res.send({
            error: 'You must provide an address'
        })
    }    

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send( { error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({                          // res.send print the text to screen
    //     Forecast: 'Today will be cloudy with a small chance of rain',
    //     location: 'Baltimore',
    //     address: req.query.address      //Gets additional info into page with a query. 
    //     })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {      // Help 404 page for help articles
    res.render('404', {
        title: '404',
        name: 'LeCarlo',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {   // Setting 404 page comes last because request search in order.
    res.render('404', {         //wildcard used to match wide range of links that may not exist.
        title: '404',
        name: 'LeCarlo',
        errorMessage: 'Page not found'
    })
})


//starts the webserver up
app.listen(port, () => {                    
    console.log('Server is up on port' + port)
})
