import './App.css';
import '../src/components/Mystyle.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './layout/HomePage';
import Login from './layout/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Login} />
          <Route path={'/home'} component={HomePage} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
