import React, { useEffect, useState } from 'react';
import { Modal } from 'antd'
import { USER_KEY } from '../../../middleware/userKey.jsx';
import { myAPI } from '../../../middleware/api.jsx';
import { alertSuccess } from '../../../components/notification/Notification.jsx'

function CategoryDelete({ dataValue, use, close, result, cbresult }) {
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))
    const { cate_id } = dataValue

    const handleDeleteCategory = () => {
        let sendData = { id: cate_id }
        myAPI.post('dl_category', sendData, {
            headers: { 'Authorization': `Bearer ${userToken?.token}` }
        }).then((res) => {
            if (res?.status === 200) {
                alertSuccess({ title: 'ລືບໝວດໝູ່ສຳເລັດ', label: 'ລືບຂໍ້ມູນໝວດໝູ່ອອກຈາກລະບົບສຳເລັດແລ້ວ.' })
                cbresult(!result)
                close(!use)
            } else {
                console.log('Failed')
            }
        }).catch(e => console.error(e))
    }

    return (
        <Modal
            centered
            width={500}
            title={<h2 style={{ fontFamily: 'Noto Sans Lao', marginTop: 0, marginBottom: 0 }}>ຢືນຢັນການລົບຂໍ້ມູນ</h2>}
            open={use}
            okButtonProps={{ className: 'AA' }}
            cancelButtonProps={{ className: 'w-[100px]' }}
            onOk={handleDeleteCategory}
            onCancel={() => {
                close(!use)
            }}
            okText={<p style={{ fontFamily: 'Noto Sans Lao', color: '#ffffff' }}>ລົບທັນທີ</p>}
            cancelText={<p style={{ fontFamily: 'Noto Sans Lao' }}>ຍົກເລີກ</p>}
        >
            <div>
                <p>ທ່ານຕ້ອງການລົບໝວດໝູ່ນີ້ອອກຈາກລະບົບແທ້ບໍ?</p>
                <p></p>
            </div>
        </Modal>
    )
}

export default CategoryDelete