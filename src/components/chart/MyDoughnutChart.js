import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function MyDoughnutChart({ chartData }) {
  return <div>
    <Doughnut
      data={chartData}
      options={{
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: 'ສະແດງປະເພດເບີເປັນກຣາຟ'
          }
        }
      }}
    />
  </div>
}

export default MyDoughnutChart;