import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosWithBaseUrl } from "App";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const barChartOptions = {
  chart: {
    type: "bar",
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ["지난 3개월", "지난 2개월", "지난 1개월", "이번 달"],
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
  const id = useSelector((state) => state.user.id);
  const [monthlyDeposit, setMonthlyDeposit] = useState([]);
  const { secondary } = theme.palette.text;
  const [currentDate, setCurrentDate] = useState("");
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(barChartOptions);
  const [thisMonthPenalty, setThisMonthPenalty] = useState(0);

  useEffect(() => {
    axiosWithBaseUrl
      .get(`/owner/main/deposit/${id}`)
      .then((res) => {
        console.log(res.data);
        setMonthlyDeposit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    setCurrentDate(formattedDate);

    if (monthlyDeposit.length > 0) {
      const numData = [
        monthlyDeposit[0]?.last3MonthPenalty || 0,
        monthlyDeposit[0]?.last2MonthPenalty || 0,
        monthlyDeposit[0]?.lastMonthPenalty || 0,
        monthlyDeposit[0]?.thisMonthPenalty || 0
      ];

      const total = numData.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      setOptions((prevState) => ({
        ...prevState,
        xaxis: {
          categories: ["지난 3개월", "지난 2개월", "지난 1개월", "이번 달"],
          axisTicks: {
            show: false
          },
          labels: {
            style: {
              colors: [secondary]
            }
          }
        },
      }));

      setSeries([{ data: numData, name: "위약금" }]);
      setThisMonthPenalty(monthlyDeposit[0]?.thisMonthPenalty || 0);
    } else {
      setOptions((prevState) => ({
        ...prevState,
        xaxis: {
          categories: [],
          axisTicks: {
            show: false
          },
          labels: {
            style: {
              colors: [secondary]
            }
          }
        },
      }));

      setSeries([]);
      setThisMonthPenalty(0);
    }
  }, [monthlyDeposit, secondary]);

  return (
    <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
      <Typography variant="h6" color="textSecondary">
        {`이번 달 : ${currentDate.slice(0, 6)}`}
      </Typography>
      <Typography variant="h5" style={{ marginLeft: "35px", marginTop: "10px" }}>
        이번달 위약금: {thisMonthPenalty}원
      </Typography>
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default MonthlyDepositChart;