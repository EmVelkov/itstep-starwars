import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Card } from "../../components/Card";
import { getUrlId } from "../../utils/getUrlId";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { Movie } from "./models/movies.types";
import "./home.style.scss";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    try {
      const response = await api.get("films/");

      const returnedData = await response.data;

      setMovies(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`films/?search=${inputSearch}`);
      const returnedData = await response.data;
      setMovies(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [inputSearch]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputSearch(event.target.value);
  }

  const debouncedOnChange = debounce(handleInputChange, 500);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [getData]);

  useEffect(() => {
    setIsLoading(true);
    getFilteredData();
  }, [getFilteredData]);

  return (
    <>
      <section className="title">
        <h1>
          Star Wars <span className="title_sub">( IT STEP)</span>
        </h1>
      </section>

      <section className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => debouncedOnChange(event)}
        />
      </section>

      {isLoading ? (
        <section className="loading">
          <Loading />
        </section>
      ) : (
        <section className="cards-section">
          {movies.map((movie) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/films/${getUrlId(
                movie.url
              )}.jpg`}
              name={movie.title}
              key={movie.name}
            />
          ))}
        </section>
      )}
    </>
  );
}
