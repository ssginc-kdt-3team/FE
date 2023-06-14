import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import MainCard from 'components/MainCard';
import MonthlyBarChart from './TodayResv';
import IncomeAreaChart from './MonthlyResv';
import MonthlyDepositChart from './MonthlyDeposit';
import Clock from './Clock';
import MainCalendar from './Calendar';
import { useSelector } from 'react-redux';
import MgtInfo from './MgtInfo';

const DashboardDefault = () => {
  const [currentDate, setCurrentDate] = useState('');
  const name = useSelector((state) => state.user.name);       //store에 저장된 user id 가져오기
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    setCurrentDate(formattedDate);
    
  }, []);

  return (
    <Grid container spacing={0} style={{ minHeight: '100vh'}}>
      {/* 상단 구역 */}
      <Grid item xs={12} md={7} lg={12} sx={{pl: 2, pr:2}}>
      <Grid container justifyContent="center" alignItems="center" marginTop="30px" columnSpacing={4}>
        {/* 1. 시계 */}
        <Grid item xs={14} lg={3.5} >
        <Grid item justifyContent="center" alignItems="center" marginTop="34px" >
          <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>{name}님 좋은 하루 보내세요!</Typography>
          <MainCard sx={{ mt: 2, width: '100%', height: '150px', padding: '20px'}} content={false}  >
         <Clock />
        </MainCard>
        </Grid>
          {/* 2. 매장 정보 */}
        <Grid item >
          <Typography variant="h5" marginBottom="20px" marginTop="32px" >매장 운영 정보</Typography>
          <MainCard sx={{ mt: 2, width: '100%', height: '295px' }} content={false} >
          <MgtInfo/>
        </MainCard>
        </Grid>
        </Grid>
        {/* 3. 오늘 예약 현황 */} 
      <Grid item xs={14}  md={7} lg={7.6}>
      <Grid item  marginTop="30px">
        <Typography variant={isMobile ? "h5" : "h4"} marginBottom="20px">오늘 예약 현황</Typography>
        <MainCard sx={{ mt: 2, width: '100%', height: '520px', padding: '4px' } } content={false} >
          <Box sx={{ p: 4, pb: 0 }}>
            <Stack spacing={2}>
              <Grid container alignItems="center">
                {/* 오늘 예약 차트 */}
                <Box sx={{width: '100%'}}>
                <MonthlyBarChart  style={{overflowX: 'auto' }}/>
                </Box>
              </Grid>
            </Stack>
          </Box>
        </MainCard>
      </Grid>
    </Grid>
    </Grid>

      {/* 하단 구역 */}
    
  <Grid container justifyContent="center" alignItems="center">
  <Grid item xs={15} md={7} lg={12} sx={{pl: 2, pr: 2, ml: isMobile ? 0 : 5}} >
    
    {/* 4. 달력 */}
    <Grid container columnSpacing={4} >
      <Grid item xs={14} md={5} lg={3.7} marginTop="30px">
        <Typography variant={isMobile ? "h5" : "h5"} marginBottom="20px">달력</Typography>
        <MainCard
        sx={{
         mt: 3,
         width: '100%',
        height: '400px',
          p: isMobile ? 0 : 6, // isMobile이 true일 때 p값을 0으로 설정
        }}
        content={false}
        >          
          <Box sx={{ justifyContent: 'center', alignItems: "center"}} >
            <MainCalendar />
          </Box>
        </MainCard>
      </Grid>

      {/* 5. 예약 통계 */}
      <Grid item xs={14} lg={4} marginTop="30px">
        <Typography variant={isMobile ? "h5" : "h4"} marginBottom="20px">예약 통계</Typography>
        <MainCard sx={{ mt: 2, width: '100%', height: '400px'}} content={false}>
          <Box sx={{ p: 5, pb: 0 }} alignItems="center">
          </Box>
          <IncomeAreaChart />
        </MainCard>
      </Grid>

      {/* 6. 위약금 통계 */}
      <Grid item xs={14} lg={3.9} marginTop="30px">
        <Typography variant={isMobile ? "h5" : "h4"} marginBottom="20px">위약금 통계</Typography>
        <MainCard sx={{ mt: 2, width: '100%', height: '400px' }} content={false}>
          <Box sx={{ p: 4, pb: 0 }} alignItems="center">
          <MonthlyDepositChart  />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  </Grid>
</Grid>
</Grid>
</Grid>
    
  );
};

export default DashboardDefault;