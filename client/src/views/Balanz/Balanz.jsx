import { useState } from 'react';
import BalanceMensual from '../../components/Balance/BalanceMensual';
import { Box, Paper, Typography, Button, Grid } from '@mui/material';
import NavBar from '../../components/NavBar/NavBar';
import BalanceBarChart from '../../components/Charts/BalanceBarChart';

const Balanz = () => {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const currentYear = new Date().getFullYear();

    const goToPreviousMonth = () => {
        // const currentYear = new Date().getFullYear();
        // const currentMonth = new Date().getMonth();
        if (selectedMonth === 0) {
            setSelectedYear(selectedYear - 1);
            setSelectedMonth(11);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const goToNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedYear(selectedYear + 1);
            setSelectedMonth(0);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    return (
        <>
            <NavBar />
            <Box>
                <Box m="50px" textAlign="left">
                    <Typography variant="h4" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
                        Balance Mensual
                    </Typography>
                    <Typography variant="h5">
                        Visualiza tu balance
                    </Typography>
                </Box>

                <Paper elevation={3} sx={{ margin: 2, borderRadius: 6, padding: 2 }}>

                    <Grid container spacing={3}>
                       
                        <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                            
                            <Button variant="outlined" onClick={goToPreviousMonth}>Mes anterior</Button>
                            {selectedYear !== currentYear && (
                                <Typography variant='h6' sx={{mx:2}}>{months[selectedMonth]} {selectedYear}</Typography>
                            )}
                            {selectedYear === currentYear && (
                                <Typography variant='h6' sx={{mx:2}}>{months[selectedMonth]}</Typography>
                            )}
                            <Button variant="outlined" onClick={goToNextMonth}>Próximo mes</Button>
                        </Box>

                        </Grid>
                        
                        <Grid item xs={12}>
                            <Grid container spacing={3} justifyContent="center">
                               
                                <Grid item xs={12} md={6} justifyContent="center">
                                    <BalanceMensual selectedMonth={selectedMonth} selectedYear={selectedYear} />
                                </Grid>
                                
                                <Grid item xs={12} md={4} display="flex" justifyContent="center">
                                    <BalanceBarChart selectedMonth={selectedMonth} selectedYear={selectedYear} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

export default Balanz;
