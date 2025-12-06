package org.backend.service;

import org.backend.model.Genre;
import org.backend.model.Movie;
import org.backend.model.Streaming;
import org.backend.repository.GenreRepository;
import org.backend.repository.MovieRepository;
import org.backend.repository.StreamingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private StreamingRepository streamingRepository;

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public List<Streaming> getStreamingByMovieId(String movieId) {
        return streamingRepository.findByImdbID(movieId);
    }

    public List<Movie> searchMovies(String query, List<String> genres) {
        List<Movie> movies;

        if(query != null) {
            movies = movieRepository.findByTitleContainsIgnoreCase(query.toLowerCase());
        } else {
            movies = movieRepository.findAll();
        }

        return movies.stream()
                .filter(m -> {
                    String genre = m.getGenre() != null ? m.getGenre() : "";
                    return genres == null || genres.stream().anyMatch(genre::contains);
                })
                .collect(Collectors.toList());
    }
}
