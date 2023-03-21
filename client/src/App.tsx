import { useAppSelector } from './app/hooks';
import Auth from './components/Auth';
import Todo from './components/Todo';

function App() {
  const { isAuth } = useAppSelector((state) => state.user);
  return <div className="App">{isAuth ? <Todo /> : <Auth />}</div>;
}

export default App;
