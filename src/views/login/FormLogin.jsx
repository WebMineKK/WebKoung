import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Input, Button } from 'antd';
import SubmitForm from './SubmitForm.jsx';

function FormLogin() {

    const [checkGetOTP, setCheckGetOTP] = useState(false);
    const [ButtonStatus, setButtonStatus] = useState(1);

    return (
        <div className="bg-white px-12 py-12 rounded-2xl w-full max-w-md space-y-3 shadow-md h-[400px]">
            <div>
                <h3 className="text-center text-xl font-bold tracking-tight">
                    Koung InventryStock
                </h3>
                <p className='text-[#a8a8a8] text-sm text-center'>ເຂົ້າສູ່ລະດ້ວຍຂໍ້ມູນຂອງທ່ານ</p>
            </div>
            <div className='flex justify-center'>
                <div className='border-[1.5px] rounded-md w-[60%] border-[#a8a8a84b] border-solid' />
            </div>
            <div className="pt-4">
                <SubmitForm
                    getOTP={checkGetOTP}
                    cbOTP={(e) => setCheckGetOTP(e)}
                    st={ButtonStatus}
                    cbstatus={(e) => setButtonStatus(e)}
                />
                <div>
                </div>
                <div className='text-xs text-end text-[#a8a8a8] pt-5'>Version 1.0.0,  Lasted Update 01/2024 </div>
            </div>
        </div>
    )
}

export default FormLogin