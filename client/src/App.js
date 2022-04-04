import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import FormPacientes from './components/FormPacientes'
import TablaPacientes from './components/TablaPacientes'
import Menu from './components/Navar'
import {Container} from '@mui/material'

function App() {
  return (
    <BrowserRouter>
    <Menu/>
      <Container>
        <Routes>
          <Route path='/tablaPacientes' element={<TablaPacientes/>} />
          <Route path='/formPacientes' element={<FormPacientes/>} />
          <Route path='/formPacientes/:id/edit' element={<FormPacientes/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
