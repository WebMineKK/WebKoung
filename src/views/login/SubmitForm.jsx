import { Button, Input } from 'antd'
import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import classes from '../../components/style/ButtonStyle.module.css'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Loader2 } from "lucide-react"
import { myAPI } from '../../middleware/api';
import { USER_KEY } from '../../middleware/userKey';

function SubmitForm({ cbstatus }) {
    let history = useHistory()

    const [enterUser, setEnterUser] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    // const [checkLogin, setCheckLogin] = useState(false);

    const handleSubmit = async () => {

        await myAPI.post('login', {
            username: enterUser.username,
            password: enterUser.password
        }).then((res) => {
            if (res?.status === 200) {

                setTimeout(() => {
                    localStorage.setItem(USER_KEY, JSON.stringify(res?.data))
                    history.push('/home/dashborad')
                    setLoading(false)
                }, 300)
            } else {
                // history.push('/login')
            }
        }).catch(e => console.error(e))
    }

    return (
        <>
            <div className="-space-y-px rounded-md">
                <div>
                    <p className="text-md mb-1.5">
                        ຊື່ຜູ້ໃຊ້ລະບົບ
                    </p>
                    <Input autoComplete={false} size='large'
                        onChange={(e) => setEnterUser({ ...enterUser, username: e.target.value })} />
                </div>
                <div className='pt-3'>
                    <p className="text-md mb-1.5">
                        ລະຫັດຜ່ານ
                    </p>
                    <Input.Password size='large'
                        onChange={(e) => setEnterUser({ ...enterUser, password: e.target.value })}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>
                <div className='pt-5'>
                    <Button
                        className={`${classes.base} w-full `}
                        size='large'
                        onClick={() => handleSubmit()}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        ເຂົ້າສູ່ລະບົບ
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SubmitForm