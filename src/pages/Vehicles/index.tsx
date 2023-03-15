import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Card } from "../../components/Card";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { getUrlId } from "../../utils/getUrlId";
import { Vehicle } from "./models/vehicles.interface";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    try {
      const response = await api.get(`vehicles/?page=${page}`);

      const returnedData = await response.data;

      setVehicles(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`vehicles/?search=${inputSearch}`);

      const returnedData = await response.data;

      setVehicles(returnedData.results);
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
          Vehicles - <span>Star Wars</span>
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
          {vehicles.map((vehicle) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/vehicles/${getUrlId(
                vehicle.url
              )}.jpg`}
              name={vehicle.name}
              key={vehicle.name}
            />
          ))}
        </section>
      )}
    </>
  );
}
