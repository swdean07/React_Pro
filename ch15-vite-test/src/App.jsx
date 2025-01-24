import './App.css';
import ColorBox from './components/ColorBox';
import SelectColors from './components/SelectColors';
import { ColorProvider } from './contexts/color';

function App() {
  return (
    <>
      <h1 className='react'>ch15 context API</h1>
      {/* <ColorContext.Provider value={{ color: 'blue' }}>
        <ColorBox />
      </ColorContext.Provider> */}
      <ColorProvider>
        <div>
          <SelectColors />
          <ColorBox />
        </div>
      </ColorProvider>
    </>
  );
}

export default App;
