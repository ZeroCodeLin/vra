import * as React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'

function Demo () {
    const [num, setNum] = useState(0);

    useEffect(() => {
        getList();
    }, [])

    const getList = () => {
        axios.get('api/xhr/test.json').then(item => {
            console.log(item);
        })
    }
    const change = (e) => {
        console.log(e.target.value)
        setNum(e.target.value)
    }
    return (
        <div>
            num: {num}
            <input type="text" onChange={change} />
        </div>
    )
}

export default Demo;