import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import OtherSelect from "react-select";

export default function AddPackaging() {
  const history = useHistory();

  const [show, setShow] = useState(false);

  const options_cus = [
    { value: "1", label: "ສົມສັກ" },
    { value: "2", label: "ສົມຊາຍ" },
    { value: "3", label: "ສົມປອງ" },
  ];

  const options_bill = [
    { value: "PO-124458", label: "PO-124458" },
    { value: "PO-124569", label: "PO-124569" },
    { value: "PO-124667", label: "PO-124667" },
  ];

  const [getcus, setgetcus] = useState([]);
  function getvaluecus(e) {
    setgetcus(e);
  }

  const [getPO, setgetPO] = useState([]);
  function getvaluePO(e) {
    setgetPO(e);
    setShow(true);
  }

  const table = [
    {
      proName: "ສະະຕິງເຫລືອງກະຕຸກ 330ml ຫຸ້ມຢາງ x24",
      qty: 5,
      price: 92000,
      discount: "0.00",
      totalMoney: 0,
    },
    {
      proName: "ເບຍຄາວສະເບີກ 320ml ແກັດເຈ້ຍ x24",
      qty: 3,
      price: 160000,
      discount: "0.00",
      totalMoney: 0,
    },
    {
      proName: "ເບຍຄາວສະເບີກ 330ml ແກັດເຈ້ຍ x12",
      qty: 2,
      price: 180000,
      discount: "0.00",
      totalMoney: 0,
    },
    {
      proName: "ນ້ຳດື່ມຫົວເສືອກະຕຸກ 235ml ຫຸ້ມຢາງ x24",
      qty: 15,
      price: 39000,
      discount: "0.00",
      totalMoney: 0,
    },
    {
      proName: "ນ້ຳດື່ມຫົວເສືອກະຕຸກ 600ml ແກັດເຈ້ຍ x24",
      qty: 1,
      price: 40000,
      discount: "0.00",
      totalMoney: 0,
    },
  ];

  let sumTotal = table.reduce(function (prev, current) {
    return prev + +current.price * current.qty;
  }, 0);

  return (
    <>
      <div className="bg-white  h-auto pb-10 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex">
            <h3 className="text-lg leading-6 font-bold text-gray-900">
              ການສັ່ງຂາຍໃໝ່
            </h3>
            <button
              type="button"
              class="w-28 justify-center text-zinc-400 border border-zinc-300 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              onClick={() => history.push("/home/packaging")}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="pl-2 text-base">ຍົກເລີກ</span>
            </button>
            <button
              type="submit"
              class="inline-flex w-36 justify-center rounded-lg border border-transparent bg-indigo-500 py-2 px-4 ml-5 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-bold "
              onClick={() => history.push("/home/packaging")}
            >
              ບັນທືກ
            </button>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6 bg-gray-100 border-b">
          <div class="flex">
            <label
              for="small-input"
              class="w-36 block pt-1.5 mb-2 text-sx font-medium text-zinc-700"
            >
              ເລືອກລູກຄ້າ
            </label>
            <div className="w-5/12">
              <OtherSelect
                onChange={(e) => getvaluecus(e)}
                options={options_cus}
                isClearable
              />
            </div>
          </div>
          <div class="flex mt-5">
            <label
              for="small-input"
              class="w-36 block pt-1.5 mb-2 text-sx font-medium text-zinc-700"
            >
              ໃບບິນເລກທີ
            </label>
            <div className="w-5/12">
              <OtherSelect
                onChange={(e) => getvaluePO(e)}
                options={options_bill}
                isClearable
              />
            </div>
          </div>
        </div>
        {show && (
          <>
            <div class="px-4 py-5 sm:px-6">
              <div className="flex">
                <div className="w-36 pt-1.5">
                  <p>ເລກທີຈັດສົ່ງ</p>
                </div>
                <div className="w-5/12">
                  <input
                    type="text"
                    id="default-input"
                    value="PK2022-122321"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-10 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex mt-5">
                <div className="w-36 pt-1.5">
                  <p>ວັນທີ</p>
                </div>
                <div className="w-5/12">
                  <input
                    type="date"
                    id="default-input"
                    placeholder="0.00"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-10 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex mt-5">
                <div className="w-36 pt-1.5">
                  <p>ສົ່ງໂດຍ (ທະບຽນລົດ)</p>
                </div>
                <div className="w-5/12">
                  <input
                    type="text"
                    id="default-input"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-10 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div class="overflow-hidden mt-5 relative overflow-x-auto px-4 py-5 sm:px-6">
              <h4 class="text-lg font-bold leading-6 text-gray-900 mb-5">
                ລາຍການສິນຄ້າ
              </h4>
              <div class="overflow-x-auto relative ">
                <table class="w-full text-sm text-left text-gray-700">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="my-table">
                      <th scope="col" class="px-3 py-3 border text-center">
                        #
                      </th>
                      <th scope="col" class="px-3 py-3 border">
                        ລາຍການ
                      </th>
                      <th scope="col" class="px-3 py-3 border text-center">
                        ຈຳນວນ
                      </th>
                      <th scope="col" class="px-3 py-3 border text-right">
                        ລາຄາ
                      </th>
                      <th scope="col" class="px-3 py-3 border text-right">
                        ສ່ວນຫລຸດ
                      </th>
                      <th scope="col" class="px-3 py-3 border text-right">
                        ລວມເປັນເງີນ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((x, idx) => {
                      return (
                        <tr key={idx} class="bg-white border-b">
                          <td align="center">{idx + 1}</td>
                          <td class="pl-3 w-38">{x.proName}</td>
                          <td class="pl-3 w-20 text-center">{x.qty}</td>
                          <td class="pl-3 w-28 text-right pr-5">{x.price}</td>
                          <td class="pl-3 px-6 text-right pr-5">
                            {x.discount}
                          </td>
                          <td class="py-4 px-6 text-right pr-5">
                            {parseInt(x.qty * x.price).toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div class="grid grid-cols-2 gap-4 px-5 mt-10">
                <div className="w-full relative ">
                  <div className="w-full absolute bottom-0">
                    <label
                      for="small-input"
                      class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 "
                    >
                      ໂນ໊ດຂໍ້ຄວາມ
                    </label>
                    <textarea
                      id="message"
                      rows="3"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-36 rounded-lg">
                  <div className="py-3 px-5">
                    <div className="flex">
                      <label
                        for="small-input"
                        class="w-64 block pt-1.5 mb-2 text-sx text-gray-500"
                      >
                        ລວມເປັນເງີນ
                      </label>
                      <label
                        for="small-input"
                        class="w-full text-right block pt-1.5 mb-2 text-base text-gray-500"
                      >
                        {sumTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </label>
                    </div>
                    <div className="flex">
                      <label
                        for="small-input"
                        class="w-64 block pt-1.5 mb-2 text-sx text-gray-500"
                      >
                        ສ່ວນຫລຸດ
                      </label>
                      <label
                        for="small-input"
                        class="w-full text-right block pt-1.5 mb-2 text-base text-gray-500"
                      >
                        0.00
                      </label>
                    </div>
                    <div className="flex">
                      <label
                        for="small-input"
                        class="w-64 block pt-1.5 mb-2 text-xl font-bold text-gray-900"
                      >
                        ລວມທັງໝົດ <span>(ກີບ)</span>{" "}
                      </label>
                      <label
                        for="small-input"
                        class="w-full text-right block pt-1.5 mb-2 text-xl font-bold text-gray-900"
                      >
                        {sumTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
