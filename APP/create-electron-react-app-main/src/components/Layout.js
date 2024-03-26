import { BrowserRouter, Outlet, Route, useLocation } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import { useState } from 'react';
import Container from "./Container";


export default function Layout(props) {
	const [value, setValue] = useState("")
	const { setPath, path} = { ...props }

	setPath(useLocation().pathname)

	let sPath = path.slice(1)

	return (<div className="flex flex-nowrap">
		<aside className="menu h-screen w-80 flex flex-col p-8 gap-4">
			<a className="menu-link" href="/">
				Layout
			</a>
			<a className={`menu-link ${sPath == "login" ? "menu-link--active" : ""}`} href="/login">
				Login
			</a>
			<a className="menu-link" href="/config">
				config
			</a>
			{/* <Container>
				<h1>Layout</h1>
				<a href="/login">
					Login
				</a>
				<a href="/config">
					config
				</a>
				<Input setValue={setValue}/>
				<Button title={"yeepee"} onClick={() => console.log('yepee')}/>
				
				<Container >
					<p>
						Hello
					</p>
				</Container>
			</Container> */}





			{/* <a href="/">
				Layout
			</a><hr/>
			<a href="/login">
				Login
			</a><hr/>
			<a href="/config">
				config
			</a>

			<hr/>

			<p>Path: {path}</p>


			<Outlet /> */}

		</aside>
		<div className="flex w-100 h-screen justify-center flex-center">
			<Container>
				<Outlet/>
			</Container>
		</div>
	</div>
	)
}