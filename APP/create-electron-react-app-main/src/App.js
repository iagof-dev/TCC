
import "tailwindcss/tailwind.css"
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login'
import List from './pages/List'
import Search from './pages/Search'
import Quit from './pages/Quit'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";

function App() {
	const [path, setPath] = useState('')

	return (
		<BrowserRouter>

			<Routes>
				<Route path='/' element={<Login setPath={setPath} />} />

				<Route path='/menu' element={<Layout setPath={setPath} path={path} />}>


					<Route path="/menu/list" element={<List setPath={setPath} path={path}/>}/>

					<Route path="/menu/search" element={<Search setPath={setPath} path={path}/>}/>

					<Route path="/menu/quit" element={<Quit setPath={setPath} path={path}/>}/>
					
				</Route>

				{/* <Route path='/menu' element={<Layout setPath={setPath} path={path} />}/> */}


			</Routes>

		</BrowserRouter>
	);
}

export default App;
