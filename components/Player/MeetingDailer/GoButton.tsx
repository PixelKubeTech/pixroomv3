import React from 'react'
import './style.css'
import ChevronLeft from '@mui/icons-material/ChevronLeft';
export default (props) => {
    let title = props.title === "back" ? <ChevronLeft /> : props.title
    return <button onClick={props.onClick} className='round-button'>{title}</button>
}