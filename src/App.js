import React, {
  Component
} from 'react';
import './App.css';
import MapContainer from "./MapContainer";
import Hamburger from "./Hamburger"
import ContextProvider from "./MyProvider";

class App extends Component {

/*
The render here abstracts all the information needed in the website -like the locations info-
from My Context Provider, it is treated as the parent state & function container
*/
  render() {
    return ( 
      <ContextProvider >
        <div role = "application">
          <MapContainer/>
          <Hamburger/>
        </div>      
      </ContextProvider>

    )
  }
}

export default App;