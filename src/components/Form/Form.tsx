import { ChangeEvent, FormEvent, useState } from "react";

import { countries } from "../../data/countries";

import type { SearchType } from "../../types";

import InputErrorMessage from "../InputErrorMessage/InputErrorMessage";
import styles from "./Form.module.css";

interface FormProps {
  fetchWeather: (search: SearchType) => Promise<void>;
}

export default function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(search).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ingrese la ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">País:</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">--Seleccione--</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.submit} type="submit" value="Consultar Clima" />
    </form>
  );
}
