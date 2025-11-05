import { useLocation, useNavigate } from "react-router-dom"
import "./css/Tarefa.css"
import { useState } from "react"
import useTarefa from "../hooks/useTarefa"
const TelaTarefaDetalhes = ()=> {

const {alterar_tarefa} = useTarefa()

const handle_buttonClick_alterar = () => {
const tarefa_editada = {
...tarefa,
titulo: input_tituloTarefa,
finalizada: radio_finalizada
}

alterar_tarefa(tarefa_editada)

navigate("/")

}

const location = useLocation()
const tarefa =  location.state || {}

const navigate = useNavigate()

const handle_buttonClick_voltar = () =>{
navigate(-1)
}

const [input_tituloTarefa, setInput_tituloTarefa ] = useState(tarefa.titulo)
const [radio_finalizada, setRadio_finalizada] = useState(tarefa.finalizada)

return(
<>
<h1 style={{textAlign: "center"}} tabIndex={1}>
Tela de Detalhamento-Tarefa
</h1>

<div className="box">

<div style={{textAlign: "left", padding: "2px"}}>
<h2 tabIndex={1}>
ID: {tarefa.id}
</h2>
</div>

<div style={{textAlign: "left", padding: "2px"}}>
<h2 tabIndex={1}>
Titulo: &nbsp;
<input type="text" size={50} role="group" aria-label="titulo" value={input_tituloTarefa}
onChange={(campo) => {setInput_tituloTarefa(campo.target.value)}}
/> 
</h2>

</div>

<div style={{textAlign: "left", padding: "2px"}}>
<h2 tabIndex={1}>
Finalizada:    
<label>
<input type="radio" role="group" aria-label="Finalizada Sim" 
value={true}
checked={radio_finalizada === true}
onChange={(campo) =>{
setRadio_finalizada(JSON.parse(campo.target.value))
}}
/>

<span>
Sim &nbsp;
</span>
</label>

<label>
<input type="radio" role="group" aria-label="Finalizada Não" 
value={false}
checked={radio_finalizada === false}
onChange={(campo) =>{
setRadio_finalizada(JSON.parse(campo.target.value))
}}
/>

<span>
Não
</span>
</label>

</h2> 
</div>

<button onClick={() =>{
handle_buttonClick_alterar()
}}>
Alterar
</button>
&nbsp;
&nbsp;
<button onClick={() => {
handle_buttonClick_voltar()
}}>
Voltar
</button>

</div>

</>
)

}

export default TelaTarefaDetalhes