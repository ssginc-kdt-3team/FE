//메인 예약금 통계
import React,  { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { axiosWithBaseUrl } from "App";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, Grid } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================|| INCOME AREA CHART ||============================== //
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
    show: true
  },
  grid: {
    show: true
  }
};

const MonthlyDepositChart = () => {
  const theme = useTheme();
  const id = useSelector((state) => state.user.id);
  const [ monthldeposit, setMonthlyDeposit ] = useState([]);
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [currentDate, setCurrentDate] = useState('');
  const [series, setSeries] = useState(
    [{ name: '위약금', data: [] }],
    ); //y축 data
  const [options, setOptions] = useState(barChartOptions);
  const [totalPenalty, setTotalPenalty] = useState(0);


 useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/main/deposit/${id}`)
      .then((res) => {
        console.log(res.data);
        setMonthlyDeposit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (monthldeposit.length > 0) {
      const timeCategories = monthldeposit.map((resv) => resv.time);
      const numData = monthldeposit.map((resv) => parseInt(resv.penalty));
      const total = numData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      setCurrentDate(formattedDate);

      setOptions((prevState) => ({
        ...prevState,
        //x축 data
        xaxis: {
          categories: timeCategories,
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
      }));

      setSeries([]);
      setTotalPenalty(total);
    }
  }, [info, secondary, monthldeposit]);

  return (
    <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
      <Typography variant="h6" color="textSecondary">
          {`이번 달 : ${currentDate.slice(0, 6)}`}
        </Typography>
        <Typography variant="h5" style={{marginLeft: '35px', marginTop: '10px'}}>총:{totalPenalty}건</Typography>
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default MonthlyDepositChart;