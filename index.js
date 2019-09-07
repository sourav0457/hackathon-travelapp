const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({
        info: "It's working!"
    })
})

app.get('/getUserDetailsById/:id', db.getUserDetailsById)
app.get('/getUserCategoriesById/:id', db.getUserCategoriesById)
app.get('/getUserCitiesById/:id', db.getUserCitiesById)
app.get('/getUserPlaces', db.getUserPlaces)

app.listen(port, () => {
    console.log(`App is running on port ${port}.`)
})
