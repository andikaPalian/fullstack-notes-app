import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';


const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Login />} />
      <Route path='/register' exact element={<Register />} />
      <Route path='/home' exact element={<Home />} />
    </Routes>
  </Router>
)

function App() {
  return (
    <div>{routes}</div>
  )
}

export default App
