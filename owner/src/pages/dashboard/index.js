import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import MonthlyBarChart from './MonthlyBarChart';

const DashboardDefault = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        setCurrentDate(formattedDate);
    }, []);

    return (
        <Grid container style={{ minHeight: '100vh' }}>
      {/* 오늘 예약 현황 그래프 */}
      <Grid item justifyContent="center" alignItems="center" xs={12} md={5} lg={4}>
        <Grid container>
          <Grid item>
            <Typography variant="h4">오늘 예약 현황</Typography>
          </Grid>
        </Grid>

        <MainCard sx={{ mt: 2, width: '1000px' }} content={false}>
          <Box sx={{ p: 4, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                {`오늘 날짜 : ${currentDate}`}
              </Typography>
              <Typography variant="h5">총: 100건</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* 이번달 예약 현황 */}
      <Grid item justifyContent="center" alignItems="center" xs={12} md={5} lg={4}>
        <Grid container>
          <Grid item >
            <Typography variant="h4" margintop="20px">이번달 예약 현황</Typography>
          </Grid>
        </Grid>

        <MainCard sx={{ mt: 2, width: '500px' }} content={false}>
          <Box sx={{ p: 4, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                {`이번 달 : ${currentDate.slice(0, 6)}`}
              </Typography>
              <Typography variant="h5">총: 100건</Typography>
            </Stack>
          </Box>
          {/* 파이차트 넣기 */}
          <MonthlyBarChart />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;