import { BrowserRouter, Outlet, Route, useLocation } from "react-router-dom";
import { useState } from 'react';
import Container from "./Container";
import MenuLink from "./MenuLink";
import QuitDialog from "./QuitDialog";

import LateralLogo from '../assets/img/logo-lateral-branca.png'
import EtecLogo from '../assets/img/logo-etec.png'



export default function Layout(props) {
	const [value, setValue] = useState("")
	const { setPath, path} = { ...props }

	const user = {
		name: "Cria de Condomínio",
		course: "3º Desenvolvimento de Sistemas",
		RM: "000000"
	}

	setPath(useLocation().pathname)

	return (<div className="flex flex-nowrap w-screen">
		<aside className="menu h-screen w-80 flex flex-col p-8 gap-2 justify-between">
			<section className="flex flex-col">
				<p className="menu__user-info font-bold text-4xl m-0 p-0">
					{user.name}
				</p>
				<p className="menu__user-info text-lg pb-4">
					{user.course} <br/>
					RM: {user.RM}
				</p>
				
				<div className="flex flex-col flex-nowrap gap-5">
					<MenuLink path={path} linkTarget={"/menu/list"} title={"Listar leituras"}/>
					<MenuLink path={path} linkTarget={"/menu/search"} title={"Pesquisar"}/>
					<QuitDialog/>
				</div>
			</section>
		
			<div className="flex flex-nowrap items-center justify-between">
				<img className=" w-28 h-fit" src={LateralLogo}/>
				<img className=" w-24" src={EtecLogo}/>
			</div>

		</aside>
		<div className="flex h-screen justify-center flex-center flex-grow">
			<Container>
				<Outlet/>
			</Container>
		</div>
	</div>
	)
}