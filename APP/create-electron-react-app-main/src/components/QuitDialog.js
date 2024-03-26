import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";

const { ipcRenderer } = window.require("electron");


export default function QuitDialog() {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	function quitSystem() {
		ipcRenderer.send('close', [])
	}

	return (
		<>
			<a className="menu-link cursor-pointer" onClick={handleOpen} variant="gradient">
				Sair
			</a>
			<div className="w-fit">
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
			</div>
		</>
	);
}