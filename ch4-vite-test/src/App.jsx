import './App.css';
import EventPractice from './Components/EventPractice';
import Login from './Components/Login';
import Signup from './Components/Signup';
import LoginWithMain from './Components/LoginWithMain';

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
