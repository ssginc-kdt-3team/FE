import { useState } from "react";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Button } from "@mui/material";


const DateFilter = ({ selectedDate, onDateChange, onFilterClick }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  const handleDateChange = (date) => {
    onDateChange(date);
    const formattedDate = date ? date.toLocaleDateString() : "";
    setFormattedDate(formattedDate);
  };

  const handleTimeChange = (time) => {
    // Assuming you're passing the selected time value to `onDateChange` as well
    onDateChange(selectedDate, time);
    const formattedTime = time ? time.toLocaleTimeString() : "";
    setFormattedTime(formattedTime);
  };

  const handleFilterClick = () => {
    onFilterClick();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <DatePicker
          label="날짜"
          value={selectedDate}
          onChange={handleDateChange}
          textField={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="시간"
          value={selectedDate}
          onChange={handleTimeChange}
          textField={(params) => <TextField {...params} />}
        />

        <Button variant="contained" onClick={handleFilterClick}>
          조회하기
        </Button>
      </div>

      <div>선택한 날짜 및 시간: {formattedDate}, {formattedTime}</div>
    </LocalizationProvider>
  );
};

export default DateFilter;


// import { useState } from "react";
// import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { TextField, Button } from "@mui/material";

// const DateFilter = ({ selectedDate, onDateChange, onFilterClick }) => {
//   const [formattedDate, setFormattedDate] = useState("");
//   const [formattedTime, setFormattedTime] = useState("");

//   const handleDateChange = (date) => {
//     onDateChange(date);
//     const formattedDate = date ? date.toLocaleDateString() : "";
//     setFormattedDate(formattedDate);
//   };

//   const handleTimeChange = (time) => {
//     // Assuming you're passing the selected time value to `onDateChange` as well
//     onDateChange(selectedDate, time);
//     const formattedTime = time ? time.toLocaleTimeString() : "";
//     setFormattedTime(formattedTime);
//   };

//   const handleFilterClick = () => {
//     onFilterClick();
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div>      
//         <DatePicker
//           label="날짜"
//           value={selectedDate}
//           onChange={handleDateChange}
//           textField={(params) => <TextField {...params} />}
//         />
//         <TimePicker
//           label="시간"
//           value={selectedDate}
//           onChange={handleTimeChange}
//           textField={(params) => <TextField {...params} />}
//         />

//         <Button variant="contained" onClick={handleFilterClick}>
//           조회하기
//         </Button>
//       </div>

//       <div>선택한 날짜 및 시간: {formattedDate}, {formattedTime}</div>
//     </LocalizationProvider>
//   );
// };

// export default DateFilter;