import { useState } from 'react'
import { Link } from 'react-router-dom'

function classificar(idade) {
  // Se a idade for < 12, retorna 'Criança' e para aqui
  if (idade < 12) return { label: 'Criança', emoji: '🧒' }

  // Se chegou aqui, a idade é >= 12.
  // Se for < 18, retorna 'Adolescente' e para aqui
  if (idade < 18) return { label: 'Adolescente', emoji: '🧑' }

  // Se chegou aqui, a idade é >= 18.
  // Se for < 60, retorna 'Adulto' e para aqui
  if (idade < 60) return { label: 'Adulto', emoji: '👤' }

  // Se chegou até aqui, a idade é >= 60
  return { label: 'Idoso', emoji: '👴' }
}

export default function Idade() {
  // new Date() cria um objeto com data e hora atual
  // .getFullYear() extrai apenas o ano (ex: 2026)
  const anoAtual = new Date().getFullYear()

  const [anoNascimento, setAnoNascimento] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function calcular() {
    setErro('')
    setResultado(null)

    // parseInt converte para número inteiro (sem decimais)
    const ano = parseInt(anoNascimento)

    if (isNaN(ano)) {
      setErro('Informe um ano válido.')
      return
    }

    // Valida o intervalo do ano
    if (ano < 1900 || ano > anoAtual) {
      setErro(`O ano deve estar entre 1900 e ${anoAtual}.`)
      return
    }

    // Subtrai o ano de nascimento do ano atual
    const idade = anoAtual - ano

    // Chama a função auxiliar para classificar
    const classe = classificar(idade)

    setResultado({ idade, classe })
  }

  function limpar() {
    setAnoNascimento('')
    setResultado(null)
    setErro('')
  }

  return (
    <div className="exercise-page">
      <div className="exercise-header">
        <div className="exercise-num">// exercício 05</div>
        <h1 className="exercise-title">🎂 Idade e Classificação</h1>
        <p className="exercise-desc">
          Informe seu ano de nascimento para descobrir sua idade e classificação etária.
        </p>
      </div>

      <div className="form-card">
        <div className="field">
          <label>Ano de Nascimento</label>
          <input
            type="number"
            placeholder={`ex: ${anoAtual - 25}`}
            value={anoNascimento}
            onChange={(e) => setAnoNascimento(e.target.value)}
            min="1900"
            max={anoAtual}
          />
        </div>
      </div>

      {erro && <div className="error-msg">{erro}</div>}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-primary" onClick={calcular}>
          Calcular Idade →
        </button>
        <button className="btn btn-ghost" onClick={limpar}>
          Limpar
        </button>
      </div>

      {resultado !== null && (
        <div className="result-panel">
          <div className="result-label">// resultado</div>
          <div className="result-value">{resultado.idade} anos</div>
          <div className="result-detail">
            {resultado.classe.emoji} {resultado.classe.label}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {anoNascimento} → {anoAtual} = {resultado.idade} anos
            </p>
          </div>
        </div>
      )}
      <Link to='/' className='btn btn-ghost' style={{ marginTop: '2rem' }}>
        ← Voltar ao menu
      </Link>
    </div>
  )
}
