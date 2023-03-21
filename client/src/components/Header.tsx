import { useAppDispatch } from '../app/hooks';
import { logout } from '../feature/userSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <header>
      <h1>Todo</h1>
      <nav>
        <button className="btn" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
