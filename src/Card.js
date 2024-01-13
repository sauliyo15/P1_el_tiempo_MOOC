import Card from "react-bootstrap/Card";

export default function Tarjeta(props) {
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Body>
        <Card.Title>{props.titulo}</Card.Title>
        <Card.Text>{props.subtitulo}</Card.Text>
      </Card.Body>
    </Card>
  );
}
