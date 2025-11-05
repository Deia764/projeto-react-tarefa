import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

const useTarefa = () =>{ 

const [tarefa, setTarefa] = useState(
{
id: null,
titulo: "",
finalizada: false
}
)

const [listaTarefas, setListaTarefas] = useState(() => {
const listaTarefas_storage = localStorage.getItem("listaTarefas")
return listaTarefas_storage?JSON.parse(listaTarefas_storage): []
})

useEffect(() => {
localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas))
}, [listaTarefas])

const exibirMensagem = (color, msg) =>{
const divMesagem = document.getElementById("divMensagem")
divMesagem.style.color = color
divMesagem.textContent = msg
}

const adicionar_tarefa = (titulo) => {
const novaTarefa = {
id: Math.random(),
titulo: titulo,
finalizada: false
}
const novaListaTarefas = [...listaTarefas, novaTarefa]
setListaTarefas(novaListaTarefas)
alert("Tarefa adicionada com sucesso!")

}

const excluir_tarefa = (id) =>{
const novaListaTarefas = listaTarefas.filter(tarefa => tarefa.id !== id)
setListaTarefas(novaListaTarefas)
alert("Tarefa excluída com sucesso!")
}
const navigate = useNavigate()
const exibir_detalhes_tarefa = (id) => {
const tarefa = listaTarefas.find(tarefa => tarefa.id === id)
navigate("/tarefaDetalhes", {state: tarefa} )

}

return({
listaTarefas, 

adicionar_tarefa,
excluir_tarefa,
exibirMensagem,
exibir_detalhes_tarefa
})

}

export default useTarefa