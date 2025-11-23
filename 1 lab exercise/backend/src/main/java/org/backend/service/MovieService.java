package org.backend.service;

import org.backend.model.Genre;
import org.backend.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private GenreRepository genreRepository;

    public List<String> getAllGenres() {
        return genreRepository.findAll()
                .stream()
                .map(Genre::getName)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

}
