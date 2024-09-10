import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes ,Route, Router } from 'react-router-dom'
import Header from './header'
import SignIn from './fire/signin'
import SignUp from './fire/signup'
import Home from './fire/dash'
import Notfound from './notfound'
import Profile from './fire/profile'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<BrowserRouter>
<Header/>
<Routes>
  <Route path='/' element={<Home />} ></Route>
<Route path='/signin' element={<SignIn/>}></Route>
<Route path='/signup' element={<SignUp/>}></Route>
<Route path='/profile' element={<Profile/>}></Route>
<Route path='*' element={<Notfound />} />
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
