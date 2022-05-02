import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import EmptyComponent from './components/EmptyComponent/EmptyComponent';
import TitleBar from './components/TitleBar/TitleBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <Routes>
        <Route key='empty' path='/' element={
            <EmptyComponent />
          } />
          <Route key='home' path='/home' element={
            <div>
              <TitleBar />
              <Dashboard />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
