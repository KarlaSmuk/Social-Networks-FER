const API_BASE = "http://localhost:8080/movies";

const getHeaders = (token?: string) => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

export interface Rating {
    source: string;
    value: string;
}

export interface Movie {
    _id: string;
    imdbID: string;
    tmdb_id?: number;
    actors?: string[];
    awards?: string;
    boxOffice?: string;
    country?: string;
    dvd?: string;
    director?: string;
    genre?: string; // or string[] if you split genres
    language?: string;
    metascore?: string;
    plot?: string;
    poster?: string;
    production?: string;
    rated?: string;
    ratings?: Rating[];
    released?: string;
    response?: string;
    runtime?: string;
    title: string;
    type?: string;
    website?: string;
    writer?: string;
    year?: string;
    imdbRating?: string;
    imdbVotes?: string;
}


export interface Genre {
    id: string;
    name: string;
}

export interface Streaming {
    id: string;
    imdbID: string;
    streaming: Record<string, StreamingOption[]>;
}

export interface StreamingOption {
    service: {
        id: string;
        name: string;
        homePage: string;
        themeColorCode?: string;
    };
    type: string;
    link: string;
    videoLink: string;
    quality: string;
    audios: { language: string }[];
    subtitles: { closedCaptions: boolean; locale: { language: string } }[];
    expiresSoon: boolean;
    availableSince: number;
}

export const fetchMovies = async (token?: string): Promise<Movie[]> => {
    const res = await fetch(`${API_BASE}`, { headers: getHeaders(token) });
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
};

export const fetchGenres = async (token?: string): Promise<Genre[]> => {
    const res = await fetch(`${API_BASE}/genres`, { headers: getHeaders(token) });
    if (!res.ok) throw new Error("Failed to fetch genres");
    return res.json();
};

export const fetchStreamingByMovieId = async (
    movieId: string,
    token?: string
): Promise<Streaming[]> => {
    const res = await fetch(`${API_BASE}/${movieId}/streaming`, { headers: getHeaders(token) });
    if (!res.ok) throw new Error("Failed to fetch streaming info");
    return res.json();
};

export async function searchMovies(token?: string, query?: string, genres?: string[]) {
    const params = new URLSearchParams();

    if (query) params.append("query", query);
    if (genres) genres.forEach(g => params.append("genres", g));

    const res = await fetch(`${API_BASE}/search?` + params.toString(), { headers: getHeaders(token) });
    return res.json();
}