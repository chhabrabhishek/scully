import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TitleBar from './components/TitleBar/TitleBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <Routes>
          <Route key='home' path='/home' element={
            <div>
              <TitleBar />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
