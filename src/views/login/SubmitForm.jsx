import { Button, Input } from 'antd'
import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import classes from '../../components/style/ButtonStyle.module.css'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Loader2 } from "lucide-react"
import { myAPI } from '../../middleware/api.jsx';
import { USER_KEY } from '../../middleware/userKey.jsx';
import { postLogin } from '../../middleware/LoginAPI.jsx';

function SubmitForm() {
    let history = useHistory()

    const [enterUser, setEnterUser] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    // const [checkLogin, setCheckLogin] = useState(false);

    const handleSubmit = async () => {
        setLoading(true)
        // let sendData = {
        //     username: enterUser.username,
        //     password: enterUser.password
        // }
        // console.log(sendData);
        try {
            // const { data } = await postLogin({ senddata: sendData });
            // // console.log(data.data.token);
            // if (data.status === 200 && data?.data?.resultCode === 200) {
            //     const newData = data.data
            //     // console.log(data.data);
            //     localStorage.setItem('@koungStock', JSON.stringify(newData))
            //     history.push('/home/dashborad')
            //     setLoading(false)
            // }

            await myAPI.post('login', {
                username: enterUser.username,
                password: enterUser.password
            }).then((res) => {
                if (res?.status === 200) {

                    setTimeout(() => {
                        localStorage.setItem(USER_KEY, JSON.stringify(res?.data))
                        history.push('/home/dashborad')
                        setLoading(false)
                    }, 200)
                } else {
                    // history.push('/login')
                }
            }).catch(e => console.error(e))
        } catch (error) {
            console.error(error)
        }
    };




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
                        icon={loading && <Loader2 size={16} className="animate-spin" />}
                        className={`${classes.base} w-full flex items-center justify-center`}
                        size='large'
                        onClick={() => handleSubmit()}>

                        ເຂົ້າສູ່ລະບົບ
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SubmitForm