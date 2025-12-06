import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchStreamingByMovieId,
  type Movie,
  type Streaming,
  type StreamingOption,
  type Rating,
} from "../hooks/api";
import { useAuth } from "../hooks/useAuth";

const StreamingDetailPage = () => {
  const location = useLocation();
  const movie = location.state?.movie as Movie;

  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [streaming, setStreaming] = useState<Streaming[]>([]);

  useEffect(() => {
    if (!id || !token) return;
    fetchStreamingByMovieId(id, token).then(setStreaming);
  }, [id, token]);

  if (!movie) return <p className="p-4">No movie data available.</p>;
  if (!streaming) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{movie.title}</h1>
      <div className="flex gap-5">
        <img
          className="h-100 w-auto justify-self-center mb-5"
          src={movie.poster}
        />
        <div>
          <div>
            <div className="mb-2">
              <strong>Genres:</strong> {movie.genre}
            </div>
            <div className="mb-2">
              <strong>Actors:</strong> {movie.actors}
            </div>
            <div className="mb-2">
              <strong>Director:</strong> {movie.director}
            </div>
            <div className="mb-2">
              <strong>Awards:</strong> {movie.awards}
            </div>
            <div className="mb-2">
              <strong>Country:</strong> {movie.country}
            </div>
          </div>

          {movie.ratings && movie.ratings.length > 0 && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">Ratings</h2>
              {movie.ratings.map((r: Rating, idx: number) => (
                <div key={idx} className="mt-0.5">
                  <strong>{r.source}:</strong> {r.value}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-6 max-w-4xl mx-auto">
        {streaming.map((item) => (
          <div key={item.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Streaming for {item.id}
            </h2>

            {Object.entries(item.streaming).map(
              ([type, options]: [string, StreamingOption[]]) => (
                <div key={type} className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">{type}</h2>

                  {options.map((opt, index) => (
                    <div key={index} className="border rounded-lg p-3 mb-2">
                      <p className="font-semibold">{opt.service.name}</p>
                      <p>Type: {opt.type}</p>
                      <p>Quality: {opt.quality}</p>
                      <div className="mt-2">
                        Audios: {opt.audios.map((a) => a.language).join(", ")}
                      </div>
                      <div className="mt-1">
                        Subtitles:{" "}
                        {opt.subtitles.map((s) => s.locale.language).join(", ")}
                      </div>
                      <div className="mt-2 flex gap-2 justify-center">
                        <a
                          href={opt.videoLink}
                          target="_blank"
                          className="bg-green-500 px-3 py-1 rounded mt-2"
                        >
                          Watch Video
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamingDetailPage;
