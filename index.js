const express = require('express')
const bodyParser = require('body-parser')
const app = express()
let cities = require('./model/cities').cities
let jobs = require('./model/jobs').jobs
let services = require('./model/services').services
let housingOffers = require('./model/housing').housingOffers
let cafe = require('./model/cafes').cafes
let education = require('./model/education').education
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 8081



// Cities routes
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

app.delete('/cities/:id', (req, res) => {
    let deleteCity = undefined
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].id == req.params.id) {
            deleteCity = cities[i]
            cities.splice(i, 1)
        }
    }
    res.send(JSON.stringify(deleteCity))
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

// Jobs routes
app.get('/jobs', (req, res) => {
    res.json(jobs)
})
app.get('/jobs/:id', (req, res) => {
    for (const job of jobs) {
        if (job.id == req.params.id) {
            res.json(job)
        }
    }
})
app.get('/cities/:id/jobs', (req, res) => {
    let requestedJobs = []
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].city == cities[req.params.id].name) {
            requestedJobs.push(jobs[i])
        }
    }
    res.send(JSON.stringify(requestedJobs))
})
app.post('/jobs', (req, res) => {
    if (req.body != null) {
        jobs.push(req.body)
        res.send(JSON.stringify(req.body))
    }
})
app.delete('/jobs/:id', (req, res) => {
    let deleteJob = undefined
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].id == req.params.id) {
            deleteJob = jobs[i]
            jobs.splice(i, 1)
        }
    }
    res.send(JSON.stringify(deleteJob))
})
app.put('/jobs/:id', (req, res) => {
    if (req.body == null) return;
    let index = -1
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) return;
    jobs[index] = req.body
    res.send(JSON.stringify(jobs[index]))
})

// Services routes
app.get('/cities/:id/services', (req, res) => {
    let requestedServices = []
    for (let i = 0; i < services.length; i++) {
        if (services[i].city == cities[req.params.id].name) {
            requestedServices.push(services[i])
        }
    }
    res.send(JSON.stringify(requestedServices))
})
app.get('/cities/:id/services/:type', (req, res) => {
    let requestedServices = []
    for (let i = 0; i < services.length; i++) {
        if (services[i].city == cities[req.params.id].name && services[i].type == req.params.type) {
            requestedServices.push(services[i])
        }
    }
    res.send(JSON.stringify(requestedServices))
})
app.get('/services/:id', (req, res) => {
    for (const service of services) {
        if (service.id == req.params.id) {
            res.json(service)
        }
    }
})
app.post('/services', (req, res) => {
    if (req.body != null) {
        services.push(req.body)
        res.send(JSON.stringify(req.body))
    }
})
app.put('/services/:id', (req, res) => {
    if (req.body == null) return;
    let index = -1
    for (let i = 0; i < services.length; i++) {
        if (services[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) return;
    services[index] = req.body
    res.send(JSON.stringify(services[index]))
})
app.delete('/services/:id', (req, res) => {
    let deleteService = undefined
    for (let i = 0; i < services.length; i++) {
        if (services[i].id == req.params.id) {
            deleteService = services[i]
            services.splice(i, 1)
        }
    }
    res.send(JSON.stringify(deleteService))
})


// Housing offers routes
app.get('/offers', (req, res) => {
    res.json(housingOffers)
})
app.get('/offers/:id', (req, res) => {
    for (const offer of housingOffers) {
        if (offer.id == req.params.id) {
            res.json(offer)
        }
    }
})
app.post('/offers', (req, res) => {
    if (req.body != null) {
        housingOffers.push(req.body)
        res.send(JSON.stringify(req.body))
    }
})
app.put('/offers/:id', (req, res) => {
    if (req.body == null) return;
    let index = -1
    for (let i = 0; i < housingOffers.length; i++) {
        if (housingOffers[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) return;
    housingOffers[index] = req.body
    res.send(JSON.stringify(housingOffers[index]))
})
app.delete('/offers/:id', (req, res) => {
    let deleteOffer = undefined
    for (let i = 0; i < housingOffers.length; i++) {
        if (housingOffers[i].id == req.params.id) {
            deleteOffer = housingOffers[i]
            housingOffers.splice(i, 1)
        }
    }
    res.send(JSON.stringify(deleteOffer))
})
app.get('/cities/:id/offers', (req, res) => {
    let requestedHousing = []
    for (let i = 0; i < housingOffers.length; i++) {
        for (const city of cities) {
            if (city.id == req.params.id && city.name == housingOffers[i].city) {
                requestedHousing.push(housingOffers[i])
            }
        }
    }
    res.send(JSON.stringify(requestedHousing))
})


// Cafe routes
app.get('/cafe', (req, res) => {
    res.json(cafe)
})
app.get('/cafe/:id', (req, res) => {
    for (const c of cafe) {
        if (c.id == req.params.id) {
            res.json(c)
        }
    }
})
app.post('/cafe', (req, res) => {
    if (req.body != null) {
        cafe.push(req.body)
        res.send(JSON.stringify(req.body))
    }
})
app.put('/cafe/:id', (req, res) => {
    if (req.body == null) return;
    let index = -1
    for (let i = 0; i < cafe.length; i++) {
        if (cafe[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) return;
    cafe[index] = req.body
    res.send(JSON.stringify(cafe[index]))
})
app.delete('/cafe/:id', (req, res) => {
    let deleteCafe = undefined
    for (let i = 0; i < cafe.length; i++) {
        if (cafe[i].id == req.params.id) {
            deleteCafe = cafe[i]
            cafe.splice(i, 1)
        }
    }
    res.send(JSON.stringify(deleteCafe))
})
app.get('/cities/:id/cafe', (req, res) => {
    let requestedCafes = []
    for (let i = 0; i < cafe.length; i++) {
        for (const city of cities) {
            if (city.id == req.params.id && cafe[i].city === city.name) {
                requestedCafes.push(cafe[i])
            }
        }
    }
    res.send(JSON.stringify(requestedCafes))
})

// Education routes
app.get('/education', (req, res) => {
    res.json(education)
})
app.get('/education/:id', (req, res) => {
    for (const edu of education) {
        if (edu.id == req.params.id) {
            res.json(edu)
        }
    }
})
app.post('/education', (req, res) => {
    if (req.body != null) {
        education.push(req.body)
        res.send(JSON.stringify(req.body))
    }
})
app.put('/education/:id', (req, res) => {
    if (req.body == null) return;
    let index = -1
    for (let i = 0; i < education.length; i++) {
        if (education[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) return;
    education[index] = req.body
    res.send(JSON.stringify(education[index]))
})
app.delete('/education/:id', (req, res) => {
    let deleteEducation = undefined
    for (let i = 0; i < education.length; i++) {
        if (education[i].id == req.params.id) {
            deleteEducation = education[i]
            education.splice(i, 1)
        }
    }
    res.send(JSON.stringify(deleteEducation))
})
app.get('/cities/:id/education', (req, res) => {
    let requestedEducations = []
    for (let i = 0; i < education.length; i++) {
        for (const city of cities) {
            if (city.id == req.params.id && education[i].city == city.name) {
                requestedEducations.push(education[i])
            }
        }
    }
    res.send(JSON.stringify(requestedEducations))
})

app.get('/cities/:id/education/:type', (req, res) => {
    let requestedEducations = []
    for (let i = 0; i < education.length; i++) {
        for (const city of cities) {
            if (city.id == req.params.id && education[i].city == city.name && education[i].type == req.params.type) {
                requestedEducations.push(education[i]);
            }
        }
    }
    res.send(JSON.stringify(requestedEducations))
})