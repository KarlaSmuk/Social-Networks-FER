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
        List<Movie> allMovies = movieRepository.findAll();

        return allMovies.stream()
                .filter(m -> {
                    String title = m.getTitle() != null ? m.getTitle() : "";
                    return query == null || title.toLowerCase().contains(query.toLowerCase());
                })
                .filter(m -> {
                    String genre = m.getGenre() != null ? m.getGenre() : "";
                    return genres == null || genres.stream().anyMatch(genre::contains);
                })
                .collect(Collectors.toList());

    }

    private boolean movieMatchesGenres(Movie movie, List<String> genres) {
        if (movie.getGenre() == null) return false;

        String movieGenres = movie.getGenre().toLowerCase();

        return genres.stream().anyMatch(g -> movieGenres.contains(g.toLowerCase()));
    }

}
