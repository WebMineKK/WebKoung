import { Modal } from 'antd';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { USER_KEY } from '../../middleware/userKey.jsx';


function LogoutModal({ isOpen, isCancel }) {
    const history = useHistory();


    const handleOk = () => {
        localStorage.removeItem(USER_KEY)
        history.push('/')
    };

    return (
        <Modal title="Basic Modal" open={isOpen} onCancel={() => { isCancel(!isOpen) }} onOk={handleOk}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default LogoutModal