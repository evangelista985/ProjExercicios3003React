import { useState } from 'react'

export default function IMC() {
  const [sexo, setSexo] = useState('masculino')
  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')
  function calcular() {
  setErro('')
  setResultado(null)

  const h = parseFloat(altura)
  const p = parseFloat(peso)

  if (isNaN(h) || isNaN(p)) {
    setErro('Preencha os campos de altura e peso com valores válidos.')
    return
  }
  if (h <= 0 || h > 3) {
    setErro('Informe uma altura válida em metros (ex: 1.75).')
    return
  }
  if (p <= 0 || p > 500) {
    setErro('Informe um peso válido em kg (ex: 70).')
    return
  }

  let pesoIdeal
  if (sexo === 'masculino') {
    pesoIdeal = (72.7 * h) - 58
  } else {
    pesoIdeal = (62.1 * h) - 44.7
  }

  const imc = p / (h * h)
  const diff = p - pesoIdeal

  let classificacao = ''
  let badgeClass = ''
  if (imc < 18.5) { classificacao = 'Abaixo do peso'; badgeClass = 'badge-blue' }
  else if (imc < 25) { classificacao = 'Peso normal'; badgeClass = 'badge-green' }
  else if (imc < 30) { classificacao = 'Sobrepeso'; badgeClass = 'badge-yellow' }
  else if (imc < 35) { classificacao = 'Obesidade grau I'; badgeClass = 'badge-orange' }
  else { classificacao = 'Obesidade grau II+'; badgeClass = 'badge-red' }

  setResultado({ pesoIdeal, imc, diff, classificacao, badgeClass })
}

  function limpar() {
    setAltura('')
    setPeso('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="exercise-page">
      <div className="exercise-header">
        <div className="exercise-num">// exercício 02</div>
        <h1 className="exercise-title">⚖️ Peso Ideal</h1>
        <p className="exercise-desc">
          Calcula o peso ideal baseado no sexo e na altura.{' '}
          Masculino: <strong style={{ color: 'var(--accent)' }}>(72.7 * h) - 58</strong>&nbsp;|&nbsp;
          Feminino: <strong style={{ color: 'var(--accent)' }}>(62.1 * h) - 44.7</strong>
        </p>
      </div>

      <div className="form-card">
        <div className="form-grid" style={{ gap: '1.5rem' }}>
          <div className="field">
            <label>Sexo</label>
            <div className="radio-group">
              {['masculino', 'feminino'].map((s) => (
                <label className="radio-option" key={s}>
                  <input
                    type="radio"
                    name="sexo"
                    value={s}
                    checked={sexo === s}
                    onChange={() => setSexo(s)}
                  />
                  {s === 'masculino' ? '♂ Masculino' : '♀ Feminino'}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="field">
            <label>Altura (em metros)</label>
            <input
              type="number"
              placeholder="ex: 1.75"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div className="field">
            <label>Peso atual (kg)</label>
            <input
              type="number"
              placeholder="ex: 70"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {erro && <div className="error-msg">{erro}</div>}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-primary" onClick={calcular}>
          Calcular →
        </button>
        <button className="btn btn-ghost" onClick={limpar}>
          Limpar
        </button>
      </div>

      {resultado !== null && (
        <div className="result-panel">
          <div className="result-label">// resultado</div>
          <div className="result-value">{resultado.pesoIdeal.toFixed(1)} kg</div>
          <div className="result-detail" style={{ marginBottom: '1rem' }}>
            peso ideal para {sexo === 'masculino' ? 'homens' : 'mulheres'} com {altura}m de altura
          </div>

          <div className="result-row">
            <span className="result-row-label">Peso atual</span>
            <span className="result-row-value">{parseFloat(peso).toFixed(1)} kg</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Peso ideal</span>
            <span className="result-row-value">{resultado.pesoIdeal.toFixed(1)} kg</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Diferença</span>
            <span className="result-row-value" style={{ color: resultado.diff > 0 ? 'var(--red)' : resultado.diff < 0 ? 'var(--blue)' : 'var(--green)' }}>
              {resultado.diff > 0 ? '+' : ''}{resultado.diff.toFixed(1)} kg
            </span>
          </div>
          <div className="result-row">
            <span className="result-row-label">IMC</span>
            <span className="result-row-value">{resultado.imc.toFixed(2)}</span>
          </div>
          <div className="result-row" style={{ border: 'none' }}>
            <span className="result-row-label">Classificação IMC</span>
            <span className={`badge ${resultado.badgeClass}`}>
              {resultado.classificacao}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}