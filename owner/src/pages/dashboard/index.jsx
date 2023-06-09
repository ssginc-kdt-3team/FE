import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
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
  

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    setCurrentDate(formattedDate);
  }, []);

  return (
    <Grid container style={{ minHeight: '100vh'}}>
      {/* 상단 구역 */}
      <Grid container justifyContent="center" alignItems="center" marginTop="30px" marginLeft="30px">
        {/* 1. 시계 */}
        <div>
        <Grid item justifyContent="center" alignItems="center"  >
          <Typography variant="h5" marginBottom="20px" style={{ marginBottom: '20px', textAlign: 'center' }}>{name}님 좋은 하루 보내세요!</Typography>
          <MainCard sx={{ mt: 2, width: '360px', height: '150px', padding: '20px'}} content={false} >
         <Clock />
        </MainCard>
        </Grid>
          {/* 2. 매장 정보 */}
        <Grid item >
          <Typography variant="h5" marginBottom="20px" marginTop="30px" >매장 운영 정보</Typography>
          <MainCard sx={{ mt: 2, width: '360px', height: '295px' }} content={false} >
          <MgtInfo/>
        </MainCard>
        </Grid>
        </div>
        {/* 3. 오늘 예약 현황 */} 
        <Grid item marginLeft='40px'>
          <Typography variant="h4" marginBottom="20px">오늘 예약 현황</Typography>
          <MainCard sx={{ mt: 2, width: '870px', height: '520px', padding: '4px' }} content={false} xs={12} md={7} lg={8} >
            <Box sx={{ p: 4, pb: 0 }}>
              <Stack spacing={2}>
                <Grid container alignItems="center">
                  {/* 오늘 예약 차트 */}
                  <MonthlyBarChart />
                </Grid>
              </Stack>            
            </Box>
          </MainCard>
        </Grid>
      </Grid>

      {/* 하단 구역 */}
      <Grid container justifyContent="center" alignItems="center" marginTop="60px">
      {/* 4. 달력 */}
      <Grid item marginLeft='40px'>
          <Typography variant="h5" marginBottom="20px">달력</Typography>
          <MainCard sx={{ mt: 2, width: '400px', height: '400px', p:6}} content={false}>
           <Box sx={{ justifyContent: 'center', alignItems: 'center'}}>
            <MainCalendar />
            </Box>
          </MainCard>
        </Grid>
        
        {/* 5. 예약 통계 */}
        <Grid item marginLeft='40px'>
          <Typography variant="h4" marginBottom="20px">예약 통계</Typography>
          <MainCard sx={{ mt: 2, width: '400px', height: '400px', padding: '4px' }} content={false}>
            <Box sx={{ p: 4, pb: 0 }}>
              <Stack spacing={2}>
              </Stack>
            </Box>
            <IncomeAreaChart />
          </MainCard>
        </Grid>

        {/* 6. 위약금 통계 */}
        <Grid item marginLeft='40px'>
          <Typography variant="h4" marginBottom="20px">위약금 통계</Typography>
          <MainCard sx={{ mt: 2, width: '400px', height: '400px' }} content={false}>
            <Box sx={{ p: 4, pb: 0 }}>
              <Stack spacing={2}>
              </Stack>
            </Box>
            <MonthlyDepositChart />
          </MainCard>
        </Grid>
        
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;