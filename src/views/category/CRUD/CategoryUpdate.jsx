import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Modal, Radio, Select, notification, Upload } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api';
import { USER_KEY } from '../../../middleware/userKey';
import { useHistory } from 'react-router-dom';
import { X, ImagePlus } from 'lucide-react';
import { UploadOutlined } from '@ant-design/icons';
import { alertSuccess } from '../../../components/notification/Notification'

function CategoryUpdate({ dataValue, use, cbuse, result, cbresult }) {
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))
    // console.log(dataValue)
    const [dataOld, setDataOld] = useState(dataValue)
    const { cate_id, cate_name, seq, status } = dataOld

    useEffect(() => {
        setDataOld(dataValue)
    }, [dataValue])

    const [cateStatus, setCateStatus] = useState(status);
    const handleChangeStatus = (e) => {
        setCateStatus(e)
    }

    useEffect(() => {
        setCateStatus(status)
    }, [status])

    const handleUpdateCate = () => {
        let sendData = {
            id: cate_id,
            name: cate_name,
            status: cateStatus
        }
        // console.log(sendData);
        myAPI.put('category', sendData, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                alertSuccess({ title: 'ແກ້ໄຂສຳເລັດ', label: 'ແກ້ໄຂຂໍ້ມູນໝວດໝູ່ໃໝ່ໃນລະບົບສຳເລັດແລ້ວ.' })
                cbresult(!result)
            } else {
                console.log('Failed')
            }
        }).catch(e => console.error(e))
    }

    return (
        <div>
            <div className='mt-8 flex justify-end mr-4'>
                <Button size='middle' className={`bg-slate-200 mr-4`} onClick={() => cbuse(!use)}><X /></Button>
                <Button size='middle' className={`${classesbtn.base} w-[135px]`} onClick={handleUpdateCate}>ບັນທຶກຂໍ້ມູນ</Button>
            </div>
            <div className={`${classes.silde}`}>
                <div className='text-center bg-blue-950 text-white py-3 rounded-tl-md rounded-tr-md'>
                    <p className='font-bold text-base'>ແກ້ໄຂຂໍ້ມູນໝວດໝູ່ໃໝ່</p>
                </div>
                <div className={`${classes.sildecontect} grid grid-cols-1 gap-5`}>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ຊື່ໝວດໝູ່
                        </p>
                        <Input size='middle'
                            value={cate_name}
                            onChange={(e) => setDataOld({ ...dataOld, cate_name: e.target.value })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ສະຖານະ
                        </p>
                        <Select
                            className='w-full'
                            placeholder='ເລືອກ'
                            onChange={handleChangeStatus}
                            value={cateStatus}
                            options={[
                                {
                                    value: true,
                                    label: 'ເປີດໃຊ້ງານ',
                                },
                                {
                                    value: false,
                                    label: 'ປິດໃຊ້ງານ',
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate