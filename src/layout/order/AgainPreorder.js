import React, { useCallback, useEffect, useRef, useState } from "react";
import OtherSelect from 'react-select'
import { useHistory, useLocation } from 'react-router-dom'
import { NewAxios } from "../../components/MyAxios";
import { USER_KEY } from '../../components/userKey'
import { toast } from "react-toastify";

export default function AgainPreorder() {

    const location = useLocation()
    const [getDataOrder, setGetDataOrder] = useState(location.state.dataPre?.order_detail)
    console.log(location.state.dataPre?.order_detail)

    let newArr = getDataOrder.map((x) => ({
        value: x.pro_id,
        label: x.pro_name,
        price: x.od_price,
        od_unit: x.od_unit,
        status: true
    }))

    // console.log(newArr)

    const selectInputRef = useRef();

    const userToken = JSON.parse(localStorage.getItem(USER_KEY));

    const history = useHistory()
    const [loading, setloading] = useState(true);
    const [customerData, setCustomerData] = useState([])
    const [productData, setProductData] = useState([])

    const [userID, setUserID] = useState(userToken.detail['u_id'])

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    const [ResultTotal, setResultTotal] = useState('0')
    const [NewTotal, setNewTotal] = useState('0')

    const [getUID, setGetUID] = useState({})
    const [clear, setclear] = useState(false);


    const LoadData = () => {
        setloading(true)

        NewAxios.get('product', {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        }).then((res) => {
            if (res.status === 200) {
                let abc = res.data.data
                let update = abc.map((x) => ({
                    value: x.pro_id,
                    label: x.pro_name,
                    price: x.pro_price,
                    unit: x.pro_unit,
                    status: false
                }))
                setProductData(update)
                // console.log(res.data)
            }
        })

        NewAxios.get('customer', {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        }).then((res) => {
            if (res.status === 200) {
                setCustomerData(res?.data)
                // console.log(res.data)
            }
        })

        NewAxios.post('order', {
            page: 1,
            limit: 10
        }, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        }).then((res) => {
            if (res.status === 200) {
                setGetUID(res.data.data.slice(0)[0])
            }
        })
        setloading(false)

    }

    useEffect(() => {
        LoadData()
    }, [])

    const customerOption = customerData?.data?.map((x) => ({
        value: x.cus_id,
        label: x.cus_name
    }))

    const [modelItem, setmodelItem] = useState({
        itemid: '',
        itemname: '',
        qty: '',
        price: '',
        total: '',
        discout: 0
    })

    const [getID, setgetID] = useState([])
    function getvalueProduct(e) {
        setgetID(e)
        console.log(e);
    }

    const [getcus, setgetcus] = useState([])
    function getvaluecus(e) {
        setgetcus(e)
        // console.log(e);
    }

    const onClear = () => {
        selectInputRef.current.select.clearValue();
    };

    const [index, setindex] = useState([])

    useEffect(() => {

    }, []);

    const addItem = (e) => {
        let inserItem = productData.filter(row => row.value === e.value).map(x => {
            x.label = x.label
            x.price = x.price
            x.unit = x.unit
            x.value = x.value
            x.status = true
            x.qty = ''
            x.total = ''
            return x
        })


        // let inserItem = productData.map((x) => {
        //     if (x.value === e.value) {
        //         // console.log(x)
        //         x.label = x.label
        //         x.price = x.price
        //         x.unit = x.unit
        //         x.value = x.value
        //         x.status = true
        //         x.qty = ''
        //         x.total = ''
        //     }
        //     return x
        // })
        // console.log(inserItem)

        // setGetDataOrder(inserItem)

        // console.log(index)

        let update = productData.filter((x) => x.value !== getID.value)

        setProductData(update)
    }

    const Calculate = (qty, id, unit, price, idx) => {
        let sl
        if (qty >= parseInt(unit)) {
            sl = unit
        }
        else {
            sl = qty
        }

        let update = index.map((row, i) => {
            // console.log(row)
            if (idx === i) {
                row.qty = parseInt(sl)
                row.total = sl * price
            }
            return row

        })
        // console.log(update)
        setindex(update)
        // console.log(update)
    }

    const TotalPrice = (discout) => {

        let newResult = (ResultTotal * discout) / 100
        // console.log(parseInt(newResult) + ResultTotal)
        setNewTotal(parseInt(newResult) + ResultTotal)
    }

    const removeItem = (e) => {
        const findID = index.filter((item) => item.value != e)
        setindex(findID)
    }

    // console.log(getUID['o_id'])

    const SaveProduct = () => {

        let dataIndex = []
        let select_data = index.filter(x => x.status === true)

        let Demo = select_data.map((x) => {
            let data = {
                pro_id: x.value,
                pro_unit: x.qty,
                pro_price: x.price
            }

            dataIndex.push(data)
        })
        // console.log(dataIndex)

        NewAxios.post('create_order', {
            cus_id: getcus.value,
            u_id: userID,
            discount: parseInt(modelItem.discout),
            order_detail:
                dataIndex

        }, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        }).then(res => {
            if (res.status === 200) {

                toast.success("ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ", {
                    position: toast.POSITION.BOTTOM_LEFT,
                });

                LoadData()
                history.push({ pathname: '/home/preorder/bill', state: { o_id: getUID['o_id'], cus_id: getUID['c_id'] } })

            } else {
                toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
            }
        })
    }
    return (
        <>
            <div className="bg-white  h-auto pb-10 shadow sm:rounded-lg mb-5">
                <div className="px-4 py-5 sm:px-6">
                    <div className='flex'>
                        <h3 className="text-lg leading-6 font-bold text-gray-900">ການສັ່ງຂາຍໃໝ່</h3>
                        <button type="button" class="w-24 justify-center text-gray-400 border bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => history.push('/home/preorder')}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="pl-2 text-base">ຍົກເລີກ</span>
                        </button>
                    </div>
                </div>

                <div className='px-4 py-5 sm:px-6 bg-gray-100 border-b'>
                    <div class="flex">
                        <label for="small-input" class="w-36 block pt-1.5 mb-2 text-sx font-medium text-gray-900">ເລືອກລູກຄ້າ</label>
                        <div className='w-5/12'>
                            <OtherSelect
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        "*": {
                                            boxShadow: "none !important",
                                        },
                                    }),
                                }}
                                onChange={(e) => getvaluecus(e)}
                                options={customerOption} isClearable />
                        </div>
                    </div>
                </div>

                <div className='px-4 py-5 sm:px-6'>
                    <div class="flex">
                        <label class="w-36 block pt-1.5 mb-2 text-sx font-medium text-gray-900 ">ເລກລະຫັດສັ່ງ INV-</label>
                        <div className='w-48'>
                            <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={getUID['o_id'] + 1} />
                        </div>
                    </div>
                    <div class="flex mt-3">
                        <label class="w-36 block pt-1.5 mb-2 text-sx font-medium text-gray-900 ">ວັນທີສັ່ງ</label>
                        <div className='w-48'>
                            <input type="date" defaultValue={defaultValue} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white  h-auto pb-10 shadow sm:rounded-lg'>
                <div className='py-5 sm:px-6 '>
                    <div className='border-t border-gray-200 pt-4 px-5 w-full'></div>
                    <div className='w-full flex justify-between'>
                        <div className='flex w-full'>
                            <div className='w-3/4'>
                                <div class="pr-5 pt-1.5 pb-1">ລາຍການສິນຄ້າ:</div>
                                <OtherSelect
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            "*": {
                                                boxShadow: "none !important",
                                            },
                                        }),
                                    }}
                                    onChange={(e) => addItem(e) || onClear(e)}
                                    options={productData}
                                />
                            </div>
                            <div>
                                <div class="pr-5 pt-1.5 pb-1">ບາໂຄ໊ດ</div>
                                <input
                                    className="border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                />
                            </div>
                        </div>

                        <div className='w-1/3  block pt-8'>
                            <div className='block text-right'>
                                <button
                                    onClick={SaveProduct}
                                    class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">
                                    ບັນທືກຂໍ້ມູນ</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative sm:rounded-lg px-4 py-5 sm:px-6 overflow-y-auto">
                    <table class="w-full text-base text-left text-gray-700">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr className='my-table '>
                                <th scope="col" class="w-12 text-center border ">
                                    #
                                </th>
                                <th scope="col" class="px-3 w-5/12 border ">
                                    <span className='text-base'>ຊື່ສິນຄ້າ</span>
                                </th>
                                <th scope="col" class="px-3 w-36 border">
                                    <span className='text-base'>ຈຳນວນ | ມີຈຳໜ່າຍ</span>
                                </th>
                                <th scope="col" class="px-3 w-28 border">
                                    <span className='text-base'>ລາຄາ</span>
                                </th>
                                <th scope="col" class="px-3 py-1.5 border">
                                    <span className='text-base'>ລວມ</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newArr?.map((row, idx) => {
                                    // console.log(row)
                                    if (row.status === true) {
                                        return (
                                            <tr
                                                key={idx}
                                                class="bg-white border-solid border-b border-[#ddd] hover:bg-gray-50">
                                                <td width={50} class="px-3 text-base text-center text-gray-900">
                                                    {idx + 1}
                                                </td>
                                                <th scope="row" class="px-3 text-base font-medium text-gray-900  whitespace-nowrap">
                                                    {row.label}
                                                </th>
                                                <td width={150} class="px-3 flex">
                                                    <input
                                                        className="border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                                        type="number"
                                                        value={row.od_unit}
                                                        onChange={(e) => {
                                                            Calculate(e.target.value, row.value, row.unit, row.price, idx)
                                                        }}
                                                    />
                                                    <p className="text-[#777] pl-2 pt-1.5">
                                                        {row.unit}
                                                    </p>
                                                </td>
                                                <td width={160} class="px-3">
                                                    <label class="w-36 text-right block pt-1.5 mb-2 text-sm font-medium text-gray-900 ">
                                                        {row.od_price?.toLocaleString()}
                                                    </label>
                                                </td>
                                                <td width={130} class="px-3">
                                                    <label class="w-36 text-right block pt-1.5 mb-2 text-sm font-medium text-gray-900 ">
                                                        {(row.od_unit * row.od_price)?.toLocaleString()}
                                                    </label>
                                                </td>
                                                <td width={80} class="px-3 py-2 text-center">
                                                    <button
                                                        onClick={() => removeItem(row.itemid)}
                                                        className='relative flex px-3 py-[4px] text-[#2D3436] rounded-md ml-3 border-[#ddd] border border-solid'>
                                                        ລືບ
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }

                        </tbody>
                    </table>
                </div>

                <div class="grid grid-cols-2 gap-4 px-5 mt-10">
                    <div className='w-full relative '>
                        <div className='w-full absolute bottom-0'>
                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ໂນ໊ດຂໍ້ຄວາມ</label>
                            <textarea rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."></textarea>
                        </div>
                    </div>
                    <div className='w-full bg-gray-100 h-36 rounded-lg'>
                        <div className='py-3 px-5'>
                            <div className='flex'>
                                <label for="small-input" class="w-64 block pt-1.5 mb-2 text-sx text-[#2D3436] ">ລວມເປັນເງີນ</label>
                                <label for="small-input" class="w-full text-right block pt-1.5 mb-2 text-base text-[#2D3436] ">{ResultTotal?.toLocaleString()}</label>
                            </div>
                            <div className='flex'>
                                <label for="small-input" class="w-64 block pt-1.5 mb-2 text-sx text-[#2D3436] ">ສ່ວນຫລຸດ</label>
                                <input
                                    className="border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                    min="0"
                                    defaultValue={0}
                                    value={modelItem.discout}
                                    onChange={(e) => setmodelItem({ ...modelItem, discout: e.target.value })}
                                    onKeyUp={(e) => TotalPrice(e.target.value)}
                                />
                            </div>
                            <div className='flex'>
                                <label for="small-input" class="w-64 block pt-1.5 mb-2 text-xl font-bold text-[#2D3436] ">ລວມທັງໝົດ <span>(ກີບ)</span> </label>
                                <label for="small-input" class="w-full text-right block pt-1.5 mb-2 text-xl font-bold text-[#2D3436]"
                                >{NewTotal === "0" ? ResultTotal?.toLocaleString() : NewTotal?.toLocaleString()}</label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
