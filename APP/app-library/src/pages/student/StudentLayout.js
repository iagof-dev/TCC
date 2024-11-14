import { BrowserRouter, Outlet, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Container from '../../components/Container'
import MenuLink from "../../components/MenuLink";
import QuitDialog from '../../components/QuitDialog'

import LateralLogo from '../../assets/img/logo-lateral-branca.png'
import EtecLogo from '../../assets/img/logo-etec.png'
import Logo500 from '../../assets/img/logo500.png'
import NewMenuLink from "../../components/NewMenuLink";





export default function StudentLayout(props) {
	const { setPath, path, userInfo, setUserInfo } = { ...props }

	const [counter, setCounter] = useState(1)

	setPath(useLocation().pathname)

	return (<div className={`flex flex-nowrap w-screen ${counter % 3 == 0? "easter-egg" : "not-easter-egg"}`}>
		<aside className="h-screen w-[14rem] flex flex-col p-6 gap-2 justify-between  rounded-r-xl">
			<section className="flex flex-col mt-3">
				<p className="menu__user-info font-bold text-2xl m-0 p-0">
					{userInfo.nome}
				</p>
				<p className="menu__user-info text-lg pb-4">
					{userInfo.curso} <br />
					RM: {userInfo.rm}
				</p>

				<div className="menu flex flex-col flex-nowrap gap-5 m-0 p-0">

					<ul className={`menu bg-base-200 rounded-box gap-1 menu-ul`}>
						<li>
							<NewMenuLink path={path} linkTarget={"/studentMenu/studentList"} title={"Listar leituras"} svgPath={<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />} />
						</li>
						<li>
							<NewMenuLink path={path} linkTarget={"/studentMenu/studentSearch"} title={"Pesquisar livros"} svgPath={<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />} />
						</li>
						<hr/>
						<li>
							<QuitDialog />
						</li>
					</ul>
				</div>



			</section>

			<div className="flex flex-nowrap items-center justify-between">
				<img className=" w-[4rem] h-fit" src={ Logo500} onClick={() => setCounter(counter + 1)} />
				<img className=" w-[4rem]" src={ EtecLogo} />
			</div>

		</aside>
		<div className="flex h-screen justify-center flex-center flex-grow overflow-y-scroll">
			<Container>
				<Outlet />
			</Container>
		</div>
	</div>
	)
}