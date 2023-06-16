import React,  { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { axiosWithBaseUrl } from "App";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, Grid, useMediaQuery } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================||메인2 오늘 예약 현황 ||============================== //
// 차트 options
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
      borderRadius: 5
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
  const id = useSelector((state) => state.user.id);                 // 점주 id
  const [todayresv, setTodayResv] = useState([]);
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [series, setSeries] = useState(                              //y축 data
    [{ name: '예약 수', data: [] }],
    [{ name: '노쇼율', data: [] }],
    ); 
  const [options, setOptions] = useState(barChartOptions);
  const [totalNum, setTotalNum] = useState(0);
  const [totalNoshow, setTotalNoshow] = useState(0);  // 예상 방문 수 = 총 예약 수 - 총 예상 노쇼수 expectationNoShowNum

  // 점주 id - 오늘 시간별 예약 현황 데이터 가져옴
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
      const timeCategories = todayresv.map((resv) => resv.time);                                            //영업시간
      const numData = todayresv.map((resv) => parseInt(resv.num));                                          //예약 수
      const noShowData = todayresv.map((resv) => parseInt(resv.expectationNoShowNum));                      //노쇼 수 
      const total = numData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);           //총 예약 수 
      const totalNoshow = noShowData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);  //총 노쇼 수

      

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
            // show: !isMobile,          //모바일 아닐 때만 라벨 보이게-> 모바일 가로 스크롤으로 변경, 다 보이게
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

      setSeries([{ data: numData },  { name: '예상 노쇼율', data: noShowData  }]);    // 예약 수 , 예상 노쇼 수 
      setTotalNum(total);                                                            //총 예약 수
      setTotalNoshow(totalNoshow)                                                    //총 노쇼 수
    } 
  }, [info, secondary, todayresv]);
  
  return (
    <>
    <Grid>
      <Grid item style={{overflowX: 'auto' }}>
        <Typography variant="h5" align="center">총:{totalNum}건</Typography>
        {/* 예상방문 수 = 총 예약 수 - 노쇼 수  */}
        <Typography variant="h6" align="center"> (예상 방문 수: {totalNum - totalNoshow}건)</Typography>  
        <div id="chart">
            <ReactApexChart
             options={options} 
             series={series} 
             type="bar" 
             width='750px'
             height={400} />
             
        </div>
        {/* 안내문구 */}
        <Grid container justifyContent="flex-end">
          <Typography variant= "subtitle2" style={{ color: '#cccccc', marginLeft: '5px', marginBottom: '20px', display: 'block'}}>
          {/* <Typography variant= "subtitle2" style={{ color: '#cccccc', marginLeft: '5px', marginBottom: '20px', display: isMobile ? 'none' : 'block'}}> */}
            예상 노쇼율은 지난 3개월의 시간별 노쇼 평균치를 기준으로 계산된 수치입니다.
          </Typography>
        </Grid>
        </Grid>
        </Grid>
    </>
  );
};

export default MonthlyBarChart;