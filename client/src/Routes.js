import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout';
import ReactGA from 'react-ga';
import Blog from './components/blog/blog';

class Routes extends Component {

	componentDidMount() {
		this.initializeReactGA();
	}
	
	initializeReactGA() {
		ReactGA.initialize('');
		ReactGA.pageview('/');
	}
	
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Layout}  />
				<Route otherwise component={Layout}  />
			</Switch>
		);
	}
}

export default Routes;

