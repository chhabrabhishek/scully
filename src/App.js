import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import EmptyComponent from './components/EmptyComponent/EmptyComponent';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
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
              <TitleBar showSignOut={true}/>
              <Dashboard />
            </div>
          } />
          <Route key='signIn' path='/signIn' element={
            <div>
              <TitleBar showSignOut={false}/>
              <SignIn />
            </div>
          } />
          <Route key='signUp' path='/signUp' element={
            <div>
              <TitleBar showSignOut={false}/>
              <SignUp />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
