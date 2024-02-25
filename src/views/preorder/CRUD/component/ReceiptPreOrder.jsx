import React from 'react'
import classes from '../../../../components/style/LayoutStyle.module.css'

function ReceiptPreOrder() {
    return (
        <>
            <div className={`${classes.content} text-sm`}>
                {/* <p className='text-center leading-5'>
                    ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ <br />
                    ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ
                </p> */}
                <div className='flex justify-between'>
                    <h1 className='font-bold text-lg'>ບິນຂາຍ</h1>
                    <div>
                        <p>ເລກທີໃບບີນ: 12345</p>
                        <p>ວັນທີ: 12/03/2024</p>

                    </div>
                </div>
                <hr />
                <div className='grid grid-cols-4 gap-5'>
                    <div className='col-span-2 leading-4'>
                        <h3 className="font-bold">ທ. ຄຳພັນ ພົມມະວົງ</h3>
                        <p>ຕົວແທນຂຳໜ່າຍ ຜະລິດຕະພັນເບຍລາວ ແລະ ນ້ຳຫວານ ປະຈຳເມືອງວັງວຽງ ເຂດ II <br />
                            ບ້ານວັງວຽງ, ເມືອງວັງວຽງ, ແຂວງວຽງຈັນ <br />
                            ສາງ: 023 511 - 4222 <br />
                            ມືຖື: 020 2225 - 4132, 020 5515-5153
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold">ຫາ</h3>
                        <div>
                            <div className='flex'> <p className='w-10'>ລູກຄ້າ:</p><p>ອານຸລັກ</p></div>
                            <div className='flex'> <p className='w-10'>ທີ່ຢູ່:</p><p>ບ້ານວັງວຽງ, ເມືອງວັງວຽງ, ແຂວງວຽງຈັນ</p></div>
                            <div className='flex'> <p className='w-10'>ເບີໂທ:</p><p>020 2225 - 4132</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReceiptPreOrder