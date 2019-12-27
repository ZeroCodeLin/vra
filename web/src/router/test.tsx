import * as React from 'react'
import { useState, useEffect } from 'react';
import request from '../utils/request'

function Demo () {
    const [num, setNum] = useState(0);

    useEffect(() => {
        getList();
    }, [])

    const getList = () => {
        request.get('api/xhr/test.json', null, {}).then(item => {
            console.log(item);
        })
    }
    const change = (e: any) => {
        console.log(e.target.value)
        setNum(e.target.value)
    }
    const loading = () => {
        getList();
    }
    return (
        <div>
            num: {num}
            <input type="text" onChange={change} />
            <button onClick={() => loading()}>loading</button>
        </div>
    )
}

export default Demo;