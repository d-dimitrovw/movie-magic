import { Router } from "express";
import movieService from "../services/movieService.js";

const router = Router();

function toArray(documents) {
    return documents.map(document => document.toObject());
}

router.get('/create', (req, res) => {
    res.render('movies/create');
})

router.post('/create', async (req, res) => {
    const movieData = req.body;

    await movieService.create(movieData)

    res.redirect('/');
})

router.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);

    res.render('home', {isSearch: true, movies: toArray(movies), filter});
})

router.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    movie.ratingView = getRatingViewData(movie.rating);

    res.render('movies/details', { movie })
})

router.get('/:movieId/attach', (req, res) => {
    // const movieId = req.params.movieId;
    res.render('movies/attach');

})

function getRatingViewData(rating) {
    if (!Number.isInteger(rating)) {
        return 'n\\a';
    }
    return '&#x2605;'.repeat(Math.ceil(rating / 2));
}

export default router;
