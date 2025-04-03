import mysql from "mysql2/promise"

const conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "serasa_2025"
})

export default conexao;