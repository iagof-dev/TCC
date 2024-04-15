
import "tailwindcss/tailwind.css"
import './App.css';
import Layout from './components/Layout';
import StudentLogin from './pages/StudentLogin'
import LibrarianLogin from "./pages/LibrarianLogin";
import List from './pages/List'
import Search from './pages/Search'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";

function App() {
	const [path, setPath] = useState('')
	const [userInfo, setUserInfo] = useState({name: "João Mais ou Menos", RM: "123455", course: "2º Mecatrônica"})

	//Student Application
	// return (
	// 	<BrowserRouter>

	// 		<Routes>
	// 			<Route path='/' element={<StudentLogin setPath={setPath} userInfo={userInfo} setUserInfo={setUserInfo} />} />

	// 			<Route path='/menu' element={<Layout setPath={setPath} path={path}  userInfo={userInfo} setUserInfo={setUserInfo}/>}>

	// 				<Route path="/menu/list" element={<List setPath={setPath} path={path} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>

	// 				<Route path="/menu/search" element={<Search setPath={setPath} path={path} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
					
	// 			</Route>

	// 		</Routes>

	// 	</BrowserRouter>
	// );


	//Librarian Application
	return (
		<BrowserRouter>

		<Routes>

			<Route path="/" element={<LibrarianLogin setPath={setPath} userInfo={userInfo} setUserInfo={setUserInfo} />} />

			<Route>

			</Route>

		</Routes>

		</BrowserRouter>
	)
}

export default App;
