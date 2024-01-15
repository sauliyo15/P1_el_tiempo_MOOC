import {
  convertirTimestamp,
  metrosPorSegundoAKilometrosPorHora,
  obtenerDiaDeLaSemana,
  redondear,
} from "./helpers";
import Tarjeta from "./Card";

export default function Resultados(props) {
  return (
    <div id="resultados">
      <ul id="listado">
        <li>
          <Tarjeta titulo="Ahora" subtitulo={`${convertirTimestamp(props.items.current.dt)} horas`}/>
          <img className="tiempoimg" src={process.env.PUBLIC_URL + "/" + props.items.current.weather[0].icon + "@2x.png"}
            alt="el icono del tiempo"
            title={props.items.current.weather[0].description}
          />
          <p>Temperatura actual: {redondear(props.items.current.temp)} ºC</p>
          <p>Humedad: {props.items.current.humidity} %</p>
          <p>Nubosidad: {props.items.current.clouds} %</p>
          <p>Viento: {redondear(metrosPorSegundoAKilometrosPorHora(props.items.current.wind_speed))}km/h</p>
        </li>
        <li>
          <Tarjeta titulo="Hoy" subtitulo={`${obtenerDiaDeLaSemana(props.items.daily[0].dt)} ${new Date(props.items.daily[0].dt * 1000).toLocaleDateString()}`}/>
          <img className="tiempoimg" src={process.env.PUBLIC_URL + "/" + props.items.daily[0].weather[0].icon + "@2x.png"}
            alt="el icono del tiempo"
            title={props.items.daily[0].weather[0].description}
          />
          <p>Mín: {redondear(props.items.daily[0].temp.min)} ºC - Máx:{" "}{redondear(props.items.daily[0].temp.max)} ºC</p>
          <p>Probabilidad lluvia: {redondear(props.items.daily[0].pop * 100)} %</p>
          <p>Amanecer: {convertirTimestamp(props.items.daily[0].sunrise)} horas</p>
          <p>Atardecer: {convertirTimestamp(props.items.daily[0].sunset)} horas</p>
        </li>
      </ul>
      <br />
      <h4>El tiempo en los próximos días será: </h4>
      <br />
      <ul id="listado">
        {props.items.daily.slice(1, props.numitems).map((item) => {
          return (
            <li key={item.dt}>
              <Tarjeta titulo={obtenerDiaDeLaSemana(item.dt)} subtitulo={new Date(item.dt * 1000).toLocaleDateString()}/>
              <img className="tiempoimg" src={process.env.PUBLIC_URL + "/" + item.weather[0].icon + "@2x.png"}
                alt="el icono del tiempo"
                title={item.weather[0].description}
              />
              <p>Mín: {redondear(item.temp.min)} ºC - Máx:{" "}{redondear(item.temp.max)} ºC</p>
              <p>Probabilidad lluvia: {redondear(item.pop * 100)} %</p>
              <p>Amanecer: {convertirTimestamp(item.sunrise)} horas</p>
              <p>Atardecer: {convertirTimestamp(item.sunset)} horas</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
