import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosWithBaseUrl } from "App";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, useMediaQuery } from "@mui/material";

// third-party
import ReactApexChart from "react-apexcharts";

// ==============================|| 메인4 위약금 통계 ||============================== //

const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: [],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: true
  }
};

const getPreviousMonthDate = (date, numMonths) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() - numMonths);
  return d.toISOString().slice(0, 7);
};

const MonthlyDepositChart = () => {
  const theme = useTheme();
  const id = useSelector((state) => state.user.id);  // 점주 id
  const [monthlyData, setMonthlyData] = useState({
    last3MonthPenalty: '',
    last2MonthPenalty:'',
    lastMonthPenalty: '',
    thisMonthPenalty: ''
  });
  const { secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [currentDate, setCurrentDate] = useState('');
  const [series, setSeries] = useState([{ name: '위약금', data: '' }]); // y축 data
  const [options, setOptions] = useState(barChartOptions);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



  // 점주 id - 월별 위약금 데이터 가져옴
  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/main/deposit/${id}`)
      .then((res) => {
        console.log(res.data);
        setMonthlyData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const { last3MonthPenalty, last2MonthPenalty, lastMonthPenalty, thisMonthPenalty } = monthlyData;

    
    const penaltyData = [last3MonthPenalty, last2MonthPenalty, lastMonthPenalty, thisMonthPenalty];

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    setCurrentDate(formattedDate);

    const currentDate = new Date().toISOString().slice(0, 7);
  setCurrentDate(currentDate);

  const monthLabels = [
    getPreviousMonthDate(currentDate, 3),
    getPreviousMonthDate(currentDate, 2),
    getPreviousMonthDate(currentDate, 1),
    currentDate,
  ];

    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        categories: monthLabels,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      colors: ['#03396c'],
      tooltip: {
        theme: 'light'
      }
    }));

    setSeries([{ data: penaltyData}]);
  }, [info, secondary, monthlyData]);

  return (
    <>
      <Grid item justifyContent="center" alignItems="center">
        <Typography
          variant={isMobile ? "h6" : "h5"}
          style={{ marginLeft: isMobile ? "10px" : "20px", marginBottom: '5px', textAlign: 'center', color: '#8b8589' }}
        >
          이번달 위약금: {monthlyData.thisMonthPenalty.toLocaleString()}원
        </Typography>

        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={300}
            // style={{overflowX: 'auto' }}
            // width='100%'
          />
        </div>
      </Grid>
    </>
  );
};

export default MonthlyDepositChart;