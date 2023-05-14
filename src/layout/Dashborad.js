import React, { useState } from "react";
import { IconDsProductAll, IconDsAvailable } from "../components/icon";
import IconDsUnvailable from "../assets/IconDsUnvailable.svg";
import IconDsSales from "../assets/IconDsSales.svg";
import MyBarChart from "../components/chart/MyBarChart";
import MyDoughnutChart from "../components/chart/MyDoughnutChart";

export default function Dashborad() {
  const data = [
    {
      id: 1,
      title: "ສິນຄ້າທັງໝົດ",
      qty: "1,230",
      image: <IconDsProductAll />,
      unti: "ລາຍການ",
    },
    {
      id: 2,
      title: "ຍັງມີຈຳໜ່າຍ",
      qty: "1,100",
      image: <IconDsAvailable />,
      unti: "ລາຍການ",
    },
    {
      id: 3,
      title: "ບໍ່ມີຈຳໜ່າຍ",
      qty: "0",
      image: <img src={IconDsUnvailable} width="50" />,
      unti: "ລາຍການ",
    },
    {
      id: 4,
      title: "ຂາຍແລ້ວ",
      qty: "130",
      image: <img src={IconDsSales} width="50" />,
      unti: "ລາຍການ",
    },
  ];

  const getChartData = (canvas) => {
    const ctx = canvas.getContext("2d");

    const x = canvas.height * 0.65;
    const y = canvas.width * 0.25;
    const outerRadius = canvas.width / 3.2;

    const x1 = x * 1.49;
    const y1 = y * 0.87;

  };

  const [dataBar] = useState({
    labels: [
      "ເດືອນ 01",
      "ເດືອນ 02",
      "ເດືອນ 03",
      "ເດືອນ 04",
      "ເດືອນ 05",
      "ເດືອນ 06",
      "ເດືອນ 07",
      "ເດືອນ 08",
      "ເດືອນ 09",
      "ເດືອນ 10",
      "ເດືອນ 11",
      "ເດືອນ 12",
    ],
    datasets: [
      {
        label: "Chart",
        data: [3000, 2510, 2300, 2500, 1700, 2000, 2700, 3500, 2560, 2200, 2111, 2600],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(58,123,213,1)");
          gradient.addColorStop(1, "rgba(0,210,255,0.3)");
          return gradient;
        },
        fill: true,
        // borderWidth: 2,
        barThickness: 50,
        lineTension: 0.4,
        pointBackgroundColor: '#1B4F72'
      },
    ],
  });

  const [dataDoug] = useState({
    labels: [
      "ເບຍລາວແກ້ວໃຫຍ່",
      "ເບຍໄຮນິເກນ",
      "ເປບຊີຕຸກໃຫຍ່",
      "ນ້ຳດື່ມຫົວເສື້ອກາງ",
      "ສະຕິງເຫລືອງ",
    ],
    datasets: [
      {
        label: "Chart",
        data: [3000, 2510, 2300, 2500, 1700],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        fill: true,
        borderWidth: 2,
        barThickness: 50,
      },
    ],
  });

  return (
    <>
      <div>
        <h3 className="text-2xl leading-6 font-bold text-zinc-700 pb-5 mt-2">
          ພາບລວມຂໍ້ມູນ
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {data.map((x, idx) => {
            return (
              <div key={idx}>
                <div className="min-h-full bg-white shadow-md overflow-hidden sm:rounded-lg py-3">
                  <div className="text-center">
                    <div className="grid grid-cols-1 py-3">
                      <span className="flex items-center justify-center">
                        {x.image}
                      </span>
                    </div>
                    <div className="text-base">{x.title}</div>
                    <div className="text-3xl mt-2 pb-2">{x.qty}</div>
                    <div className="text-slate-400">ອັນ</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div class="grid grid-cols-3 gap-4 mt-5">
          <div className="grid col-span-2">
            <div className="bg-white shadow-md overflow-hidden sm:rounded-lg py-10 px-10">
              <h3 className="font-bold text-zinc-700">ການເຄື່ອນໄຫວຂອງສິນຄ້າຂາຍອອກ</h3>
              <MyBarChart chartData={dataBar} />
            </div>
          </div>
          <div className="grid col-span-1">
            <div className="bg-white shadow-md overflow-hidden sm:rounded-lg py-10 px-10">
              <h3 className="font-bold text-zinc-700">ສິນຄ້າທີ່ຂາຍດີສຸດ</h3>
              <MyDoughnutChart chartData={dataDoug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
