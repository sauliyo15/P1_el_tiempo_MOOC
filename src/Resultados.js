export default function Resultados(props) {
    return(
        <div id="resultados">
            <h3>Timezone: {props.items.timezone}</h3>
            <h3>El tiempo en los próximos días será: </h3>
            <ul id="listado">
                {props.items.daily.slice(0, props.numitems).map(item =>{
                    return <li key={item.dt}>
                        <p><strong>{new Date(item.dt * 1000).toLocaleDateString()}</strong></p>
                        <img className="tiempoimg" src={process.env.PUBLIC_URL + "/" + item.weather[0].icon + "@2x.png"} alt="el icono del tiempo"/>
                        <p>Temp: {item.temp.day}ºC</p>
                        <p>Humedad: {item.humidity}%</p>
                        <p>Viento: {item.wind_speed}m/s</p>                        
                    </li>
                })}
            </ul>   
        </div>
    );
}
