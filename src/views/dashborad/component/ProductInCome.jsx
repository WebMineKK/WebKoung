import React from 'react'

function ProductInCome() {

    const data = [
        { title: 'Product 1', amount: 1018306 },
        { title: 'Product 2', amount: 9126833 },
        { title: 'Product 3', amount: 4712773 },
        { title: 'Product 4', amount: 9541695 },
        { title: 'Product 5', amount: 2950002 },
    ];

    return (
        <div className='w-full'>
            {
                data.map((x) => {
                    return (
                        <>
                            <div className='flex'>
                                <p>{x.title}</p>
                                <p>{x.amount}</p>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default ProductInCome