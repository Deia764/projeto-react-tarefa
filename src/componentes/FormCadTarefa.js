import { useState } from "react";
import useTarefa from "../hooks/useTarefa";

const FormCadTarefa = ({adicionar_tarefa}) => {
    
    const {exibirMensagem} = useTarefa()

    const [input_tituloTarefa, setInput_tituloTarefa] = useState("")
    
    const handle_buttonClick_add_tarefa = () =>{
    adicionar_tarefa(input_tituloTarefa)
    setInput_tituloTarefa("")
}

return (
<>


<div id="divMensagem" role="alert" aria-live="assertiv"></div>

<div style={{display: "flex"}}>

<input 
type="text" 
role="group" 
aria-label="Título da tarefa" 
style={{width: "80%"}}
value={input_tituloTarefa}
tabIndex={1}
onChange={(campo) =>{
setInput_tituloTarefa(campo.target.value)
}}
/>

<button 
tabIndex={1} 
onClick={() => {handle_buttonClick_add_tarefa()}
}

>
Adicionar Tarefa
</button>

</div>
</>
)

}

export default FormCadTarefa;