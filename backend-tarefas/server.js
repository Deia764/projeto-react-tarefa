import express from "express"
import cors from "cors"
import pool from "./db.js"

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
console.log(`servodor rodando na porta ${PORT}`)

})

const criarTabela = async() => {
await pool.query(`
CREATE TABLE IF NOT EXISTS tarefas(
id SERIAL PRIMARY KEY,
titulo VARCHAR(255) NOT NULL,
finalizada BOOLEAN DEFAULT FALSE,
uid VARCHAR(255) NOT NULL
)    
`)

console.log("Tabela criada/Verificada com sucesso!")

}

criarTabela()

//Retornar tarefas
app.get("/tarefas", async(req, res) =>{
try {

const  tarefas = await pool.query("select * from tarefas")

res.json(tarefas.rows)
} catch (error) {

res.status(500).send("Erro ao buscar tarefas no banco de dados: " + error )

}
})

//Adicionar nova tarefa
app.post("/tarefas", async(req, res) =>{
try {

const tarefa = req.body    

await pool.query(
"insert into tarefas (titulo, uid) values ($1, $2)",
[tarefa.titulo, tarefa.uid])

res.sendStatus(201)

} catch (error) {
res.status(500).send("Erro ao cadastrar tarefa no banco de dados:" + error.message)    

}
})

//Atualizar tarefa
app.put("/tarefas/:id", async(req, res) =>{
try {
const {id} = req.params
const tarefa = req.body

await pool.query(
"update tarefas set titulo = $1, finalizada = $2 where id = $3",
[tarefa.titulo, tarefa.finalizada, id]
) 
res.sendStatus(200)

} catch (error) {
res.status(500).send("Erro ao alterar a tarefa no banco de dados" + error.message

)   
}

})

//Excluir tarefa
app.delete("/tarefas/:id", async(req, res) =>{
try {
const {id} = req.params

await pool.query(
"delete from tarefas where id = $1",
[id]
)
res.sendStatus(200)

} catch (error) {
res.status(500).send("Erro ao excluir tarefa do banco de dados: " + error.message)


}
})