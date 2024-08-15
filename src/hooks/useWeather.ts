import { useState } from "react";

import axios from "axios";
import { string, number, object, parse, InferOutput } from "valibot";

import { SearchType } from "../types";

const GEOCODING_URL = import.meta.env.VITE_GEOCODING_URL;
const WEATHER_URL = import.meta.env.VITE_WEATHER_URL;

const WeatherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_min: number(),
    temp_max: number(),
  }),
});

export type WeatherType = InferOutput<typeof WeatherSchema>;

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherType>({
    name: "",
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    },
  });

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    setLoading(true);
    try {
      const { city } = search;
      const { data } = await axios(
        `${GEOCODING_URL}q=${city}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );

      if (!data.length) {
        setNotFound(true);
      }

      const { lat, lon } = data[0];

      const { data: weather } = await axios(
        `${WEATHER_URL}lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );

      const result = parse(WeatherSchema, weather);
      setWeather(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeather = weather.name !== "" && !loading;

  return { weather, loading, notFound, fetchWeather, hasWeather };
}
