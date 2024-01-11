import Header from "./Header";
import Resultados from "./Resultados";
import "./App.css";
import CONFIG from "./config/config";
import { useState } from "react";
import { mock1 } from "./constants/mock.js";

function App() {
  const [latitud, setLatitud] = useState(CONFIG.default_lat);
  const [longitud, setLongitud] = useState(CONFIG.default_lon);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const callServer = async (latitud, longitud) => {
    setResultado(null);
    setError(null);
    
    if (CONFIG.use_server) {
      try {
        let query = CONFIG.server_url + "?lat=" + latitud + "&lon=" + longitud + "&appid=" + CONFIG.api_key;
        const response = await fetch(query);
        
        if (response.status === 200) {
          const data = await response.json();
          setResultado(data);
          setError(null);
        } 
        else {
          const errorData = await response.json();
          setError({ code: response.status, message: errorData.message });
        }
      } 
      catch (error) {
        setError({description: error.message});
        console.log(error);
      }
    } 
    else {
      setResultado(mock1);
      setError(null);
    }
  };

  return (
    <div id="main">
      <Header />
      <h2 id="titulo">El tiempo</h2>
      Latitud:{" "}
      <input
        type="number"
        id="latitud"
        value={latitud}
        onChange={(e) => setLatitud(e.target.value)}
      />
      <br></br>
      Longitud:{" "}
      <input
        type="number"
        id="longitud"
        value={longitud}
        onChange={(e) => setLongitud(e.target.value)}
      />
      <br></br>
      <br></br>
      <button id="buscar" onClick={() => callServer(latitud, longitud)}>
        Buscar
      </button>
      {resultado && (
        <Resultados numitems={CONFIG.num_items} items={resultado} />
      )}
      {error && (
        <div id="error">
          <h2>Error</h2>
          <h3>Se ha producido un error</h3>
          <p>Descripción: Obtenido error al llamar al API. Código: {error.code}</p>
          <p>Mensaje del servidor: {error.message}</p>
        </div>
      )}
      
    </div>
  );
}

export default App;
