import { BrowserRouter, Outlet, Route, useLocation } from "react-router-dom";
import { useState } from 'react';
import Container from "./Container";
import MenuLink from "./MenuLink";
import QuitDialog from "./QuitDialog";

import LateralLogo from '../assets/img/logo-lateral-branca.png'
import EtecLogo from '../assets/img/logo-etec.png'



export default function Layout(props) {
	const [value, setValue] = useState("")
	const { setPath, path } = { ...props }

	const user = {
		name: "Cria de Condomínio",
		course: "3º Desenvolvimento de Sistemas",
		RM: "000000"
	}

	setPath(useLocation().pathname)

	return (<div className="flex flex-nowrap w-screen">
		<aside className="h-screen w-80 flex flex-col p-6 gap-2 justify-between">
			<section className="flex flex-col">
				<p className="menu__user-info font-bold text-4xl m-0 p-0">
					{user.name}
				</p>
				<p className="menu__user-info text-lg pb-4">
					{user.course} <br />
					RM: {user.RM}
				</p>

				<div className="menu flex flex-col flex-nowrap gap-5 m-0 p-0">
					{/* <MenuLink path={path} linkTarget={"/menu/list"} title={"Listar leituras"}/>
					<MenuLink path={path} linkTarget={"/menu/search"} title={"Pesquisar"}/>
					<QuitDialog/> */}


					<ul className="menu bg-base-200 rounded-box">
						<li>
							<a className="tooltip tooltip-right">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
									<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
								</svg>
								<MenuLink path={path} linkTarget={"/menu/list"} title={"Listar leituras"} />
							</a>
						</li>
						<li>
							<a className="tooltip tooltip-right">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
									<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
								</svg>

								<MenuLink path={path} linkTarget={"/menu/search"} title={"Pesquisar"} />
							</a>
						</li>
						<li>
							<QuitDialog />
						</li>
					</ul>
				</div>



			</section>

			<div className="flex flex-nowrap items-center justify-between">
				<img className=" w-28 h-fit" src={LateralLogo} />
				<img className=" w-24" src={EtecLogo} />
			</div>

		</aside>
		<div className="flex h-screen justify-center flex-center flex-grow">
			<Container>
				<Outlet />
			</Container>
		</div>
	</div>
	)
}