import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ContainerPage } from './components/container/ContainerPage'
import { Navigation } from './components/Navigation/Navigation'
import { AlertLogPage, CameraPage, LoginPages } from './pages/index'
import { AuthProvider } from './context/AuthContext'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <ContainerPage>
          <Routes>
            <Route path='/' element={<Navigate to={'/detector-camera'} />} />
            <Route path='/detector-camera' element={<CameraPage />} />
            <Route path='/login' element={<LoginPages />} />
            <Route element={<PrivateRoute />}>
              <Route path='/alerts-log' element={<AlertLogPage />} />
            </Route>
          </Routes>
        </ContainerPage>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App
