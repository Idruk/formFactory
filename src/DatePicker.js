import React from 'react';
import { TextField } from '@mui/material';

const CustomDatePicker = ({ value, onChange }) => {
    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        onChange(selectedDate);
    };

    return (
        <TextField type="date" value={value || ''} onChange={handleDateChange} />
    );
};

export default CustomDatePicker;
