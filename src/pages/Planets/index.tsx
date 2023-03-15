import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Card } from "../../components/Card";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { getUrlId } from "../../utils/getUrlId";
import { Planet } from "./models/planets.interface";

export default function Planets() {
  const [planets, setplanets] = useState<Planet[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    try {
      const response = await api.get(`planets/`);

      const returnedData = await response.data;

      setplanets(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`planets/?search=${inputSearch}`);

      const returnedData = await response.data;

      setplanets(returnedData.results);
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
      <div className="title">
        <h1>
          Planets - <span>Star Wars</span>
        </h1>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => debouncedOnChange(event)}
        />
      </div>

      {isLoading ? (
        <section className="loading">
          <Loading />
        </section>
      ) : (
        <section className="cards-section">
          {planets.map((planet) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/planets/${getUrlId(
                planet.url
              )}.jpg`}
              name={planet.name}
              key={planet.name}
            />
          ))}
        </section>
      )}
    </>
  );
}
