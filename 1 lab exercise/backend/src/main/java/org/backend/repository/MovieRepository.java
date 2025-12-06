package org.backend.repository;

import org.backend.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String> {
    List<Movie> findByTitleContainsIgnoreCase(String lowerCase);
}
