export function convertirTimestamp(timestamp) {
  const fecha = new Date(timestamp * 1000);
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  const formatoHora = `${rellenarCeros(horas)}:${rellenarCeros(minutos)}`;
  return formatoHora;
}

function rellenarCeros(valor) {
  return valor < 10 ? `0${valor}` : valor;
}

export function metrosPorSegundoAKilometrosPorHora(velocidadMetrosPorSegundo) {
  return velocidadMetrosPorSegundo * 3.6;
}

export function obtenerDiaDeLaSemana(tiempoEnSegundos) {
  const tiempoEnMilisegundos = tiempoEnSegundos * 1000;

  const fecha = new Date(tiempoEnMilisegundos);

  const numeroDiaDeLaSemana = fecha.getDay();

  const diasDeLaSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  return diasDeLaSemana[numeroDiaDeLaSemana];
}

export function redondear(numero) {
  
  const numeroRedondeado = Math.round(numero);
  const entero = parseInt(numeroRedondeado, 10);

  return entero;
}
