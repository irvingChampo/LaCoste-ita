import './CardHistorial.css';
// eslint-disable-next-line react/prop-types
const CardHistorial = ({ producto, neto, ganancia, }) => {
    return (
      <div className="CardHistorial">
        <p><b>Producto: </b> {producto}</p>
        <p><b>P.Neto: </b>{neto}</p>
        <p><b>Ganancia: </b> {ganancia}</p>
      </div>
    );
  };
  
  export default CardHistorial;