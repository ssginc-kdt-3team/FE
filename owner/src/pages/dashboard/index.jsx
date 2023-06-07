import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import MonthlyBarChart from './TodayResv';
import IncomeAreaChart from './MonthlyResv';
import IncomeChart from './MonthlyDeposit';

const DashboardDefault = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        setCurrentDate(formattedDate);
    }, []);

    return (
        <div>메인</div>
      //   <Grid container style={{ minHeight: '100vh' }}>
      //     {/* 오늘 예약 현황*/}
      //     <div>
      //     <Grid item justifyContent="center" alignItems="center" xs={12} md={5} lg={4}>
      //       <Grid container>
      //         <Grid item>
      //           <Typography variant="h4">오늘 예약 현황</Typography>
      //         </Grid>
      //       </Grid>
      
      //       <MainCard sx={{ mt: 2, width: '1000px' }} content={false}>
      //         <Box sx={{ p: 4, pb: 0 }}>
      //           <Stack spacing={2}>
      //             <Typography variant="h6" color="textSecondary">
      //               {`오늘 날짜 : ${currentDate}`}
      //             </Typography>
                
      //           </Stack>
      //         </Box>
      //         <MonthlyBarChart />
      //       </MainCard>
      //     </Grid>
      // </div>

      //     {/* 이번달 예약 현황 */}
      //     <div>
      //     <Grid item justifyContent="space-between" alignItems="center" xs={12} md={5} lg={4}>
      //       <Grid container>
      //         <Grid item>
      //           <Typography variant="h4" marginTop="20px">이번달 예약 현황</Typography>
      //         </Grid>
      //       </Grid>
      
      //       <MainCard sx={{ mt: 2, width: '500px' }} content={false}>
      //         <Box sx={{ p: 4, pb: 0 }}>
      //           <Stack spacing={2}>
      //             <Typography variant="h6" color="textSecondary">
      //               {`이번 달 : ${currentDate.slice(0, 6)}`}
      //             </Typography>
      //             <Typography variant="h5">총: 100건</Typography>
      //           </Stack>
      //         </Box>
      //         <IncomeAreaChart />
      //       </MainCard>
      //     </Grid>
      //     </div>
      
      //     {/* 이번달 정산 예약금 */}
      //     <div>
      //     <Grid item justifyContent="center" alignItems="center" xs={12} md={5} lg={4}>
      //       <Grid container>
      //         <Grid item>
      //           <Typography variant="h4" marginTop="20px">이번달 정산 예약금</Typography>
      //         </Grid>
      //       </Grid>
      
      //       <MainCard sx={{ mt: 2, width: '500px' }} content={false}>
      //         <Box sx={{ p: 4, pb: 0 }}>
      //           <Stack spacing={2}>
      //             <Typography variant="h6" color="textSecondary">
      //               {`이번 달 : ${currentDate.slice(0, 6)}`}
      //             </Typography>
      //             <Typography variant="h5">총: 100건</Typography>
      //           </Stack>
      //         </Box>
      //         <IncomeChart />
      //       </MainCard>
      //     </Grid>
      //     </div>
      //   </Grid>
      );
};

export default DashboardDefault;