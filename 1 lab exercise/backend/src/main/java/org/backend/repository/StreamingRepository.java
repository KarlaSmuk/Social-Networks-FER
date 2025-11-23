package org.backend.repository;

import org.backend.model.Streaming;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StreamingRepository extends MongoRepository<Streaming, String> {
}
