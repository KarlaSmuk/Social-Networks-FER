package org.backend.controller;

import org.backend.model.Genre;
import org.backend.model.Movie;
import org.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<List<Genre>> getGenres(@RequestHeader("Authorization") String authHeader) {
        List<Genre> genres = movieService.getAllGenres();
        return ResponseEntity.ok(genres);
    }
}
