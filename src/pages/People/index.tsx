import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Card } from "../../components/Card";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { getUrlId } from "../../utils/getUrlId";
import { PeopleModel } from "./models/people.interface";

export default function People() {
  const [people, setPeoples] = useState<PeopleModel[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    try {
      const response = await api.get(`people/`);

      const returnedData = await response.data;

      setPeoples(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`people/?search=${inputSearch}`);

      const returnedData = await response.data;

      setPeoples(returnedData.results);
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
          People - <span>Star Wars</span>
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
          {people.map((character) => (
            <Card
              key={character.name}
              imageUrl={`https://starwars-visualguide.com/assets/img/characters/${getUrlId(
                character.url
              )}.jpg`}
              name={character.name}
            />
          ))}
        </section>
      )}
    </>
  );
}
