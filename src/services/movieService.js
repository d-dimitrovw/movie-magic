import Movie from "../models/Movie.js";

const getAll = (filter = {}) => {
    let moviesQuery = Movie.find();
    if (filter.search) {
        // moviesQuery = movies.filter(movie => movie.title.toLowerCase().startsWith(filter.search.toLowerCase()));
        moviesQuery.find({ title: { $regex: filter.search, $options: 'i' } });
        // moviesQuery.regex('title', new RegExp(filter.search, 'i'))
    }
    if (filter.genre) {
        // moviesQuery = movies.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
        // moviesQuery.find({genre: filter.genre.toLowerCase()});
        moviesQuery.find({ genre: { $regex: filter.genre, $options: 'i' } })

        // moviesQuery.where('genre').equals(filter.genre.toLowerCase());


    }
    if (filter.year) {
        moviesQuery.find({ year: filter.year });
        // moviesQuery.where('year').equals(filter.year);
    }
    return moviesQuery;
}

const create = (movie) => Movie.create(movie);

const getOne = (movieId) => Movie.findById(movieId).populate('casts');

const attach = (movieId, castId, character) => {
    // const movie = await Movie.findById(movieId);
    // movie.casts.push(castId);
    // return movie.save();
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: { cast: castId, character } } });
    
}

export default {
    getAll,
    create,
    getOne,
    attach,
};