import React, { useState } from "react";
import Select from "react-select";
import "./BirthDatePicker.css";

export default function BirthDatePicker({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
}) {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  window.addEventListener("resize", () => {
    window.innerWidth < 372
      ? setIsMobileScreen(true)
      : setIsMobileScreen(false);
  });

  const years = Array.from({ length: 100 }, (_, index) => {
    const year = new Date().getFullYear() - index;
    return { value: year, label: year.toString() };
  });

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleDayChange = (selectedOption) => {
    setSelectedDay(selectedOption);
  };

  const generateDaysOptions = () => {
    if (!selectedMonth || !selectedYear) return [];

    const month = selectedMonth.value;
    const year = selectedYear.value;
    const daysInMonth = getDaysInMonth(month, year);

    const daysOptions = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      return { value: day, label: day.toString() };
    });

    return daysOptions;
  };

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      width: !isMobileScreen ? 100 : 80,
      height: 15,
      backgroundColor: "black",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };

  return (
    <div className="birth-date-picker">
      <label>What is your date of birth?</label>
      <div className="date-inputs">
        <div>
          <label>Year:</label>
          <Select
            options={years}
            value={selectedYear}
            onChange={handleYearChange}
            styles={selectStyles}
          />
        </div>
        <div>
          <label>Month:</label>
          <Select
            options={months}
            value={selectedMonth}
            onChange={handleMonthChange}
            styles={selectStyles}
          />
        </div>
        <div>
          <label>Day:</label>
          <Select
            options={generateDaysOptions()}
            value={selectedDay}
            onChange={handleDayChange}
            styles={selectStyles}
          />
        </div>
      </div>
    </div>
  );
}
