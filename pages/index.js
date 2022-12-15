import Link from "next/link";

export default function Receita6(){
    return (
        <div>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                nav {
                    margin-top: 20px;
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }
                a {
                    text-decoration: none;
                    color: #000;
                    font-family: Arial, Verdana, sans-serif;
                    font-size: 20px;
                    padding: 5px;
                }
                a:hover {
                    color: #ccc;
                }
                h2 {
                    font-family: Arial, Verdana, sans-serif;
                    color: #000;
                    text-align: center;
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
            <h2>Receita-Next-06</h2>
            <p>Site para uma atividade da disciplina de Programação Web.</p>
            <nav>
                <Link href='movies/movies33'><a>Pesquisa padrão consertada.</a></Link>
                <Link href='movies1/movies33_3'><a>Pesquisa com enter.</a></Link>
                <Link href='movies2/movies33_4'><a>Pesquisa mais específica.</a></Link>
                <Link href='movies3/movies33_5'><a>Pesquisa ordenada por título.</a></Link>
            </nav>
        </div>
    )
}