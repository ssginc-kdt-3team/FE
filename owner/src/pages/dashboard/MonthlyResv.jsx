import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosWithBaseUrl } from "App";

import { useTheme } from "@mui/material/styles";
import { Typography, Grid, useMediaQuery } from "@mui/material";

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
    enabled: true,
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const id = useSelector((state) => state.user.id);              // 점주 id
  const { secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [monthlyresv, setMonthlyResv] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [previousMonths, setPreviousMonths] = useState([]);
  const [labels, setLabels ] = useState({});
  //y축 데이터
  const [series, setSeries] = useState([
    {
      name: "완료",
      group: "resv",
      data: 'doneRate',
    },
    {
      name: "노쇼",
      group: "resv",
      data: 'noShowRate'
    },
    {
      name: "취소",
      group: "resv",
      data: 'cancelRate',
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
      const doneRate = monthlyresv.map((resv) => parseInt(resv.doneRate));
      const noShowRate  = monthlyresv.map((resv) => parseInt(resv.noShowRate));
      const cancelRate = monthlyresv.map((resv) => parseInt(resv.cancelRate)); 
      const doneData = monthlyresv.map((resv) => parseInt(resv.doneValue));
      const noshowData = monthlyresv.map((resv) => parseInt(resv.noShowValue));
      const cancelData = monthlyresv.map((resv) => parseInt(resv.cancelValue));
      const wholeData = monthlyresv.map((resv) => parseInt(resv.whole));

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
      [ {data:doneRate}, {data:noShowRate}, {data:cancelRate}], 
      (prevState) => {
      prevState[0].data = [doneRate];
      prevState[1].data = [noShowRate];
      prevState[2].data = [cancelRate];
      return [...prevState];
    });

    setLabels(
      [ {data:doneRate}, {data:noShowRate}, {data:cancelRate}], 
      (prevState) => {
      prevState[0].data = [doneRate];
      prevState[1].data = [noShowRate];
      prevState[2].data = [cancelRate];
      return [...prevState];
    });

    
  }
  }, [info, secondary, monthlyresv]);


  return (
    <>
      <Grid item>
        <div id="chart" style={{marginTop:'15px'}}>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={300}
            width='100%'
          />
        </div>
        <Grid container justifyContent="flex-end" >
          <Typography variant= "subtitle2" style={{ color: '#cccccc', marginRight: '10px', marginBottom: '20px', display: isMobile ? 'none' : 'block'}}>
             (완료, 노쇼, 취소 비율)
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default MonthlyBarChart;