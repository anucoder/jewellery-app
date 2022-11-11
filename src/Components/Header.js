import HeaderCartButton from './HeaderCartButton';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();
  return (
    <>
      <header className="header">
        <h1 className="hand" onClick={()=>{navigate('/')}}>Fantasy</h1>
        <HeaderCartButton/>
      </header>
    </>
  );
};

export default Header;