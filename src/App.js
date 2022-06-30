
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';

import Index from './template/index';
import Login from './template/login';
function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Switch>
          
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
