// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { axiosWithBaseUrl } from "App";
// import { Bar } from "react-chartjs-2";
// import { CategoryScale, Chart } from "chart.js";

// Chart.register(CategoryScale);
// Chart.register({ scale: { type: "linear", display: true, position: "left" } });

// const IncomeAreaChart = () => {
//   const id = useSelector((state) => state.user.id);
//   const [monthlyresv, setMonthlyResv] = useState([]);
//   const [data, setData] = useState({
//     labels: ["분기", "지난달", "이번달"],
//     datasets: [
//       {
//         label: "완료",
//         data: [],
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderWidth: 1,
//       },
//       {
//         label: "노쇼",
//         data: [],
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderWidth: 1,
//       },
//       {
//         label: "취소",
//         data: [],
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         borderWidth: 1,
//       },
//     ],
//   });
//   const [options, setOptions] = useState({
//     scales: {
//       xAxes: {
//         stacked: true,
//       },
//       yAxes: {
//         stacked: true,
//       },
//     },
//   });

//   useEffect(() => {
//     axiosWithBaseUrl
//       .get(`/owner/main/reservation/${id}`)
//       .then((res) => {
//         console.log(res.data);
//         setMonthlyResv(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);

//   useEffect(() => {
//     // 데이터와 옵션을 업데이트
//     setData((prevData) => ({
//       ...prevData,
//       datasets: prevData.datasets.map((dataset) => ({
//         ...dataset,
//         data: [/* update data here based on monthlyresv */],
//       })),
//     }));

//     setOptions((prevOptions) => ({
//       ...prevOptions,
//       // 업데이트할 옵션 설정
//     }));
//   }, [monthlyresv]);

//   return (
//     <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default IncomeAreaChart;