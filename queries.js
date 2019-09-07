const Pool = require('pg').Pool
const pool = new Pool({
    user: 'hackathon',
    host: 'localhost',
    database: 'travelhack',
    password: 'sourav1995',
    port: 5432,
})

// Profile Page APIs
const getUserDetailsById = (request, response) =>  {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserCategoriesById = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT categories.id, categories.name FROM user_categories INNER JOIN categories on user_categories.category_id = categories.id WHERE user_categories.user_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserCitiesById = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT cities.id, cities.name, cities.city_pic FROM user_cities INNER JOIN cities on user_cities.city_id = cities.id WHERE user_cities.user_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserPlaces = (request, response) => {
    const userId = parseInt(request.query.userId)
    const cityId = parseInt(request.query.cityId)
    
    pool.query('SELECT places.id, places.name, places.bounty_points, user_places.rating FROM user_places INNER JOIN places on user_places.place_id = places.id WHERE user_places.user_id = $1 AND user_places.city_id = $2', [userId, cityId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUserDetailsById,
    getUserCategoriesById,
    getUserCitiesById,
    getUserPlaces
}