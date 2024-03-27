import {React, useState} from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import "../App.css"

export function LoginErrorDialog(props) {
    const {open, setOpen} = {...props}

    function handleOpen(){
        setOpen(!open)
    }

	return (
		<>
			<a className="menu-link cursor-pointer" onClick={handleOpen} variant="gradient">
				Sair
			</a>
			<div className="w-fit">
				<Dialog open={open} handler={handleOpen} size="xs">
				
						<DialogHeader>Ocorreu um erro!</DialogHeader>
                        <DialogBody>
                            <div className="flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                </svg>
                                <p>Verifique a internet ou cheque se o RM está escrito corretamente!</p>
                            </div>
                        </DialogBody>
						<DialogFooter>
							<button
								variant="text"
								color="red"
								onClick={handleOpen}
								className="button no-wrap align-center mx-2 w-fit py-2 px-4 rounded text-lg"
							>
								<span>OK</span>
							</button>
						</DialogFooter>
				
				</Dialog>
			</div>
		</>
	);
}