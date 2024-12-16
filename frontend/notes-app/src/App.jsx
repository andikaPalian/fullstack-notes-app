import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';


const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Login />} />
      <Route path='/register' exact element={<Register />} />
    </Routes>
  </Router>
)

function App() {
  return (
    <div>{routes}</div>
  )
}

export default App
