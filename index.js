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
    res.status(200).json(cities)
})

app.get('/cities/:id', (req, res) => {
    res.status(200).json(cities[req.params.id])
})

app.post('/cities', (req, res) => {
    if (req.body != null) {
        cities.push(req.body)
        res.status(201).json((req.body))
    } else {
        res.status(400).json({ message: 'Bad request' })
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
    if (deleteCity == undefined) {
        res.status(404).json({ message: 'City not found' })
    } else {
        res.status(200).json(deleteCity)
    }
})

app.put('/cities/:id', (req, res) => {
    if (req.body == null) {
        res.status(400).json({ message: 'Bad request' })
        return;
    }
    let index = -1
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'City not found' })
        return;
    }
    cities[index] = req.body
    res.status(200).json(req.body)
})

// Jobs routes
app.get('/jobs', (req, res) => {
    res.status(200).json(jobs)
})
app.get('/jobs/:id', (req, res) => {
    for (const job of jobs) {
        if (job.id == req.params.id) {
            res.status(200).json(job)
            return
        }
    }
    res.status(404).json({ message: 'Job not found' })
})
app.get('/cities/:id/jobs', (req, res) => {
    let index = -1
    for (const i in cities) {
        if (cities[i].id == req.params.id) {
            index = i
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'Jobs not found' })
        return
    }
    let requestedJobs = []
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].city == cities[req.params.id].name) {
            requestedJobs.push(jobs[i])
        }
    }
    res.status(200).json((requestedJobs))
})
app.post('/jobs', (req, res) => {
    if (req.body != null) {
        jobs.push(req.body)
        res.status(201).json((req.body))
    } else {
        res.status(400).json({ message: 'Bad request' })
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
    if (deleteJob != undefined) {
        res.status(200).json(deleteJob)
    } else {
        res.status(404).json({ message: 'Job not found' })
    }
})
app.put('/jobs/:id', (req, res) => {
    if (req.body == null) {
        res.status(400).json({ message: 'Bad request' })
        return;
    }
    let index = -1
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'Job not found' })
        return;
    }
    jobs[index] = req.body
    res.status(200).json((jobs[index]))
})

// Services routes
app.get('/cities/:id/services', (req, res) => {
    let index = -1
    for (const i in cities) {
        if (cities[i].id == req.params.id) {
            index = i
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'Services not found' })
        return
    }
    let requestedServices = []
    for (let i = 0; i < services.length; i++) {
        if (services[i].city == cities[req.params.id].name) {
            requestedServices.push(services[i])
        }
    }
    res.status(200).json((requestedServices))
})
app.get('/cities/:id/services/:type', (req, res) => {
    let index = -1
    for (const i in cities) {
        if (cities[i].id == req.params.id) {
            index = i
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'Services not found' })
        return
    }
    let requestedServices = []
    for (let i = 0; i < services.length; i++) {
        if (services[i].city == cities[req.params.id].name && services[i].type == req.params.type) {
            requestedServices.push(services[i])
        }
    }
    res.status(200).json((requestedServices))
})
app.get('/services/:id', (req, res) => {
    for (const service of services) {
        if (service.id == req.params.id) {
            res.status(200).json(service)
            return
        }
    }
    res.status(404).json({ message: 'Service not found' })
})
app.post('/services', (req, res) => {
    if (req.body != null) {
        services.push(req.body)
        res.status(201).json((req.body))
        return
    }
    res.status(400).json({ message: 'Bad request' })
})
app.put('/services/:id', (req, res) => {
    if (req.body == null) {
        res.status(400).json({ message: 'Bad request' })
        return;
    }
    let index = -1
    for (let i = 0; i < services.length; i++) {
        if (services[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'Service not found' })
        return;
    }
    services[index] = req.body
    res.status(200).json((services[index]))
})
app.delete('/services/:id', (req, res) => {
    let deleteService = undefined
    for (let i = 0; i < services.length; i++) {
        if (services[i].id == req.params.id) {
            deleteService = services[i]
            services.splice(i, 1)
        }
    }
    if (deleteService == undefined) {
        res.status(404).json({ message: 'Service not found' })
    } else
        res.status(200).json((deleteService))
})


// Housing offers routes
app.get('/offers', (req, res) => {
    res.status(200).json(housingOffers)
})
app.get('/offers/:id', (req, res) => {
    for (const offer of housingOffers) {
        if (offer.id == req.params.id) {
            res.status(200).json(offer)
            return
        }
    }
    res.status(404).json({ message: 'Offer not found' })
})
app.post('/offers', (req, res) => {
    if (req.body != null) {
        housingOffers.push(req.body)
        res.status(201).json((req.body))
        return
    }
    res.status(400).json({ message: 'Bad Request' })
})
app.put('/offers/:id', (req, res) => {
    if (req.body == null) {
        res.status(400).json({ message: 'Bad Request' })
        return;
    }
    let index = -1
    for (let i = 0; i < housingOffers.length; i++) {
        if (housingOffers[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) {
        res.status(400).json({ message: 'Bad request' })
        return;
    }
    housingOffers[index] = req.body
    res.status(200).json((housingOffers[index]))
})
app.delete('/offers/:id', (req, res) => {
    let deleteOffer = undefined
    for (let i = 0; i < housingOffers.length; i++) {
        if (housingOffers[i].id == req.params.id) {
            deleteOffer = housingOffers[i]
            housingOffers.splice(i, 1)
        }
    }
    if (deleteOffer == undefined) {
        res.status(404).json({ message: 'Offer not found' })
    }
    res.status(200).json((deleteOffer))
})
app.get('/cities/:id/offers', (req, res) => {
    let index = -1
    for (const i in cities) {
        if (cities[i].id == req.params.id) {
            index = i
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'Offers not found' })
        return
    }
    let requestedHousing = []
    for (let i = 0; i < housingOffers.length; i++) {
        for (const city of cities) {
            if (city.id == req.params.id && city.name == housingOffers[i].city) {
                requestedHousing.push(housingOffers[i])
            }
        }
    }
    res.status(200).json((requestedHousing))
})


// Cafe routes
app.get('/cafe', (req, res) => {
    res.status(200).json(cafe)
})
app.get('/cafe/:id', (req, res) => {
    for (const c of cafe) {
        if (c.id == req.params.id) {
            res.status(200).json(c)
            return
        }
    }
    res.status(404).json({ message: 'Cafe not found' })
})
app.post('/cafe', (req, res) => {
    if (req.body != null) {
        cafe.push(req.body)
        res.status(201).json((req.body))
        return
    }
    res.status(400).json({ message: 'Bad Request' })
})
app.put('/cafe/:id', (req, res) => {
    if (req.body == null) {
        res.status(400).json({ message: 'Bad Request' })
        return;
    }
    let index = -1
    for (let i = 0; i < cafe.length; i++) {
        if (cafe[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) {
        res.status(400).json({ message: 'Bad Request' })
        return;
    }
    cafe[index] = req.body
    res.status(200).json((cafe[index]))
})
app.delete('/cafe/:id', (req, res) => {
    let deleteCafe = undefined
    for (let i = 0; i < cafe.length; i++) {
        if (cafe[i].id == req.params.id) {
            deleteCafe = cafe[i]
            cafe.splice(i, 1)
        }
    }
    if (deleteCafe != undefined) {
        res.status(200).json((deleteCafe))
    } else {
        res.status(404).json({ message: 'Cafe not found' })
    }
})
app.get('/cities/:id/cafe', (req, res) => {
    let index = -1
    for (const i in cities) {
        if (cities[i].id == req.params.id) {
            index = i
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'Cafe not found' })
        return
    }
    let requestedCafes = []
    for (let i = 0; i < cafe.length; i++) {
        for (const city of cities) {
            if (city.id == req.params.id && cafe[i].city === city.name) {
                requestedCafes.push(cafe[i])
            }
        }
    }
    res.status(200).json((requestedCafes))
})

// Education routes
app.get('/education', (req, res) => {
    res.status(200).json(education)
})
app.get('/education/:id', (req, res) => {
    for (const edu of education) {
        if (edu.id == req.params.id) {
            res.status(200).json(edu)
            return
        }
    }
    res.status(404).json({ message: 'Education not found' })
})
app.post('/education', (req, res) => {
    if (req.body != null) {
        education.push(req.body)
        res.status(201).json((req.body))
    } else {
        res.status(400).json({ message: 'Bad Request' })
    }
})
app.put('/education/:id', (req, res) => {
    if (req.body == null) {
        res.status(400).json({ message: 'Bad Request' })
        return;
    }
    let index = -1
    for (let i = 0; i < education.length; i++) {
        if (education[i].id == req.params.id) {
            index = i;
            break
        }
    }
    if (index == -1) {
        res.status(400).json({ message: 'Bad Request' })
        return;
    }
    education[index] = req.body
    res.status(200).json((education[index]))
})
app.delete('/education/:id', (req, res) => {
    let deleteEducation = undefined
    for (let i = 0; i < education.length; i++) {
        if (education[i].id == req.params.id) {
            deleteEducation = education[i]
            education.splice(i, 1)
        }
    }
    if (deleteEducation == undefined)
        res.status(404).json({ message: 'Cafe not found' })
    else
        res.status(200).json((deleteEducation))
})
app.get('/cities/:id/education', (req, res) => {
    let index = -1
    for (const i in cities) {
        if (cities[i].id == req.params.id) {
            index = i
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'Education not found' })
        return
    }
    let requestedEducations = []
    for (let i = 0; i < education.length; i++) {
        for (const city of cities) {
            if (city.id == req.params.id && education[i].city == city.name) {
                requestedEducations.push(education[i])
            }
        }
    }
    res.status(200).json((requestedEducations))
})

app.get('/cities/:id/education/:type', (req, res) => {
    let index = -1
    for (const i in cities) {
        if (cities[i].id == req.params.id) {
            index = i
        }
    }
    if (index == -1) {
        res.status(404).json({ message: 'Education not found' })
        return
    }
    let requestedEducations = []
    for (let i = 0; i < education.length; i++) {
        for (const city of cities) {
            if (city.id == req.params.id && education[i].city == city.name && education[i].type == req.params.type) {
                requestedEducations.push(education[i]);
            }
        }
    }
    res.status(200).json((requestedEducations))
})