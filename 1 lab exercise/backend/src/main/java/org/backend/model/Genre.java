package org.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "genres")
@Getter
@Setter
public class Genre {

    @Id
    private String _id;

    private String id;

    private String name;
}
