export default function Header(props) {
    return(
        <div id="cabecera">
            <img className="logo" src={process.env.PUBLIC_URL + "/sun.webp"} alt="el logo de la página"/>
            <h3 className="mensaje">Bienvenido a la página del tiempo de SAUL GARCIA CALVO</h3>            
        </div>
    );
}