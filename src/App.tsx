import './App.css';
import MainView from './components/mainView';
import Header from './components/header';
import Footer from './components/footer';
import { BrowserRouter, Router, Routes, Route, HashRouter} from 'react-router-dom';
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
			<HashRouter>
				<>
					<Header />
					<Routes>
						<Route path='/' element={<MainView />} />
						<Route path='/profiles' element={<ProfileView />} />
					</Routes>
					<Footer />
				</>
			</HashRouter>
			{/* <MainView /> */}
		</div>
	);
}

export default App;
