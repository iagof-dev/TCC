export function onKeyDownRM(e, onResolve) {
    if(onResolve){
        if(e.key == "Enter") onResolve()
    }
    
    if (!/^\d$|^Backspace$/.test(e.key)) {
        e.preventDefault();
    }

}
