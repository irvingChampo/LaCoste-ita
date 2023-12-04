import './ButtonImage.css';
// eslint-disable-next-line react/prop-types
const ButtonImage = ({ image, onClick }) => {
  return (
    <button className='ButtonFooter' onClick={onClick}>
          <img className='Image' src={image} alt="My Button" />
    </button>
  );
};

export default ButtonImage;