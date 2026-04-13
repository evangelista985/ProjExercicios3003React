import {useState} from 'react'
import { Link } from 'react-router-dom'


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
    <div className="exercise-page">
      <div className="exercise-header">
        <h1>💰 Imposto de Renda</h1>
      </div>

      <div className="form-card">
        <div className="field">
          <label>Salário Bruto (R$):</label>
          <input
            type='number'
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            placeholder='ex: 3500'
          />
        </div>

        {erro && <div className="error-msg">{erro}</div>}
        <button className="btn btn-primary" onClick={calcular}>Calcular IR →</button>
      </div>

      {resultado !== null && (
        <div className="result-panel">
          <div className="result-label">// resultado</div>
          <p>Salário bruto: R$ {parseFloat(salario).toFixed(2)}</p>
          <p>Desconto IR: R$ {resultado.desconto.toFixed(2)}</p>
          <p className="result-value">Salário líquido: R$ {resultado.liquido.toFixed(2)}</p>
        </div>
      )}
      
      <Link to='/' className='btn btn-ghost' style={{ marginTop: '2rem' }}>
        ← Voltar ao menu
      </Link>
    </div>
  )
}
