import React from 'react'
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className='MainContainer'>
            <Navbar/>
            <MainContent/>
            <Footer/>
        </div>
    )
}


export default App