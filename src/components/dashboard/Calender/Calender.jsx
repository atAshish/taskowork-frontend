/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

const indianHolidays = [
  { date: '2023-01-26', name: 'Republic Day', className: 'holiday-republic' },
  { date: '2023-08-15', name: 'Independence Day', className: 'holiday-independence' },
  { date: '2023-10-02', name: 'Gandhi Jayanti', className: 'holiday-gandhi' },
];

const isHoliday = (date) => {
  const dateString = date.toISOString().slice(0, 10);
  return indianHolidays.find(holiday => holiday.date === dateString);
};

// Example task data
const tasks = {
  '2023-06-01': [
    { id: 1, completed: true },
    { id: 2, completed: false },
    { id: 3, completed: true },
    { id: 4, completed: false },
  ],
  '2023-06-02': [
    { id: 5, completed: true },
    { id: 6, completed: false },
  ],
  '2023-06-15': [
    { id: 7, completed: true },
    { id: 8, completed: false },
    { id: 9, completed: true },
  ],
  // Add more tasks for other dates as needed
};

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  const renderTasks = (date) => {
    const dateString = date.toISOString().slice(0, 10);
    const tasksForDay = tasks[dateString] || [];

    return (
      <div className="flex justify-center">
        {tasksForDay.map(task => (
          <span
            key={task.id}
            className={`h-2 w-2 rounded-full mx-0.5 ${
              task.completed ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></span>
        ))}
      </div>
    );
  };

  return (
    <div className="custom-calendar-container">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          const holiday = isHoliday(date);
          if (holiday) {
            return holiday.className;
          }
          if (date.getDate() === new Date().getDate()) {
            return 'highlight-today';
          }
        }}
        tileContent={({ date, view }) => {
          const holiday = isHoliday(date);
          if (view === 'month' && holiday) {
            return <div className="holiday-tooltip">{holiday.name}</div>;
          }

          return renderTasks(date);
        }}
      />
    </div>
  );
};

export default CustomCalendar;