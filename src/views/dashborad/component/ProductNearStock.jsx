import React from 'react'

function ProductNearStock() {

    const data = [
        { title: 'Maud', price: 151865, quantity: 75, amount: 4597151 },
        { title: 'Loretta', price: 152881, quantity: 60, amount: 4982938 },
        { title: 'Luke', price: 128812, quantity: 26, amount: 3152929 },
        { title: 'Johnny', price: 107260, quantity: 31, amount: 4782605 },
        { title: 'Howard', price: 161807, quantity: 15, amount: 5193920 },
        { title: 'Sadie', price: 127313, quantity: 15, amount: 5219116 },
        { title: 'Amanda', price: 150014, quantity: 16, amount: 4184201 },
        { title: 'Mabelle', price: 179268, quantity: 24, amount: 5881406 },
        { title: 'Hilda', price: 106788, quantity: 82, amount: 5755158 },
        { title: 'Julian', price: 121241, quantity: 21, amount: 4226902 },
        { title: 'Timothy', price: 119063, quantity: 40, amount: 3543777 },
        { title: 'Ronnie', price: 154504, quantity: 10, amount: 6581602 },
    ]

    return (
        <>
            <div className='h-[280px] overflow-scroll'>
                <table className='w-full '>
                    <thead>
                        <tr>
                            <th align='left' className='pl-2.5'>ລາຍການ</th>
                            <th align='right' className='pr-2.5'>ລາຄາ</th>
                            <th align='right' className='pr-2.5'>ຈຳນວນ</th>
                            <th align='right' className='pr-2.5'>ລວມ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((x) => {
                                return (
                                    <tr>
                                        <td align='left'>{x.title}</td>
                                        <td align='right'>{x.price}</td>
                                        <td align='right'>{x.quantity}</td>
                                        <td align='right'>{x.amount}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductNearStock