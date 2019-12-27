import React from 'react';


import Home from "./Screens/Home";
import City from "./Screens/City";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {


  
  return (
      <Provider store={store}>
        <Router>
            <Switch>
              <Route path="/city/:num" exact component={City} />
              <Route path="/" exact component={Home} />
            </Switch>
        </Router>
      </Provider>
  );
};

export default App;
