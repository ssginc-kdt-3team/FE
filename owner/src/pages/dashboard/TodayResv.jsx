import React,  { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { axiosWithBaseUrl } from "App";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, Grid, useMediaQuery } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================||메인2 오늘 예약 현황 ||============================== //
// chart options
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


const MonthlyBarChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const id = useSelector((state) => state.user.id);  // 점주 id
  const [todayresv, setTodayResv] = useState([]);
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [currentDate, setCurrentDate] = useState('');
  const [series, setSeries] = useState(
    [{ name: '예약 수', data: [] }],
    [{ name: '노쇼율', data: [] }],
    ); //y축 data
  const [options, setOptions] = useState(barChartOptions);
  const [totalNum, setTotalNum] = useState(0);

  // 점주 id - 오늘 예약 데이터 가져옴
  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/main/today/${id}`)
      .then((res) => {
        console.log(res.data);
        setTodayResv(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (todayresv.length > 0) {
      const timeCategories = todayresv.map((resv) => resv.time);
      const numData = todayresv.map((resv) => parseInt(resv.num));
      const noShowData = todayresv.map((resv) => parseInt(resv.expectationNoShowNum));
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
        colors: ['#CD5C5C', theme.palette.grey[500]],
        tooltip: {
          theme: 'light'
        }
      }));

      setSeries([{ data: numData },  { name: '예상 노쇼율', data: noShowData  }]);
      setTotalNum(total);
    }
  }, [info, secondary, todayresv]);
  
  return (
    <>
    <Grid>
      <Grid item>
        {/* <Typography variant="h4">오늘 예약 현황</Typography> */}
        {/* <Typography variant="h6" color="textSecondary">
        {`오늘 날짜 : ${currentDate}`}
        </Typography> */}
     
      
        <Typography variant="h5"  align="center">총:{totalNum}건</Typography>
        
        <div id="chart">
            <ReactApexChart
             options={options} 
             series={series} 
             type="bar" 
             width='100%'
             height={400} />
        </div>
        <Grid container justifyContent="flex-end">
          <Typography variant= "subtitle2" style={{ color: '#cccccc', marginLeft: '5px', marginBottom: '20px', display: isMobile ? 'none' : 'block'}}>
            예상 노쇼율은 지난 3개월의 시간별 노쇼 평균치를 기준으로 계산된 수치입니다.
          </Typography>
        </Grid>

        </Grid>
        </Grid>
    </>
  );
};

export default MonthlyBarChart;