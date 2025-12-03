import axios from "axios"
import { Await, useNavigate } from "react-router-dom"

const { useState, useEffect } = require("react")

const useTarefa_postgresql =() =>{
const [id, setId] = useState(null)
const [titulo, setTitulo] = useState("")
const [finalizada, setFinalizada] = useState(false)
const [listaTarefas, setListaTarefas] = useState([])

const navigate = useNavigate()

//Definição fixa da url do servidor da API back-ebd
const api = axios.create({
baseURL: "http://localhost:3001"
})

//Funçao para buscar as tarefas do servidor
const buscar_tarefas = async() =>{
try {
const resposta = await api.get("/tarefas")
setListaTarefas(resposta.data)

} catch (error) {
alert("erro ao buscar tarefas: " + error )
}
}

//Buscar tarefas quando o cpmonente for carregado
useEffect(() =>{
buscar_tarefas()
}, [])

//Adicionar uma nova tarefa
const adicionar_tarefa = async(titulo) =>{
const novaTarefa = {
titulo,
finalizada: false,
uid: 1
}
try {
await api.post("/tarefas", novaTarefa)
buscar_tarefas()
alert("Tarefa adiocionada com sucesso")
} catch (error) {
alert("Erro ao adicionar tarefa" + error)
}
}

//Função para excluir uma tarefa
const excluir_tarefa = async(id) =>{
try {
await api.delete("/tarefas/"+ id)
buscar_tarefas()
alert("Tarefa excluída com sucesso")
} catch (error) {
alert("Erro ao excluir tarefa" + error)    
}
}

//Função para exibir detalhes de uma tarefa
const exibir_detalhes_tarefa = (id) =>{
const tarefa = listaTarefas.find(tarefa => tarefa.id === id)
navigate("/tarefaDetalhes", {state: tarefa})
}

//Função para alterar uma tarefa
const alterar_tarefa = async(tarefa_editada) =>{
try {
await api.put("/tarefas/" + tarefa_editada.id, tarefa_editada )
buscar_tarefas()
alert("Tarefa alterada com sucesso")
} catch (error) {
alert("Erro ao alterar tarefa" + error)
}
}

return{
id, 
setId,
titulo,
setTitulo,
finalizada,
setFinalizada,
listaTarefas,
setListaTarefas,
buscar_tarefas,
adicionar_tarefa,
excluir_tarefa,
exibir_detalhes_tarefa,
alterar_tarefa
}
}

export default useTarefa_postgresql
