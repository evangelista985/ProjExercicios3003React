import { Routes, Route, BrowserRouter  } from 'react-router-dom'

import Home from './pages/Home'
import Imposto from './pages/IR'
import Trapezio from './pages/Trapezio'
import IMC from './pages/IMC'
import ContaLuz from './pages/ContaLuz'
import Idade from './pages/Idade'


// Dentro de <Routes>, adicione como PRIMEIRA rota:
export default function App(){
  return(
    <BrowserRouter>
<Routes>
<Route path='/' element={<Home />}         />
<Route path='/imposto-renda' element={<Imposto />}         />
<Route path='/trapezio' element={<Trapezio />}         />
<Route path='/imc' element={<IMC />} />
<Route path='/conta-luz' element={<ContaLuz />} />
<Route path='/idade' element={<Idade />} />


</Routes>
</BrowserRouter>

)
}