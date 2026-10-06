import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';

const SmallDate = ({ setAll }) => {
    const [value, setValue] = React.useState([null, null]);
    const [daysBetween, setDaysBetween] = React.useState(0);
    const [start, setStart] = React.useState("");
    const [end, setEnd] = React.useState("");

    const handleDateChange = (newValue) => {
        setValue(newValue);

        if (newValue[0] && newValue[1]) {
            const startt = dayjs(newValue[0]);
            const endd = dayjs(newValue[1]);
            const differenceInDays = endd.diff(startt, 'day');
            
            setDaysBetween(differenceInDays);
            const startFormatted = dayjs(newValue[0]).format('MMMM D, YYYY');
            const endFormatted = dayjs(newValue[1]).format('MMMM D, YYYY');

            setStart(startFormatted);
            setEnd(endFormatted);
            setAll(differenceInDays, endFormatted, startFormatted);
        } else {
            setDaysBetween(0);
        }
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateRangePicker']}>
                    <DateRangePicker
                        onChange={handleDateChange}
                        value={value}
                        localeText={{ start: 'Check-in', end: 'Check-out' }}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}

export default SmallDate;
