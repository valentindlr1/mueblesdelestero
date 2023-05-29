import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './components/Landing/Landing'
import Shop from './components/Shop/Shop'
import NavBar from './components/NavBar/NavBar'
import ProductDetail from './components/ProductDetail/ProductDetail'

function App() {
  const location = useLocation()

  return (
    <div className='App'>
      {location.pathname !== "/" ? <NavBar/> : ""}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/shop/detail/:id' element={<ProductDetail/>}/>
        <Route path='/shop' element={<Shop/>}/>
      </Routes>
    </div>
  )
}

export default App
