import { useAppSelector } from './app/hooks';
import Auth from './components/Auth';
import Header from './components/Header';
import Todo from './components/Todo';

function App() {
  const { isAuth } = useAppSelector((state) => state.user);
  return (
    <div className="App">
      <Header />
      {isAuth ? <Todo /> : <Auth />}
    </div>
  );
}

export default App;
