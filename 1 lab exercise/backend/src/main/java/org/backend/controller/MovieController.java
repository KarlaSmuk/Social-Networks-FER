package org.backend.controller;

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
    public ResponseEntity<Movie> fetchAll(@RequestHeader("Google-Id") String googleId) {
        return null;
    }

    @GetMapping("/genres")
    public ResponseEntity<?> getGenres(@RequestHeader("Authorization") String authHeader) {
        List<String> genres = movieService.getAllGenres();
        return ResponseEntity.ok(genres);
    }
}
