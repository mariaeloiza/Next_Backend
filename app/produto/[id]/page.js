'use client'
import axios from "axios";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Produto() {

    const id = useParams().id

    const [ produtos, alteraProdutos ] = useState([]) 

    async function buscaPorId( id ){
        const response = await axios.get("http://localhost:3000/api/produtos/"+id)
        alteraProdutos( response.data )
    }

    useEffect( ()=> {
        if(id){
            buscaPorId(id)
        }
    }, [id] )

    return (  
        <div>
            <h1>Detalhes do produto { id }</h1>

            <button onClick={ ()=> redirect("/") } >Voltar</button>

            <hr/>

            {
                produtos.length > 0 &&
                    <div>
                        <p><strong>{produtos[0].nome}</strong></p>
                        <p> R$ <strong>{produtos[0].preco.toFixed(2)}</strong></p>
                        <p> Quantidade em estoque: {produtos[0].quantidade}</p>
                    </div>
            }

        </div>
    );
}

export default Produto;