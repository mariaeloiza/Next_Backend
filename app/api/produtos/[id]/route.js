import conexao from "@/app/lib/conexao";

export async function GET( request, {params} ){

    const id = (await params).id

    const query = `SELECT * FROM produtos WHERE id = ?;`
    const [results] = await conexao.execute(query, [id])

        return new Response(
            JSON.stringify(results),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        )

}