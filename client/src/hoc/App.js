import React from 'react'
import Routes from '../Routes'
import { Provider } from '../store'
import { BrowserRouter } from "react-router-dom";


const App = () => (
	<BrowserRouter>
	  <Provider>
	    <Routes />
	  </Provider>
	</BrowserRouter>
)

export default App
