import { ChangeEvent, FormEvent, useState } from "react";

import type { SearchType } from "../../types";

import InputErrorMessage from "../InputErrorMessage/InputErrorMessage";
import styles from "./Form.module.css";

interface FormProps {
  fetchWeather: (search: SearchType) => Promise<void>;
}

export default function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: ""
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

    setError("");
    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
      <div className={styles.field}>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ingrese la ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <input className={styles.submit} type="submit" value="Consultar" />
    </form>
  );
}
