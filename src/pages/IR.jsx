import {useState} from 'react'
import { Link } from 'react-router-dom'

// No return, antes do formulário:
<Link to='/' className='btn btn-ghost'>
  ← Voltar ao menu
</Link>



// Este array fica FORA da função do componente
// (não muda nunca, não precisa ser estado)
const faixas = [
  { limite: 2112.00,  aliquota: 0     },
  { limite: 2826.65,  aliquota: 0.075 },
  { limite: 3751.05,  aliquota: 0.15  },
  { limite: 4664.68,  aliquota: 0.225 },
  { limite: Infinity, aliquota: 0.275 },
]
// Infinity representa 'sem limite superior'
function calcularIR(salario) {
  // for...of percorre cada objeto do array faixas
  for (const faixa of faixas) {

    // Se o salário couber nesta faixa...
    if (salario <= faixa.limite) {

      // ...calcula e retorna imediatamente
      const desconto = salario * faixa.aliquota
      const liquido  = salario - desconto

      return { desconto, liquido, aliquota: faixa.aliquota }
    }
    // Se não couber, continua para a próxima faixa
  }
}
export default function ImpostoRenda() {

  const [salario,   setSalario]   = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro,      setErro]      = useState('')

  function calcular() {
    setErro('')
    setResultado(null)

    const s = parseFloat(salario)

    if (isNaN(s) || s < 0) {
      setErro('Informe um salário válido.')
      return
    }

    // Chama a função auxiliar criada acima
    const res = calcularIR(s)
    setResultado(res)
  }

  return (
    <div>
      <h1>Imposto de Renda</h1>

      <label>Salário Bruto (R$):</label>
      <input
        type='number'
        value={salario}
        onChange={(e) => setSalario(e.target.value)}
        placeholder='ex: 3500'
      />

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <button onClick={calcular}>Calcular IR</button>

      {resultado !== null && (
        <div>
          <p>Salário bruto: R$ {parseFloat(salario).toFixed(2)}</p>
          <p>Desconto IR:   R$ {resultado.desconto.toFixed(2)}</p>
          <p>Salário líquido: R$ {resultado.liquido.toFixed(2)}</p>
        </div>
      )}
    </div>
  )

}
