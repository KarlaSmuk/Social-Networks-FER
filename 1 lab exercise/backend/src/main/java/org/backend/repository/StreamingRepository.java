package org.backend.repository;

import org.backend.model.Streaming;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StreamingRepository extends MongoRepository<Streaming, String> {
    List<Streaming> findByImdbID(String imdbID);
}
