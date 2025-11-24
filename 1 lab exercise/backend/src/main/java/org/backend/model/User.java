package org.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter
@Setter
public class User {

    @Id
    private String _id;
    @Indexed(unique = true)
    private String googleId; // google sub
    @Indexed(unique = true)
    private String email;
    private String firstName;
    private String lastName;
    private String pictureUrl;

    public User(String googleId, String email, String firstName, String lastName, String pictureUrl){
        this.googleId = googleId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pictureUrl = pictureUrl;
    }
}
