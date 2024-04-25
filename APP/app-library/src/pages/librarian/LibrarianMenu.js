import { BrowserRouter, Outlet, Route, useLocation } from "react-router-dom";
import { useState } from 'react';
import Container from '../../components/Container'
import MenuLink from "../../components/MenuLink";
import QuitDialog from '../../components/QuitDialog'

import LateralLogo from '../../assets/img/logo-lateral-branca.png'
import EtecLogo from '../../assets/img/logo-etec.png'
import Logo500 from '../../assets/img/logo500.png'
import NewMenuLink from "../../components/NewMenuLink";



export default function LibrarianMenu(props) {
	const { setPath, path, librarian } = { ...props }

	setPath(useLocation().pathname)

	return (<div className="flex flex-nowrap w-screen">
		<aside className="h-screen w-[18vw] flex flex-col p-6 gap-2 justify-between  rounded-r-xl">
			<section className="flex flex-col mt-3">
				<p className="menu__user-info font-bold text-2xl p-0">
					{librarian}
				</p>
				<p className="menu__user-info text-lg pb-4">
					Bibliotecário(a)
				</p>

				<div className="menu flex flex-col flex-nowrap gap-5 m-0 p-0">

					<ul className={`menu bg-base-200 rounded-box gap-1 menu-ul`}>
						<li>
							<NewMenuLink
								path={path}
								linkTarget={"/librarianMenu/librarianLoan"}
								title={"Empréstimo/ devolução"}
								svgPath={<path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />}
							/>
						</li>
						<li>
							<NewMenuLink
								path={path}
								linkTarget={"/librarianMenu/librarianList"}
								title={"Listar registros"}
								svgPath={
									<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
								}
							/>
						</li>
						<li>
							<NewMenuLink
								path={path}
								linkTarget={"/librarianMenu/librarianAdd"}
								title={"Adicionar livro ao sistema"}
								svgPath={<path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />



								}
							/>
						</li>
						<li>
							<NewMenuLink
								path={path}
								linkTarget={"/librarianMenu/librarianEdit"}
								title={"Editar/remover livro do sistema"}
								svgPath={<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />}
							/>
						</li>



						{/* Listar leituras dos alunos */}
						{/* Adicionar livro ao sistema */}
						{/* Editar/remover livro do sistema */}

						<hr />
						<li>
							<QuitDialog />
						</li>
					</ul>
				</div>



			</section>

			<div className="flex flex-nowrap items-center justify-between">
				<img className=" w-[4rem] h-fit" src={"/" + Logo500} />
				<img className=" w-[4rem]" src={"/" + EtecLogo} />
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