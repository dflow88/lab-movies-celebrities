// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get('/movies/create', (req, res) => {
    Celebrity.find({})
        .then(celebrity => {
            res.render('movies/new-movie', {
                celebrity
            })
        })
})

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
})

router.get('/movies', (req, res) => {
    Movie.find({})
        .then((allMovies) => {
            res.render('movies/movies', {
                movies: allMovies
            })
        })
})

router.get('/movies/:id', (req, res) => {
    const { id } = req.params
    
    Movie.findById(id)
        .populate("cast")
        .then(movieFound => {
            res.render('movies/movie-details', {
                movies: movieFound
            })
        })
        .catch(e => console.log(e))
})

router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params
    Movie.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(e => console.log(e))
})

router.get('/movies/:movieId/edit', (req, res) => {
    const { movieId } = req.params
    Movie.findById(movieId)
        .then((movieFound) => {
            Celebrity.find({})
            
                .then((actors) => {
                    console.log(movieFound)
                    console.log(actors)
                    res.render('movies/edit-movie', {
                        movies: movieFound,
                        celebrities: actors
                    })
                })
        })
})

router.post('/movies/:movieId/edit', (req, res) => {
    const { movieId } = req.params
    console.log(movieId)
    const { title, genre, plot, cast } = req.body
    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, {new: true})
        .then(() => {
            res.redirect(`/movies/${movieId}`)
        })
})

module.exports = router;