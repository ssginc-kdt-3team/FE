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
    // width: 500,
    stacked: true,
    toolbar: {
      show: false,
    },
    stroke: {
      height:1,
      colors: ['#fff']
    },
    dataLabels: {
      formatter: function (val) {
        return val.toFixed(2) + '%';
      },
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
      width: 8, 
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
  const id = useSelector((state) => state.user.id);              // 점주 id
  const { secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [monthlyresv, setMonthlyResv] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [previousMonths, setPreviousMonths] = useState([]);
  const [ labels, setLabels ] = useState({});
  //y축 데이터
  const [series, setSeries] = useState([
    {
      name: "완료",
      group: "resv",
      data: 'doneValue',
    },
    {
      name: "노쇼",
      group: "resv",
      data: 'noShowValue'
    },
    {
      name: "취소",
      group: "resv",
      data: 'cancelValue',
    },
    {
      data: 'whole'
    }
  ]); 
  const [options, setOptions] = useState(barChartOptions);

  // 점주 id - 월별 데이터 가져옴
  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/main/reservation/${id}`)
      .then((res) => {
        console.log(res.data);
        setMonthlyResv(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    // const { cancelValue, doneValue, noShowValue, whole } = monthlyresvData;
  
    if (monthlyresv.length > 0) {
    const doneData = monthlyresv.map((resv) => parseInt(resv.doneValue));
    const noshowData = monthlyresv.map((resv) => parseInt(resv.noShowValue));
    const cancelData = monthlyresv.map((resv) => parseInt(resv.cancelValue));
    const wholeData = monthlyresv.map((resv) => parseInt(resv.whole));
    const doneRate = monthlyresv.map((resv) => parseInt(resv.doneRate));
    const noshowRate  = monthlyresv.map((resv) => parseInt(resv.noshowRate));
    const cancelRate = monthlyresv.map((resv) => parseInt(resv.cancelRate)); 


    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    setCurrentDate(formattedDate);

    const monthLabels = ['이번달', '지난달', '작년(분기)'];

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
       colors: ['#3b5998', '#8b9dc3', '#dfe3ee', '#00E396'],
       tooltip: {
        theme: "light",
      },
    }));

    setSeries(
      [ {data:doneData}, {data:noshowData}, {data:cancelData}], 
      (prevState) => {
      prevState[0].data = [doneData];
      prevState[1].data = [noshowData];
      prevState[2].data = [cancelData];
      return [...prevState];
    });

    setLabels(
      [ {data:doneRate}, {data:noshowRate}, {data:cancelRate}], 
      (prevState) => {
      prevState[0].data = [doneData];
      prevState[1].data = [noshowData];
      prevState[2].data = [cancelData];
      return [...prevState];
    });

    
  }
  }, [info, secondary, monthlyresv]);


  return (
    <>
      <Grid item>

        {/* <Typography variant="h6" color="textSecondary" marginLeft="10px">
        {`이번 달: ${currentDate.slice(0, 6)}`}
      </Typography> */}

        <div id="chart" style={{marginTop:'15px'}}>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={300}
            width='100%'
          />
        </div>
      </Grid>
    </>
  );
};

export default MonthlyBarChart;