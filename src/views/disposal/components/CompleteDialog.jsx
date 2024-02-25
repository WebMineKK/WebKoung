import { Button, Modal } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom';
import iccomplete from '../../../assets/icon/tick-mark.svg'
import '../../../components/style/ButtonStyle.css'

function CompleteDialog({ use, cbuse, result, cbresult, label, header, labelok, labelcancel, link }) {
    let history = useHistory()

    return (
        <Modal
            centered
            width={500}
            title={false}
            open={use}
            okButtonProps={{ className: 'base w-fit' }}
            cancelButtonProps={{ className: 'transaction w-fit' }}
            onOk={() => history.push(`${link}`)}
            onCancel={() => {
                cbuse(!use)
                cbresult(!result)
            }}
            okText={<p >{labelok}</p>}
            cancelText={<p >{labelcancel}</p>}
            footer={(_, { OkBtn, CancelBtn }) => (
                <div className='flex justify-center'>
                    <CancelBtn />
                    <span className='mx-3' />
                    <OkBtn />
                </div>
            )}
        >
            <div className='mt-2 pb-6'>

                <div className='flex items-center '>
                    <img src={iccomplete} width={44} alt='' className='mr-2' />
                    <h4 className='font-bold text-lg'>{header}</h4>
                </div>
                <p className='text-left ml-[3.3rem]'>
                    {label}
                </p>

            </div>
        </Modal >
    )
}

export default CompleteDialog