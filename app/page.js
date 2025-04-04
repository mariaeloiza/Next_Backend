'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

    const [ produtos, alteraProdutos ] = useState([])

    async function buscaTodos(){
        const response = await axios.get("http://localhost:3000/api/produtos")
        alteraProdutos( response.data )
    }

    function buscaPorId(){

    }

    function buscaPorNome(){

    }

    function InsereProduto(){

    }

    function atualizaProduto(){

    }

    function removeProduto(){

    }

    function formataData( valor ){
        let data = valor.split("T")[0]
        let hora = valor.split("T")[1]

        data = data.split("-")
        data = data.reverse()
        data = data.join("/")

        hora = hora.split(".")[0]
        hora = hora.split(":")
        hora = hora[0]+":"+hora[1]   
        
        return data+" às "+hora
    }

    useEffect( ()=> {
        buscaTodos()
    }, [] )

    return (
        <div>

            <style>
                    {`
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        padding: 12px;
                        text-align: center;
                        border: 1px solid #ddd;
                    }
                    th {
                        background-color: #4CAF50;
                        color: white;
                        font-weight: bold;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    tr:nth-child(odd) {
                        background-color: white;
                    }
                    `}
            </style>

            <h1>Gerenciamento de produtos</h1>

            <button>Listagem</button>
            <button>Cadastro</button>

            <hr/>
            <h2>Cadastro</h2>

            <form>
                <label>Digite o nome do produto: <input/></label>
                <br/>
                <label>Digite o preço: <input/></label>
                <br/>
                <label>Digite a quantidade: <input/></label>
                <br/>
                <button>Salvar</button>
            </form>

            <hr/>

            <h2>Listagem</h2>

            {
                produtos.length > 0 ?
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Registro</th>
                        </tr>
                        {
                            produtos.map( i =>
                                <tr>
                                    <td> {i.id} </td>
                                    <td> {i.nome} </td>
                                    <td> R$ {i.preco.toFixed(2)} </td>
                                    <td> {i.quantidade} </td>
                                    <td> { formataData(i.registro) } </td>
                                </tr>
                            )
                        }
                    </table>
                :
                    <p>Carregando...</p>
                    
            }
            
        </div>
    );
}
