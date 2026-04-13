import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Trapezio() {
  const [baseMaior, setBaseMaior] = useState('')
  const [baseMenor, setBaseMenor] = useState('')
  const [altura, setAltura] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function calcular() {
    setErro('')
    setResultado(null)

    const B = parseFloat(baseMaior)
    const b = parseFloat(baseMenor)
    const h = parseFloat(altura)

    if (isNaN(B) || isNaN(b) || isNaN(h)) {
      setErro('Preencha todos os campos com valores numéricos válidos.')
      return
    }

    if (B <= 0 || b <= 0 || h <= 0) {
      setErro('Todos os valores devem ser maiores que zero.')
      return
    }

    if (b >= B) {
      setErro('A base maior (B) deve ser maior que a base menor (b).')
      return
    }

    const area = ((B + b) * h) / 2
    setResultado(area.toFixed(4))
  }

  function limpar() {
    setBaseMaior('')
    setBaseMenor('')
    setAltura('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="exercise-page">
      <Link to='/' className='btn btn-ghost'>
        ← Voltar ao menu
      </Link>
      <div className="exercise-header">
        <div className="exercise-num">// exercício 01</div>
        <h1 className="exercise-title">📐 Área do Trapézio</h1>
        <p className="exercise-desc">
          Informe as medidas do trapézio para calcular sua área. A fórmula utilizada é{' '}
          <strong style={{ color: 'var(--accent)' }}>Área = ((B + b) * h) / 2</strong>.
        </p>
      </div>
      <div className="form-card">
        <div className="form-grid form-grid-2">
          <div className="field">
            <label>Base Maior (B)</label>
            <input
              type="number"
              placeholder="ex: 10"
              value={baseMaior}
              onChange={(e) => setBaseMaior(e.target.value)}
              min="0"
              step="any"
            />
          </div>
          <div className="field">
            <label>Base Menor (b)</label>
            <input
              type="number"
              placeholder="ex: 6"
              value={baseMenor}
              onChange={(e) => setBaseMenor(e.target.value)}
              min="0"
              step="any"
            />
          </div>
        </div>
        <div className="field">
            <label>Altura (h)</label>
            <input
              type="number"
              placeholder="ex: 4"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              min="0"
              step="any"
            />
          </div>

        {erro && <div className="error-msg">{erro}</div>}

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={calcular}>
            Calcular Área →
          </button>
          <button className="btn btn-ghost" onClick={limpar}>
            Limpar
          </button>
        </div>
        <div className="formula-hint">
          <strong>Fórmula:</strong> Área = ((B + b) * h) / 2 &nbsp;|&nbsp;
          B = base maior, b = base menor, h = altura
        </div>
      </div>

      {resultado !== null && (
        <div className="result-panel">
          <div className="result-label">// resultado</div>
          <div className="result-value">{resultado}</div>
          <div className="result-detail">
            unidades quadradas &nbsp;•&nbsp;
            bases: {baseMaior} e {baseMenor} &nbsp;•&nbsp; altura: {altura}
          </div>
        </div>
      )}
    </div>
  )
}