package org.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "movies")
@Getter
@Setter
public class Movie {

    @Id
    private String _id;

    private String imdbID;
    private Long tmdb_id;
    @Field("Actors")
    private String actors;
    @Field("Awards")
    private String awards;
    @Field("BoxOffice")
    private String boxOffice;
    @Field("Country")
    private String country;
    @Field("DVD")
    private String dvd;
    @Field("Director")
    private String director;
    @Field("Genre")
    private String genre;
    @Field("Language")
    private String language;
    @Field("Metascore")
    private String metascore;
    @Field("Plot")
    private String plot;
    @Field("Poster")
    private String poster;
    @Field("Production")
    private String production;
    @Field("Rated")
    private String rated;
    @Field("Ratings")
    private List<Rating> ratings;
    @Field("Released")
    private String released;
    @Field("Response")
    private String response;
    @Field("Runtime")
    private String runtime;
    @Field("Title")
    private String title;
    @Field("Type")
    private String type;
    @Field("Website")
    private String website;
    @Field("Writer")
    private String writer;
    @Field("Year")
    private String year;
    private String imdbRating;
    private String imdbVotes;
}

@Getter
@Setter
class Rating {

    @Field("Source")
    private String source;
    @Field("Value")
    private String value;
}

