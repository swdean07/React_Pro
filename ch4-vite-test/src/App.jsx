import './App.css';
import EventPractice from './Component/EventPractice';
import Login from './Component/Login';
import Signup from './Component/Signup';
import LoginWithMain from './Component/LoginWithMain';

function App() {
  return (
    <>
      <h1 className='react'>ch4 이벤트 핸들링</h1>
      <EventPractice />
      <Login />
      <Signup />
      <LoginWithMain />
    </>
  );
}

export default App;
