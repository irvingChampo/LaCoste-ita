import './Button.css';
// eslint-disable-next-line react/prop-types
const Button = ({ text, onClick }) => {
  return (
    <button className='Button1' onClick={onClick} style={{ marginTop: '5px' }}>
      {text}
    </button>
  );
};

export default Button;
