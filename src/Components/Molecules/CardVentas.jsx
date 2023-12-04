import { useState } from 'react';
import Delete from '../../assets/Img/eliminar.png';
import './CardVentas.css';

// eslint-disable-next-line react/prop-types
const CardVenta = ({ numeroProducto, precio, nombreProducto, onDelete, sharedTotal, sharedComanda }) => {
  const [cantidad, setCantidad] = useState(0);

  const onCantidadChange = (event) => {
    setCantidad(event.target.value)
    sharedTotal((prev) => {
      return ((prev - (cantidad * precio)) + event.target.value * precio).toFixed(2)
    })
    sharedComanda((prev) => {
      let previous = prev
      previous[nombreProducto].amount = parseInt(event.target.value)
      return previous
    })
  };

  return (
    <div className="divVentas">
      <p className="Numero"><b>Producto #</b> {numeroProducto}</p>
      <input className="Cantidad" type='number' value={cantidad} onChange={onCantidadChange} />
      <p className="Precio"><b>$</b> {precio}</p>
      <p className="Nombre">{nombreProducto}</p>
      <button className='ButtonVentas' onClick={() => {
        sharedTotal((prev) => {
          return ((prev - (cantidad * precio))).toFixed(2)
        })
        onDelete()
      }}>
        <img className='Delete' src={Delete} alt="Eliminar" />
      </button>
    </div>
  );
};

export default CardVenta;