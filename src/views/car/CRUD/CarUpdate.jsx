import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Modal, Radio, Select, notification, Upload } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api.jsx';
import { USER_KEY } from '../../../middleware/userKey.jsx';
import { useHistory } from 'react-router-dom';
import { X, ImagePlus } from 'lucide-react';
import { UploadOutlined } from '@ant-design/icons';
import { alertSuccess } from '../../../components/notification/Notification.jsx'

function CarUpdate({ dataValue, use, cbuse, result, cbresult }) {
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))
    // console.log(dataValue)
    const [dataOld, setDataOld] = useState(dataValue)
    const { c_id, c_name, c_regis, c_status } = dataOld

    useEffect(() => {
        setDataOld(dataValue)
    }, [dataValue])

    const [carStatus, setCarStatus] = useState(c_status);
    const handleChangeStatus = (e) => {
        setCarStatus(e)
    }

    useEffect(() => {
        setCarStatus(c_status)
    }, [c_status])

    const handleUpdateCar = () => {
        let sendData = {
            id: c_id,
            name: c_name,
            regis: c_regis,
            status: carStatus
        }
        // console.log(sendData);
        myAPI.put('car', sendData, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                alertSuccess({ title: 'ແກ້ໄຂສຳເລັດ', label: 'ແກ້ໄຂຂໍ້ມູນລົດໃໝ່ໃນລະບົບສຳເລັດແລ້ວ.' })
                cbresult(!result)
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
                    <Button size='middle' className={`${classesbtn.base} w-[135px]`} onClick={handleUpdateCar}>ບັນທຶກຂໍ້ມູນ</Button>
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
                                value={c_name}
                                onChange={(e) => setDataOld({ ...dataOld, c_name: e.target.value })} />
                        </div>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ທະບຽນລົດ
                            </p>
                            <Input size='middle'
                                value={c_regis}
                                onChange={(e) => setDataOld({ ...dataOld, c_regis: e.target.value })} />
                        </div>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ສະຖານະ
                            </p>
                            <Select
                                className='w-full'
                                placeholder='ເລືອກ'
                                onChange={handleChangeStatus}
                                value={carStatus}
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

export default CarUpdate