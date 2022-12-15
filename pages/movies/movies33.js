import useSWR from 'swr'
import {useState} from 'react'

export function TheForm(){
    return (
        <div>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    font-family: Arial, Verdana, sans-serif;
                    justify-content: center;
                    align-items: center;
                }
                input {
                    display: flex;
                    text-decoration: none;
                    text-align: center;
                    font-family: Arial, Verdana, sans-serif;
                    color: #000;
                    font-size: 15px;
                    background-color: #fff;
                    border-collapse: collapse;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    max-width: 500px;
                    gap: 7px;
                    padding: 5px;
                }
            `}
            </style>
            <form>
                <input id="titleSearchString" name="titleSearchString" type="text" autoComplete="true" placeholder="Filtro de Título"/>
            </form>
        </div>
    )
}

export function TheMovies({data,show}){
    if (!show) return (<div></div>)
    if (!data) return (<div></div>)
    if (data.error) {
        return (
            <div>
                <style jsx>{`
                    div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    p {
                        text-align: center;
                        font-family: Arial, Verdana, sans-serif;
                        color: #000;
                        font-size: 20px;
                        background-color: #ccc;
                        border-collapse: collapse;
                        border: 1px solid #444;
                        border-radius: 15px;
                        max-width: 500px;
                        gap: 7px;
                        padding: 5px;
                    }
                `}
                </style>
                <p>Falha na pesquisa</p>    
            </div>
        )
    }
    if (data.Response == 'False') {
        return (
            <div>
                <style jsx>{`
                    div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    p {
                        text-align: center;
                        font-family: Arial, Verdana, sans-serif;
                        color: #000;
                        font-size: 20px;
                        background-color: #ccc;
                        border-collapse: collapse;
                        border: 1px solid #444;
                        border-radius: 15px;
                        max-width: 500px;
                        gap: 7px;
                        padding: 5px;
                    }
                `}
                </style>
                <p>Nenhum filme encontrado</p>    
            </div>
        )
    }
    if (data.Search === '' ) {
        return (
            <div>
                <style jsx>{`
                    div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    p {
                        text-align: center;
                        font-family: Arial, Verdana, sans-serif;
                        color: #000;
                        font-size: 20px;
                        background-color: #ccc;
                        border-collapse: collapse;
                        border: 1px solid #444;
                        border-radius: 15px;
                        max-width: 500px;
                        gap: 7px;
                        padding: 5px;
                    }
                `}
                </style>
                <p>Carregando...</p>    
            </div>
        )
    }
    return (
        <div>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                p {
                    text-align: center;
                    font-family: Arial, Verdana, sans-serif;
                    color: #000;
                    font-size: 20px;
                    background-color: #ccc;
                    border-collapse: collapse;
                    border: 1px solid #444;
                    border-radius: 15px;
                    max-width: 500px;
                    gap: 7px;
                    padding: 5px;
                }
            `}
            </style>
            <p>{ data.Search.map( (m) => <div key={m.imdbID}>{m.Title} --- {m.Year}</div>  ) }</p>    
        </div>
    )
}

export function TheLink({url, handler}){
    return (
        <div>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    font-family: Arial, Verdana, sans-serif;
                    justify-content: center;
                    align-items: center;
                }
                a {
                    text-decoration: none;
                    text-align: center;
                    font-family: Arial, Verdana, sans-serif;
                    color: #000;
                    font-size: 15px;
                    background-color: #fff;
                    border-collapse: collapse;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    max-width: 500px;
                    gap: 7px;
                    padding: 5px;
                }
                a:hover {
                    color: #ccc;
                }
            `}
            </style>
            <a href="/movies.js" onClick={handler}> {url === '' ? 'Mostrar' : 'Ocultar'} </a>
        </div>
    )
}

export default function Movies33(){
    const [state, setState] = useState({url:'', titleSearchString:''})
    const {data, error} = useSWR(state.url, async (u) => {
        if (!state.url || !state.titleSearchString) return {Search:''}
        if (state.url === '' || state.titleSearchString ==='') return {Search:''}
        const res = await fetch(`${state.url}/?apiKey=8c3ab9c9&s=${state.titleSearchString}`)
        const json = await res.json();
        return json;
    })
    const onClickHandler = e => {
        e.preventDefault()
        let s = document.getElementById('titleSearchString').value
        if (s === '') {
            alert('Digite algo');
            return <div>Digite algo</div>
        }
        else if (state.url === '') {
            setState({url:'http://www.omdbapi.com',titleSearchString:s})
        }
        else setState({url:'',titleSearchString: state.titleSearchString})
    }
    return (
        <div>
            <style jsx>{`
                .pesquisa {
                    display: flex;
                    flex-direction: row;
                    font-family: Arial, Verdana, sans-serif;
                    justify-content: center;
                    align-items: center;
                }
            `}
            </style>
            <div className='pesquisa'>    
                <TheForm/>
                <TheLink url={state.url} handler={onClickHandler} />
            </div>
            <TheMovies data={data ? data: {Search:''} } show={state.url !== ''} />
        </div>
    )
}