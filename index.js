const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 8080


let cities = [
    {
        id: 0,
        name: 'Sadat City',
        location: { long: 12.0, lat: 25.0 },
        rating: 7.5,
    },
    {
        id: 1,
        name: '6th October',
        location: { long: 30.5, lat: 124.0 },
        rating: 8,
    },
    {
        id: 2,
        name: 'Cairo',
        location: { long: 32.4, lat: 146.2 },
        rating: 9,
    },
]

app.listen(port, (req, res) => {
    console.log(`Listening at port ${port}`)
})

app.get('/cities', (req, res) => {
    res.json(cities)
})

app.get('/cities/:id', (req, res) => {
    res.json(cities[req.params.id])
})

app.post('/cities', (req, res) => {
    if (req.body != null) {
        cities.push(req.body)
        res.send(JSON.stringify(req.body))
    }
})
app.put('/cities/:id', (req, res) => {
    if (req.body == null) return;
    let index = -1
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) return;
    cities[index] = req.body
    res.send(JSON.stringify(cities[index]))
})