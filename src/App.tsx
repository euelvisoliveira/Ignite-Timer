import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './Contexts/CyclesContext'

// sempre que precisarmos que uma informação esteja disponível para varias rotas da aplicação a gente coloca o Provider do nosso contexto sempre no app (no componente que esta por volta dessas rotas)

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
