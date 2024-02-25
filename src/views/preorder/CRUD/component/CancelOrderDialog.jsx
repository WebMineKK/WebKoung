import React, { useEffect, useState } from 'react';
import { Modal } from 'antd'
import { alertError, alertSuccess } from '../../../../components/notification/Notification.jsx'
import { postCancelOrder } from '../../../../middleware/PreOrderAPI.jsx';

function CancelOrderDialog({ dataValue, use, close, result, cbresult }) {
    // console.log(dataValue);
    const { o_id, order_detail } = dataValue.length > 0 ? dataValue[0] : {}

    const handleCancelOrder = async () => {
        let update = order_detail?.map((y) => {
            return {
                od_id: y.od_id,
                pro_id: y.pro_id,
                od_unit: y.od_unit,
                status: "cancel"
            }
        })

        let sendData = {
            o_id: o_id,
            order_detail: update
        }
        // console.log(sendData);
        try {
            const { data } = await postCancelOrder({ senddata: sendData })
            // console.log(data)
            if (data?.status === 200) {
                setTimeout(() => {
                    alertSuccess({ title: 'ສຳເລັດ', label: 'ໃບບິນຖືກຍົກເລີກສຳເລັດ ຈຳນວນສິນຄ້າເພີ່ມເຂົ້າລະບົບຄືນສຳເລັດ.' })
                    cbresult(!result)
                    close(!use)
                }, 200);
            } else {
                alertError({ title: 'ບໍ່ສຳເລັດ', label: 'ໃບບິນຖືກຍົກເລີກສຳເລັດ ຈຳນວນສິນຄ້າເພີ່ມເຂົ້າລະບົບຄືນສຳເລັດ.' })
            }
        } catch (error) {
            throw new Error('Failed to post API request:', error);
        }
    }

    return (
        <Modal
            style={{ top: 150 }}
            width={500}
            title={<h2 style={{ fontFamily: 'Noto Sans Lao', marginTop: 0, marginBottom: 0 }}>ຢືນຢັນຍົກເລິກໃບບິນ</h2>}
            open={use}
            okButtonProps={{ className: 'base w-[6.25rem]' }}
            cancelButtonProps={{ className: 'w-[6.25rem]' }}
            onOk={handleCancelOrder}
            onCancel={() => {
                close(!use)
            }}
            okText={<p style={{ fontFamily: 'Noto Sans Lao', color: '#ffffff' }}>ຢືນຢັນ</p>}
            cancelText={<p style={{ fontFamily: 'Noto Sans Lao' }}>ຍົກເລີກ</p>}
        >
            <div className=''>
                <p>ທ່ານຕ້ອງການຍົກເລີກໃບບິນແທ້ບໍ ?, ເມື່ອກົດຍົກເລີກຈຳນວນສິນຄ້າທີ່ເບີກຈະນຳກັບເຂົ້າລະບົບຄືນ.</p>
            </div>
        </Modal>
    )
}

export default CancelOrderDialog