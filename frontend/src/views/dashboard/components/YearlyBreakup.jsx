import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft, IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import axios from 'axios';

import DashboardCard from '../../../components/shared/DashboardCard';
const YearlyBreakup = () => {
  const [currentYearSale, setCurrentYearSale] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [previousYear, setPreviousYear] = useState(0);
  const [previousYearSale, setPreviousYearSale] = useState(0);
  const [twoYearsAgoSale, setTwoYearsAgoSale] = useState(0);
  const [saleIncreasePrecentage, setSaleIncreasePrecentage] = useState(0);

  // useEffect(() => {
  //   const fetchCurrentYearSale = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/api/orders/current-year-breakup');
  //       if (response.data.length > 0) {
  //         setCurrentYearSale(response.data[0].total_amount);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching total yearly sales:', error);
  //     }
  //   };

  //   fetchCurrentYearSale();
  // }, []);

  useEffect(() => {
    const fetchYearlySales = async () => {
      try {

        const response = await axios.get('http://localhost:4000/api/orders/yearly-breakup');
        const data = response.data;

        if (data.length > 0) {
          setCurrentYearSale(data[0].total_amount);
          setCurrentYear(data[0].year);
        }
        if (data.length > 1) {
          setPreviousYearSale(data[1].total_amount);
          setPreviousYear(data[1].year);
          console.log(data[1].total_amount);
        }
        if (data.length > 2) {
          setTwoYearsAgoSale(data[2].total_amount);
        }

        if (data.length > 1) {
          const increasePercentage = Math.abs(((data[0].total_amount - data[1].total_amount) / data[0].total_amount) * 100);
          setSaleIncreasePrecentage(increasePercentage);
          console.log('Sale Increase Percentage:', increasePercentage);
        }

      } catch (error) {
        console.error('Error fetching yearly sales:', error);
      }
    };

    fetchYearlySales();
  }, []);


  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [38, 40, 25];

  return (
    <DashboardCard title="Yearly Breakup">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h4" fontWeight="700">
            {currentYearSale.toLocaleString()} MMK
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              {currentYearSale > previousYearSale ? (
                <IconArrowUpRight width={20} color="#39B69A" />
              ) : (
                <IconArrowDownRight width={20} color="#FA896B" />
              )}
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {saleIncreasePrecentage.toFixed(2)}%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              last year
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {previousYear}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {currentYear}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
