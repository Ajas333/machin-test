import { useState } from 'react'
import './App.css'
import UserWrapper from './components/user/UserWrapper'


import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import useStore from './Redux/useStore'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Provider store={useStore}>
        <Routes>
          <Route path='/*' element={<UserWrapper/>}></Route>
          {/* <Route path='admincontrol/*' element={<Wrapper/>}></Route> */}
        </Routes>
      </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
