import React, { useEffect, useState } from 'react';
import { Button, Input, Radio, Space, Table, Tag, theme } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import packageic from '../../assets/icon/package.svg'
import packagesic from '../../assets/icon/packages.svg'
import deliverboxic from '../../assets/icon/delivery-box.svg'
import peopleic from '../../assets/icon/people.svg'

function Header() {

    const data = [
        {
            id: 1,
            title: "ສິນຄ້າທັງໝົດ",
            qty: "1,230",
            image: <img src={packagesic} width="50" />,
            unti: "ລາຍການ",
        },
        {
            id: 2,
            title: "ຍັງມີຈຳໜ່າຍ",
            qty: "1,100",
            image: <img src={packageic} width="50" />,
            unti: "ລາຍການ",
        },
        {
            id: 3,
            title: "ຈັດສົ່ງສຳເລັດ",
            qty: "0",
            image: <img src={deliverboxic} width="50" />,
            unti: "ລາຍການ",
        },
        {
            id: 4,
            title: "ລູກຄ້າທັງໝົດ",
            qty: "130",
            image: <img src={peopleic} width="50" />,
            unti: "ຄົນ",
        },
    ];

    return (
        <>
            <div className='mt-4' />
            <div className='grid grid-cols-4 gap-5 mx-4'>
                {
                    data.map((x, idx) => {
                        return (
                            <>
                                <div key={idx} className={`${classes.contentnopad} py-2`}>
                                    <div className='flex'>
                                        <div className='w-16'>{x.image}</div>
                                        <div>
                                            <h5 className='font-bold'>{x.title}</h5>
                                            <p className='text-xl'>{x.qty} <span className='text-sm'>{x.unti}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }


            </div>
        </>
    )
}

export default Header