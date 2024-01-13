import Header from "./Header";
import Resultados from "./Resultados";
import "./App.css";
import "./AppMobile.css";
import CONFIG from "./config/config";
import { useState } from "react";
import { mock1 } from "./constants/mock.js";
import { coordenadas } from "./config/coordenadas.js";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);  
    
  const callServer = async (latitud, longitud) => {
    setResultado(null);
    setError(null);
    setCargando(true);

    if (CONFIG.use_server) {
      try {
        let query =
          CONFIG.server_url +
          "?lat=" +
          latitud +
          "&lon=" +
          longitud +
          CONFIG.language +
          CONFIG.units + 
          "&appid=" +
          CONFIG.api_key;
        const response = await fetch(query);

        if (response.status === 200) {
          const data = await response.json();
          setResultado(data);
          setError(null);
        } else {
          const errorData = await response.json();
          setError({ code: response.status, message: errorData.message });
        }
        setCargando(false);
      } catch (error) {
        setError({ description: error.message });
        console.log(error);
      }
    } else {
      setResultado(mock1);
      setError(null);
    }
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;

    if (selectedOption !== "---------Seleccione una población---------") {
      const poblacionInfo = coordenadas.find((poblacion) => poblacion.poblacion === selectedOption);
      callServer(poblacionInfo.latitud, poblacionInfo.longitud);
    }
    else {
      setResultado(null);
    }
  };

  return (
    <div id="main">
      <Header />
      <br/>
      <h4>Selecciona una población</h4>
      
      <select id="opciones" name="opciones" onChange={handleSelectChange}>
        {coordenadas.map((opcion, index) => (
          <option key={index} value={opcion.poblacion}>
            {opcion.poblacion}
          </option>
        ))}
      </select>
      <br/>
      <br/>
      {cargando && (
        <div>
          <br />
          <Spinner animation="border" role="status">
            <span className="sr-only">Cargando...</span>
          </Spinner>
        </div>
      )}
      {resultado ? (
        <Resultados numitems={CONFIG.num_items} items={resultado} />
      ): <h5>...para mostrar su información meteorológica de los próximos días</h5>}
      {error && (
        <div id="error">
          <h2>Error</h2>
          <h3>Se ha producido un error</h3>
          <p>
            Descripción: Obtenido error al llamar al API. Código: {error.code}
          </p>
          <p>Mensaje del servidor: {error.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
