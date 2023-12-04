import './Input.css';
// eslint-disable-next-line react/prop-types
const Input = ({ type, placeholder, value, onChange, onInput }) => {
  return (
    <div className='divInput'>
      <input
        className='Input'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={onInput}
      />
    </div>
  );
};

export default Input;

