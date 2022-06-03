import './App.css';
import MainView from './components/mainView';
import Header from './components/header';
import Footer from './components/footer';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProfileView from './components/profileView';

function App() {
	return (
		<div
			className="App"
			style={{
				flexDirection: 'column',
				display: 'flex',
				minHeight: '100vh',
				backgroundColor: '#36383e'
			}}
		>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/db-viewer' element={<MainView />} />
					<Route path='/db-viewer/profiles' element={<ProfileView />} />
				</Routes>
				<Footer />
			</BrowserRouter>
			{/* <MainView /> */}
		</div>
	);
}

export default App;
