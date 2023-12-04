import './Button2.css';
// eslint-disable-next-line react/prop-types
const Button2 = ({ text2, onClick2 }) => {
  return (
    <button className='Button2' onClick={onClick2}>
      {text2}
    </button>
  );
};

export default Button2;