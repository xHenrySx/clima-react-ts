import style from "./App.module.css";
import Form from "./components/Form/Form";
import InputErrorMessage from "./components/InputErrorMessage/InputErrorMessage";
import Spinner from "./components/Spinner/Spinner";
import WheatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";

function App() {
  const { weather, loading, notFound, fetchWeather, hasWeather } = useWeather();

  return (
    <>
      <h1 className={style.title}>Buscador de Climas</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && (
          <div className={style.spinner}>
            <Spinner />
          </div>
        )}
        {hasWeather && <WheatherDetail weather={weather} />}
        {notFound && (
          <InputErrorMessage>{`Ciudad no encontrada 🤯`}</InputErrorMessage>
        )}
      </div>
    </>
  );
}

export default App;
