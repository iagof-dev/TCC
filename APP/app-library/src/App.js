
import "tailwindcss/tailwind.css"
import './App.css';
import StundentLayout from './pages/student/StudentLayout';
import StudentLogin from './pages/student/StudentLogin'
import LibrarianLogin from "./pages/librarian/LibrarianLogin";
import List from './pages/student/StudentList'
import Search from './pages/student/StudentSearch'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import LibrarianMenu from "./pages/librarian/LibrarianMenu";

function App() {
	const [path, setPath] = useState('')
	const [userInfo, setUserInfo] = useState({name: "João Mais ou Menos", RM: "123455", course: "2º Mecatrônica"})
	const [librarian, setLibrarian] = useState("")

	//Student Application
	return (
		<BrowserRouter>

			<Routes>
				<Route path='/' element={<StudentLogin setPath={setPath} userInfo={userInfo} setUserInfo={setUserInfo} />} />

				<Route path='/studentMenu' element={<StundentLayout setPath={setPath} path={path}  userInfo={userInfo} setUserInfo={setUserInfo}/>}>

					<Route path="/studentMenu/studentList" element={<List setPath={setPath} path={path} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>

					<Route path="/studentMenu/studentSearch" element={<Search setPath={setPath} path={path} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
					
				</Route>

			</Routes>

		</BrowserRouter>
	);


	//Librarian Application
	// return (
	// 	<BrowserRouter>

	// 	<Routes>

	// 		<Route path="/" element={<LibrarianLogin setPath={setPath} librarian={librarian} setLibrarian={setLibrarian} />}/>

	// 		<Route path="/librarianMenu" element={<LibrarianMenu setPath={setPath} librarian={librarian}/>}  >
			
	// 		{/* Empréstimo/devolução */}

	// 			<Route path="/librarianMenu/librarianLoan"/>

	// 		{/* Listar leituras dos alunos */}

	// 			< Route path="/librarianMenu/librarianList"/>

	// 		{/* Adicionar livro ao sistema */}

	// 			<Route path="/librarianMenu/librarianAdd"/>

	// 		{/* Editar/remover livro do sistema */}

	// 			<Route path="/librarianMenu/librarianEdit"/>

	// 		</Route>

	// 	</Routes>

	// 	</BrowserRouter>
	// )
}

export default App;
