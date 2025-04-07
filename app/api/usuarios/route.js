export async function GET(){

    const usuarios = [
        {nome: "Conradito", idade: 15},
        {nome: "Pedrita", idade: 22},
        {nome: "Joselito", idade: 10}
    ]

    return new Response( 
        JSON.stringify(usuarios),
        {
            status: 200,
            headers: { "Content-Type": "application/json" }
        }
    )
}
