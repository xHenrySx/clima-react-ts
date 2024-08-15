export const formatTemperature = (temp: number) => {
  const celsius = temp - 273.15;
  return `${celsius.toFixed(0)}`;
}