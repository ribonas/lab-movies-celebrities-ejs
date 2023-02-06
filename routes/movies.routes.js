const router = require('express').Router()
const Movie = require("../models/Movie.model");

router.get("/create", async (req, res) => {
    try {
      const movies = await Movie.find();
      res.render("movies/new-movie", {movies});
    } catch (error) {
      console.error(error);
      res.render("movies/new-movie", {error: "An error occurred while loading movies"});
    }
  });
  
router.post("/create", async (req, res) => {
    const {title, genre, plot, cast} = req.body;
  
    const movie = new Movie({
      title,
      genre,
      plot,
      cast
    });
  
    try {
      await movie.save();
      res.redirect("/movies");
    } catch (error) {
      console.error(error);
      res.render("movies/new-movie", {
        error: "An error occurred while saving the movie",
        celebrities,
        title,
        genre,
        plot
      });
    }
  });

router.get('/movies', async (req, res) => {
    try {
      const movies = await Movie.find();
      res.render('movies/movies', {movies});
    } catch (err) {
      console.error(err);
      res.render('movies/movies', {error: 'An error occurred while retrieving the movies'});
    }
  });

router.get('/:id', (req, res) => {
    Movie.findById(req.params.id)
      .populate('cast')
      .then(movie => {
        res.render('movies/movie-details', {movie});
      })
      .catch(error => {
        console.error(error);
        res.send(error);
      });
  });

router.post('/:id/delete', function(req, res) {
    Movie.findByIdAndRemove(req.params.id)
      .then(() => {
        res.redirect('/movies');
      })
      .catch(err => {
        console.log(err);
      });
  });

router.get("/movies/:id/edit", (req, res) => {
    const id = req.params.id;
    Movie.findById(id)
      .then((movie) => {
        Celebrity.find()
          .then((celebrities) => {
            res.render("movies/edit-movie", {
              movie: movie,
              celebrities: celebrities,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });  

router.post("/movies/:id", (req, res) => {
    const movieId = req.params.id;
    const updatedMovie = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast
    };
  
    Movie.findByIdAndUpdate(movieId, updatedMovie, {new: true})
      .then(updatedMovie => {
        res.redirect(`/movies/${updatedMovie._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  });  

module.exports = router