import { Tag } from "antd"

function FooterRemark() {
    return (
        <div className='mx-5 mb-24 leading-7'>
            <div className='flex'>
                <p className='font-bold mr-1'>ໝາຍເຫດ:</p>
                <p>ລາຍລະອຽດສະຖານະຂອງສິນຄ້າ</p>
            </div>
            <div className='flex mt-2'>
                <div className='w-28'>
                    <Tag color="geekblue" className='w-24 text-center'>ລໍຖ້າດຳເນີນການ</Tag>
                </div>
                <p>ລໍຖ້າດຳເນີນການຈັດສົ່ງສິນຄ້າເຂົ້າລົດຂົ່ນສົ່ງ.</p>
            </div>
            <div className='flex'>
                <div className='w-28'>
                    <Tag color="volcano" className='w-24 text-center'>ກຳລັງຂົ່ນສົ່ງ</Tag>
                </div>
                <p>ລົດຂົ່ນສົ່ງກຳລັງດຳເນີນການສົ່ງສິນຄ້າລົງຕາມແຕ່ລະຈຸດຂອງໃບບິນນັ້ນໆ.</p>
            </div>
            <div className='flex'>
                <div className='w-28'>
                    <Tag color="orange" className='w-24 text-center'>ກວດສອບສຳເລັດ</Tag>
                </div>
                <p>ກວດສອບລາຍລະອຽດສິນຄ້າສຳເລັດ ແລະ ນຳສິນຄ້າກັບສາງ (ຖ້າມີ).</p>
            </div>
            <div className='flex'>
                <div className='w-28'>
                    <Tag color="cyan" className='w-24 text-center'>ໃບບິນຖືກຍົກເລີກ</Tag>
                </div>
                <p>ສິນຄ້າທັງໝົດຖືກຍົກເລີກ ແຕ່ຈຳນວນສິນຄ້າທີ່ເບີກອອກຈາກລະບົບຈະບວກເພີ່ມກັບເຂົ້າລະບົບຄືນ.</p>
            </div>
        </div>
    )
}

export default FooterRemark