//메인 이번달 예약금 현황
import React,  { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { axiosWithBaseUrl } from "App";


// third-party
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeChart = () => {
  const id = useSelector((state) => state.user.id);
  const  [ monthldeposit, setMonthlyDeposit ] = useState([]);


  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "test",
        data: [12, 19, 3],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderWidth: 1,
      },
    ],
  };

 useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/main/deposit/${id}`)
      .then((res) => {
        setMonthlyDeposit(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
        text: 'Chart Title',
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default IncomeChart;