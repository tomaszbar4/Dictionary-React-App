import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ({ darkMode }) => {
    return (
        <ReactLoading className="mx-auto" type='bubbles' color={darkMode ? 'white' : 'rgb(31, 31, 31)'} height={'10rem'} width={'10rem'} />
    )
}

export default Loading