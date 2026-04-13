import { Link } from 'react-router-dom'
// Fora do componente — dados dos cards
const exercises = [
  {
    num:  '01',
    path: '/trapezio',
    icon: '📐',
    title: 'Área do Trapézio',
    desc:  'Calcule a área informando as bases e a altura.',
  },
  {
    num:  '02',
    path: '/imc',
    icon: '⚖️',
    title: 'Peso Ideal (IMC)',
    desc:  'Calcule o peso ideal baseado no sexo e altura.',
  },
  {
    num:  '03',
    path: '/imposto-renda',
    icon: '💰',
    title: 'Imposto de Renda',
    desc:  'Calcule o desconto de IR sobre o salário.',
  },
  {
    num:  '04',
    path: '/conta-luz',
    icon: '⚡',
    title: 'Conta de Luz',
    desc:  'Calcule a conta de energia pela bandeira tarifária.',
  },
  {
    num:  '05',
    path: '/idade',
    icon: '🎂',
    title: 'Idade e Classificação',
    desc:  'Descubra a classificação etária pelo ano de nascimento.',
  },
]
export default function Home() {
  return (
    <div>

      {/* Cabeçalho da página */}
      <div className='home-hero'>
        <h1>Programação <span>Web com React</span></h1>
        <p>Selecione um exercício para começar.</p>
      </div>

      {/* Grade de cards — map() cria um card para cada exercício */}
      <div className='exercises-grid'>
        {exercises.map((ex) => (

          
          <Link
            key={ex.num}       
            to={ex.path}       
            className='exercise-card'
          >
            <div className='card-number'>exercício #{ex.num}</div>
            <span className='card-icon'>{ex.icon}</span>
            <div className='card-title'>{ex.title}</div>
            <div className='card-desc'>{ex.desc}</div>
            <span className='card-arrow'>→</span>
          </Link>

        ))}
      </div>

    </div>
  )
}
