import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Main from './component/nav'
import Details from './component/detail'
import { PokemonProvider } from './PokemontContext'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <PokemonProvider> 
        <Router> 
          <Switch>  
            <Route path="/details" component={Details} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </PokemonProvider>
    </div>
  );
}

export default App;
