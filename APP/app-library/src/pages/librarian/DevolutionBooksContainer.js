export default function DevolutionBooksContainer (props){
    const {isRequesting, devolutionBooks} = {...props}

    return <section className='results-container p-1 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>
        <span className="loading m-auto loading-spinner loading-lg"></span>
    </section>

    if (isRequesting) return <section className='results-container p-1 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>
        <span className="loading m-auto loading-spinner loading-lg"></span>
    </section>

    return <section className='results-container p-1 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'> <table className="table w-fit">
    {/* head */}
    <thead>
        <tr>
            <th></th>
            <th>Título</th>
            <th>Autor</th>
            <th>Data de <br />Empréstimo</th>
            <th>Período<br />(dias)</th>
            <th>Situação</th>
        </tr>
    </thead>
    <tbody className="">
        {devolutionBooks.map((b, i) => {
            let situationColor = ""


            switch (b.situation) {
                case "Pendente":
                    situationColor = "yellow"
                    break

                case "Atrasado":
                    situationColor = "red"
                    break
            }

            return (
                <tr className={` ${i == 0 ? "tr--first" : ""} ${i == devolutionBooks.length - 1 ? "tr--last" : ""}`}>
                    <th>{devolutionBooks.length - i}</th>
                    <td>{b.title}</td>
                    <td>{b.author}</td>
                    <td>{b.loanDate}</td>
                    <td>{b.loanPeriod}</td>
                    <td className={`td-situation td-situation-${situationColor} `
                        // + `${i == 0? "td-situation--first" : ""} ${i == booksHistory.length-1? "td-situation--last" : ""}`
                    }>{b.situation} </td>
                </tr>
            )
        })}

    </tbody>
</table></section>

}