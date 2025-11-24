package org.backend.controller;

import org.backend.model.Genre;
import org.backend.model.Movie;
import org.backend.model.Streaming;
import org.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> fetchAll() {
        List<Movie> movies = movieService.getAllMovies();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/genres")
    public ResponseEntity<List<Genre>> getGenres() {
        List<Genre> genres = movieService.getAllGenres();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/{movie_id}/streaming")
    public ResponseEntity<List<Streaming>> getStreamingByMovieId(@PathVariable String movie_id) {
        List<Streaming> streamings = movieService.getStreamingByMovieId(movie_id);
        return ResponseEntity.ok(streamings);
    }
}
