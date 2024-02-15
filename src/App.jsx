import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css'
import HomeLogin from './views/login/HomeLogin';
import HomePage from './views/layout/HomePage';
import './components/style/TableStyle.css'


function App() {


  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={HomeLogin} />
          <Route path={'/home'} component={HomePage} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
