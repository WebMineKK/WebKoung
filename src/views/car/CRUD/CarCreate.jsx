import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Modal, Radio, Select, notification, Upload } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api.jsx';
import { USER_KEY } from '../../../middleware/userKey.jsx';
import { X, ImagePlus } from 'lucide-react';
import { alertSuccess } from '../../../components/notification/Notification.jsx'

function CarCreate({ use, cbuse, result, cbresult }) {
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))

    const [modelCar, setModelCar] = useState({
        name: '',
        regis: '',
        status: ''
    })

    const handleSelectStatus = (e) => {
        setModelCar({ ...modelCar, status: e })
    }

    const hanldeCreateCar = () => {
        let sendData = {
            name: modelCar.name,
            regis: modelCar.regis,
            status: modelCar.status
        }

        myAPI.post('car', sendData, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                alertSuccess({ title: 'ສຳເລັດ', label: 'ບັນທຶກຂໍ້ມູນລົດເຂົ້າລະບົບສຳເລັດແລ້ວ.' })
                cbresult(!result)
                setModelCar('')
            } else {
                console.log('Failed')
            }
        }).catch(e => console.error(e))
    }

    return (
        <>
            <div>
                <div className='mt-8 flex justify-end mr-4'>
                    <Button size='middle' className={`bg-slate-200 mr-4`} onClick={() => cbuse(!use)}><X /></Button>
                    <Button size='middle' className={`${classesbtn.base} w-[135px]`} onClick={hanldeCreateCar}>ບັນທຶກຂໍ້ມູນ</Button>
                </div>
                <div className={`${classes.silde}`}>
                    <div className='text-center bg-blue-950 text-white py-3 rounded-tl-md rounded-tr-md'>
                        <p className='font-bold text-base'>ເພີ່ມຂໍ້ມູນລົດ</p>
                    </div>
                    <div className={`${classes.sildecontect} grid grid-cols-1 gap-5`}>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ລົດຍີ່ຫໍ
                            </p>
                            <Input size='middle'
                                value={modelCar?.name}
                                onChange={(e) => setModelCar({ ...modelCar, name: e.target.value })} />
                        </div>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ທະບຽນລົດ
                            </p>
                            <Input size='middle'
                                value={modelCar?.regis}
                                onChange={(e) => setModelCar({ ...modelCar, regis: e.target.value })} />
                        </div>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ສະຖານະ
                            </p>
                            <Select
                                className='w-full'
                                placeholder='ເລືອກ'
                                onChange={handleSelectStatus}
                                defaultValue="NORMAL"
                                options={[
                                    {
                                        value: "NORMAL",
                                        label: 'ໃຊ້ງານ',
                                    },
                                    {
                                        value: "FIX",
                                        label: 'ສ້ອມແປງ',
                                    },
                                    {
                                        value: "STOP",
                                        label: 'ຢຸດນຳໃຊ້',
                                    },
                                    {
                                        value: "OTHER",
                                        label: 'ອື່ນໆ',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarCreate