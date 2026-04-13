import { useState } from 'react'

const bandeiras = [
  {
    id: 'verde',
    label: 'Verde',
    tarifa: 0.60,
    emoji: '🟢',
    desc: 'Situação favorável de geração de energia',
    badgeClass: 'badge-green',
  },
  {
    id: 'amarela',
    label: 'Amarela',
    tarifa: 0.65,
    emoji: '🟡',
    desc: 'Condições menos favoráveis de geração',
    badgeClass: 'badge-yellow',
  },
  {
    id: 'vermelha',
    label: 'Vermelha',
    tarifa: 0.70,
    emoji: '🔴',
    desc: 'Condições críticas de geração de energia',
    badgeClass: 'badge-red',
  },
]

export default function ContaLuz() {
  const [consumo, setConsumo] = useState('')
  const [bandeira, setBandeira] = useState('verde')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function calcular() {
    setErro('')
    setResultado(null)

    const kwh = parseFloat(consumo)
    if (isNaN(kwh) || kwh < 0) {
      setErro('Informe um consumo válido em kWh (número positivo).')
      return
    }

    const band = bandeiras.find((b) => b.id === bandeira)
    const total = kwh * band.tarifa
    setResultado({ total, kwh, band })
  }

  function limpar() {
    setConsumo('')
    setBandeira('verde')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="exercise-page">
      <div className="exercise-header">
        <div className="exercise-num">// exercício 04</div>
        <h1 className="exercise-title">⚡ Conta de Luz</h1>
        <p className="exercise-desc">
          Informe o consumo mensal e selecione a bandeira tarifária para calcular o valor total a pagar.
        </p>
      </div>

      <div className="form-card">
        <div className="form-grid" style={{ gap: '1.5rem' }}>
          <div className="field">
            <label>Consumo mensal (kWh)</label>
            <input
              type="number"
              placeholder="ex: 200"
              value={consumo}
              onChange={(e) => setConsumo(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <div className="field">
            <label>Bandeira tarifária</label>
            <div className="bandeira-group">
              {bandeiras.map((b) => (
                <label key={b.id} className={`bandeira-option ${b.id}`}>
                  <input
                    type="radio"
                    name="bandeira"
                    value={b.id}
                    checked={bandeira === b.id}
                    onChange={() => setBandeira(b.id)}
                  />
                  <div className="bandeira-dot" />
                  <strong>{b.emoji} {b.label}</strong>
                  <span className="bandeira-price">R$ {b.tarifa.toFixed(2)}/kWh</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.3 }}>
                    {b.desc}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {erro && <div className="error-msg">{erro}</div>}

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={calcular}>
            Calcular Conta →
          </button>
          <button className="btn btn-ghost" onClick={limpar}>
            Limpar
          </button>
        </div>

        <div className="formula-hint">
          <strong>Fórmula:</strong> Total = Consumo (kWh) × Tarifa (R$/kWh)
        </div>
      </div>

      {resultado !== null && (
        <div className="result-panel">
          <div className="result-label">// total a pagar</div>
          <div className="result-value">R$ {resultado.total.toFixed(2)}</div>
          <div className="result-detail" style={{ marginBottom: '1rem' }}>
            com bandeira <span className={`badge ${resultado.band.badgeClass}`}>{resultado.band.emoji} {resultado.band.label}</span>
          </div>

          <div className="result-row">
            <span className="result-row-label">Consumo</span>
            <span className="result-row-value">{resultado.kwh.toFixed(1)} kWh</span>
          </div>
          <div className="result-row">
            <span className="result-row-label">Tarifa aplicada</span>
            <span className="result-row-value">R$ {resultado.band.tarifa.toFixed(2)}/kWh</span>
          </div>
          <div className="result-row" style={{ border: 'none' }}>
            <span className="result-row-label">Total</span>
            <span className="result-row-value" style={{ color: 'var(--accent)', fontSize: '1rem' }}>
              R$ {resultado.total.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
