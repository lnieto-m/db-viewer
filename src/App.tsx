import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainView from './components/mainView';
import Header from './components/header';
import Footer from './components/footer';

function App() {
	return (
		<div className="App" style={{ flexDirection: 'column', display: 'flex', minHeight: '100vh'}}>
			<Header />
			<MainView />
			<Footer />
		</div>
	);
}

export default App;
