import React from 'react'
import Notify from './Notify'
import Modal from './Modal'

function Layouts({children}) {
    return (
        <div className="container">
            <Notify />
            <Modal/>
            {children}
        </div>
    )
}

export default Layouts
