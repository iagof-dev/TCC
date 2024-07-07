export function onKeyDownRM(e, onResolve) {
    if(onResolve){
        if(e.key == "Enter") onResolve()
    }
    
    if (!/^\d$|^Backspace$/.test(e.key)) {
        e.preventDefault();
    }

}

export function bookCodeGenerator(){
    
}

export function dateConvert(dataStr) {
	const date = new Date(dataStr);
	const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
	return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  }

export function dateConverter(date){
    return `${date.slice(8)}/${date.slice(5,7)}/${date.slice(0,4)}` 
}