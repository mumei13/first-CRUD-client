import React from 'react'
import { Alert } from 'antd';

const AlertMessage = ({ info }) => {
    return info === null ? null : (
        <Alert variant={info.type} message={info.message} />
    )
}

export default AlertMessage
