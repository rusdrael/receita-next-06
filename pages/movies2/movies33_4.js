import useSWR from 'swr'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

export function TheForm({url, acao}){
    const { register, handleSubmit } = useForm();
    return (
        <div>
            <style jsx>{`
                form {
                    display: flex;
                    flex-direction: row;
                    font-family: Arial, Verdana, sans-serif;
                    justify-content: center;
                    align-items: center;
                }
                input, button {
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
            <form onSubmit={handleSubmit(acao)}>
                <input id="titleSearchString" {...register("titleSearchString")} type="text" autoComplete="true" placeholder='Filtro de Título'/>
                <input id="yearSearchString" {...register("yearSearchString")} type="text" autoComplete="true" placeholder='Filtro de Ano'/>
                <button type='submit'>{url === '' ? 'Mostrar' : 'Ocultar'}</button>
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
            <p>{data.Title} --- {data.Year}</p>               
        </div>
    )
}

export default function Movies33_4(){
    const [state, setState] = useState({url:'', titleSearchString:'', yearSearchString:''})
    const {data, error} = useSWR(state.url, async () => {
        if (!state.url || !state.titleSearchString || !state.yearSearchString) return {Search:''}
        if (state.url === '' || state.titleSearchString ==='' || state.yearSearchString === '') return {Search:''}
        const res = await fetch(`${state.url}/?apiKey=8c3ab9c9&t=${state.titleSearchString}&y=${state.yearSearchString}`)
        const json = await res.json();
        return json;
    })
    const onClickHandler = () => {
        const t = document.querySelector('#titleSearchString').value
        const y = document.querySelector('#yearSearchString').value
        if (t === '' || y === '') {
            alert('Digite algo');
            return <div>Digite algo</div>
        }
        else if (state.url === '') {
            setState({url:'http://www.omdbapi.com',titleSearchString:t,yearSearchString:y})
        }
        else setState({url:'',titleSearchString: state.titleSearchString, yearSearchString: state.yearSearchString})
    }
    return (
        <div>
            <TheForm url={state.url} acao={onClickHandler} />
            <TheMovies data={data ? data: {Search:''} } show={state.url !== ''} />        
        </div>
    )
}