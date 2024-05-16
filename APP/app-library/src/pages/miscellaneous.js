export function onKeyDownRM(e, onResolve) {
    if(onResolve){
        if(e.key == "Enter") onResolve()
    }
    
    if (!/^\d$|^Backspace$/.test(e.key)) {
        e.preventDefault();
    }

}

export function dateConverter(date){
    return `${date.slice(8)}/${date.slice(5,7)}/${date.slice(0,4)}` 
}