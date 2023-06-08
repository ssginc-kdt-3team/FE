import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosWithBaseUrl } from "App";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";

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
    show: true
  },
  grid: {
    show: true
  }
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
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [currentDate, setCurrentDate] = useState('');
  const [series, setSeries] = useState([{ name: '위약금', data: '' }]); // y축 data
  const [options, setOptions] = useState(barChartOptions);

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

    const monthLabels = ['Last 3 Months', 'Last 2 Months', 'Last Month', 'This Month'];
    const penaltyData = [last3MonthPenalty, last2MonthPenalty, lastMonthPenalty, thisMonthPenalty];

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    setCurrentDate(formattedDate);


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
      colors: [info],
      tooltip: {
        theme: 'light'
      }
    }));

    setSeries([{ data: penaltyData }]);
  }, [info, secondary, monthlyData]);

  return (
    <>
      <Grid item>
      <Typography variant="h6" color="textSecondary">
        {`이번 달: ${currentDate.slice(0, 6)}`}
      </Typography>
      <Typography variant="h5" style={{marginLeft: '35px', marginTop: '10px'}}>이번달 위약금:{monthlyData.thisMonthPenalty}원</Typography>

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

export default MonthlyDepositChart;