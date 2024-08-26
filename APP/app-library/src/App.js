
import "tailwindcss/tailwind.css"
import './App.css';
import StudentLayout from './pages/student/StudentLayout';
import StudentLogin from './pages/student/StudentLogin'
import LibrarianLogin from "./pages/librarian/LibrarianLogin";
import LibrarianList from './pages/librarian/LibrarianList';
import LibrarianAdd from './pages/librarian/LibrarianAdd';
import LibrarianEdit from './pages/librarian/LibrarianEdit';
import List from './pages/student/StudentList'
import Search from './pages/student/StudentSearch'
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import LibrarianMenu from "./pages/librarian/LibrarianMenu";
import LibrarianLoan from "./pages/librarian/LibrarianLoan";

function App() {
	const [path, setPath] = useState('')
	const [userInfo, setUserInfo] = useState({})
	const [librarian, setLibrarian] = useState("")
	const [librarianId, setLibrarianId] = useState(-1)

	//Student Application
	return (
		<BrowserRouter>


			<Routes>
				<Route path='/' element={<StudentLogin setPath={setPath} userInfo={userInfo} setUserInfo={setUserInfo} />} />

				<Route path='/studentMenu' element={<StudentLayout setPath={setPath} path={path}  userInfo={userInfo} setUserInfo={setUserInfo}/>}>

					<Route path="/studentMenu/studentList" element={<List setPath={setPath} path={path} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>

					<Route path="/studentMenu/studentSearch" element={<Search setPath={setPath} path={path} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>

				</Route>

			</Routes>

		</BrowserRouter>
	);


	//Librarian Application
	return (
		<BrowserRouter>

			<Routes>

				<Route path="/" element={<LibrarianLogin setPath={setPath} librarian={librarian} setLibrarian={setLibrarian} setLibrarianId={setLibrarianId} />} />

				<Route path="/librarianMenu" element={<LibrarianMenu setPath={setPath} librarian={librarian} />}  >

					{/* Empréstimo/devolução */}

					<Route path="/librarianMenu/librarianLoan"
						element={<LibrarianLoan librarianId={librarianId} />} />

					{/* Listar leituras dos alunos */}

					< Route path="/librarianMenu/librarianList"
						element={<LibrarianList librarianId={librarianId} />} />


					{/* Adicionar livro ao sistema */}

					<Route path="/librarianMenu/librarianAdd"
						element={<LibrarianAdd librarianId={librarianId} />} />

					{/* Editar/remover livro do sistema */}

					<Route path="/librarianMenu/librarianEdit"
						element={<LibrarianEdit librarianId={librarianId} />} />

				</Route>

			</Routes>

		</BrowserRouter>
	)
}

export default App;
