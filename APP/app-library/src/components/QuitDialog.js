import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { ipcRenderer } = window.require("electron");


export default function QuitDialog() {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	const navigate = useNavigate()

	function quitSystem() {
		// ipcRenderer.send('close', [])
		navigate("../")
	}

	return (
		<>
			<a className="tooltip tooltip-right flex-col justify-center items-center" onClick={handleOpen} >
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
				</svg>
				<a className="menu-link cursor-pointer text-left w-fit" variant="gradient">
					Sair
				</a>

			</a>

			<Dialog open={open} handler={handleOpen} size="xs">

				<DialogHeader>Você quer mesmo sair?</DialogHeader>
				<DialogFooter>
					<button
						variant="text"
						color="red"
						onClick={handleOpen}
						className="button no-wrap align-center mx-2 w-fit py-2 px-4 rounded text-lg"
					>
						<span>Cancelar</span>
					</button>
					<button className="button exit-button no-wrap align-center mx-2 w-fit py-2 px-4 rounded text-lg" variant="gradient" color="green" onClick={quitSystem}>
						<span>Sair</span>
					</button>
				</DialogFooter>

			</Dialog>
		</>
	);
}