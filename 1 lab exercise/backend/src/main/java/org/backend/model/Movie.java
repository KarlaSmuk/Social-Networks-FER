package org.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "movies")
@Getter
@Setter
public class Movie {

    @Id
    private String _id;

    private String imdbID;
    private Long tmdb_id;
    private List<String> actors;
    private String awards;
    private String boxOffice;
    private String country;
    private String dvd;
    private String director;
    private String genre;
    private String language;
    private String metascore;
    private String plot;
    private String poster;
    private String production;
    private String rated;
    private List<Rating> ratings;
    private String released;
    private String response;
    private String runtime;
    private String title;
    private String type;
    private String website;
    private String writer;
    private String year;
    private String imdbRating;
    private String imdbVotes;
}

@Getter
@Setter
class Rating {

    private String source;
    private String value;
}

