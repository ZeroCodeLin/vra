import * as React from 'react'
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import './index.scss';

interface SpinProps {
    spinning: boolean,
    tip?: string,
    size?: "small" | "default" | "large" | undefined,
}

function Loading (prop: SpinProps) {

    return (
        <div className={prop.spinning ? "loading-container" : ''}>
            <Spin spinning={prop.spinning} tip={prop.tip} size={prop.size} />
        </div>
    )
}

export default Loading