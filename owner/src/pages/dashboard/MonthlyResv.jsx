import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosWithBaseUrl } from "App";

import { useTheme } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";

import ReactApexChart from "react-apexcharts";

// ==============================||메인3 예약통계 ||============================== //

// chart options
const barChartOptions = {
  chart: {
    type: "bar",
    height: 365,
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
  grid: {
    show: true,
  },
};

const MonthlyBarChart = () => {
  const theme = useTheme();
  const id = useSelector((state) => state.user.id); // 점주 id
  const [monthlyresvData, setMonthlyResvData] = useState({
    cancelValue: "",
    doneValue: "",
    noShowValue: "",
    whole: "",
  });
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [currentDate, setCurrentDate] = useState("");
  const [series, setSeries] = useState([
    {
      name: "취소",
      data: 'cancelValue',
      group: "resv",
    },
    {
      name: "노쇼",
      data: 'noShowValue',
      group: "resv",
    },
    {
      name: "완료",
      data: 'doneValue',
      group: "resv",
    },
  ]); // y축 data
  const [options, setOptions] = useState(barChartOptions);

  // 점주 id - 월별 데이터 가져옴
  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/main/reservation/${id}`)
      .then((res) => {
        console.log(res.data);
        setMonthlyResvData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const { cancelValue, doneValue, noShowValue, whole } = monthlyresvData;
    const monthLabels = ['분기', '지난달', '이번달'];

    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        categories: monthLabels,
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
       colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
       tooltip: {
        theme: "light",
      },
    }));

    setSeries((prevState) => {
      prevState[0].data = [doneValue];
      prevState[1].data = [noShowValue];
      prevState[2].data = [cancelValue];
      return [...prevState];
    });
  }, [info, secondary, monthlyresvData]);

  return (
    <>
      <Grid item>
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={365}
          />
        </div>
      </Grid>
    </>
  );
};

export default MonthlyBarChart;