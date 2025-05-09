'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Home() {

    const [ produtos, alteraProdutos ] = useState([])

    const [ nome, alteraNome ] = useState([])
    const [ preco, alteraPreco ] = useState([])
    const [ quantidade, alteraQuantidade ] = useState([])

    const [ editando, alteraEditando ] = useState(0)
    const [ pesquisa, alteraPesquisa ] = useState("")


    async function buscaTodos(){
        const response = await axios.get("http://localhost:3000/api/produtos")
        alteraProdutos( response.data )
    }

    async function buscaPorId( id ){
        const response = await axios.get("http://localhost:3000/api/produtos/"+id)
        alteraProdutos( response.data )
    }

    function buscaPorNome(){

    }

    async function insereProduto(){

        const obj = {
            nome: nome,
            preco: preco,
            quantidade: quantidade
        }

        const response = await axios.post("http://localhost:3000/api/produtos", obj)
        console.log(response)
        buscaTodos()

        alteraNome("")
        alteraPreco("")
        alteraQuantidade("")

    }

    async function atualizaProduto(){

        const obj = {
            nome: nome,
            preco: preco,
            quantidade: quantidade
        }

        const response = await axios.put("http://localhost:3000/api/produtos/"+editando, obj)
        buscaTodos()

        alteraEditando(0)
        alteraNome("")
        alteraPreco("")
        alteraQuantidade("")

    }

    async function removeProduto( id ){
        await axios.delete("http://localhost:3000/api/produtos/"+id)
        buscaTodos()
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

    function montaEdicao( produto ){
        alteraEditando( produto.id )
        alteraNome( produto.nome )
        alteraPreco( produto.preco )
        alteraQuantidade( produto.quantidade )
    }

    function enviaFormulario(e){
        e.preventDefault()

        if( editando == 0 ){
            insereProduto()
        }else{
            atualizaProduto()
        }

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
                        background-color:rgb(26, 48, 80);
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

            <form onSubmit={ (e)=> enviaFormulario(e) } >
                <label>Digite o nome do produto: <input onChange={ (e)=> alteraNome(e.target.value) } value={nome} /></label>
                <br/>
                <label>Digite o preço: <input onChange={ (e)=> alteraPreco(e.target.value) } value={preco} /></label>
                <br/>
                <label>Digite a quantidade: <input onChange={ (e)=> alteraQuantidade(e.target.value) } value={quantidade} /></label>
                <br/>
                <button>Salvar</button>
            </form>

            <hr/><br/>

            <p>Busca de produtos. Digite seu ID:</p>
            <input onChange={ (e)=> alteraPesquisa(e.target.value) } />
            <button onClick={ (e)=> buscaPorId(pesquisa) } >Pesquisar</button>

            <br/><br/><hr/>

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
                                    <td> 
                                        <button onClick={ ()=> redirect("/produto/"+i.id) }>Ver</button>
                                        <button onClick={ ()=> montaEdicao(i) } >Editar</button>
                                        <button onClick={ ()=> removeProduto(i.id)} >Remover</button> 
                                    </td>
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
