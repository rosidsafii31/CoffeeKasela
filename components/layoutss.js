import React from 'react'
import NavBar from '../pages/admin'
import Notify from './Notify'
import Modal from './Modal'
function Layouts({children}) {
    return (
        <div className="">
            <Notify/>
            <NavBar />
            <Modal/>
            {children}
        </div>
    )
}

export default Layouts
