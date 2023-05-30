import { useState } from 'react';

// material-ui
import {
    Grid,  
    Typography
} from '@mui/material';

// project import


// assets


// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};



// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {


    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">공지사항</Typography>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
