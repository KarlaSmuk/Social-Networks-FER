package org.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "streaming")
@Getter
@Setter
public class Streaming {

    @Id
    private String id;

    private String imdbID;

    // key = country code, value = list of streaming options
    private Map<String, List<StreamingOption>> streaming;
}

@Getter
@Setter
class StreamingOption {

    private Service service;
    private String type;
    private String link;
    private String videoLink;
    private String quality;
    private List<Audio> audios;
    private List<Subtitle> subtitles;
    private boolean expiresSoon;
    private long availableSince;
}

@Getter
@Setter
class Service {

    private String id;
    private String name;
    private String homePage;
    private String themeColorCode;
    private ImageSet imageSet;
}

@Getter
@Setter
class ImageSet {
    private String lightThemeImage;
    private String darkThemeImage;
    private String whiteImage;
}

@Getter
@Setter
class Audio {

    private String language;
}

@Getter
@Setter
class Subtitle {

    private boolean closedCaptions;
    private Locale locale;
}

@Getter
@Setter
class Locale {

    private String language;
}
