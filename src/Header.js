export default function Header(props) {
    return(
        <div id="cabecera">
            <img className="logo" src={process.env.PUBLIC_URL + "/01d@2x.png"} alt="el logo de la página"/>
            <h2 className="mensaje">El Tiempo</h2>           
        </div>
    );
}