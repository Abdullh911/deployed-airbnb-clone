import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { useRecoilState } from 'recoil';
import { showDateModal } from './StateMangement/State';
import dayjs from 'dayjs';

const LargeDate = ({ onRangeSelect }) => {
    let [showDmodal, setShowDmodal] = useRecoilState(showDateModal);
    const [selectedRange, setSelectedRange] = React.useState([null, null]);

    const handleRangeChange = (newRange) => {
        setSelectedRange(newRange);
        if (newRange[0] && newRange[1]) {
            const formattedRange = [
                dayjs(newRange[0]).format('YYYY-MM-DD'),
                dayjs(newRange[1]).format('YYYY-MM-DD') 
            ];
            onRangeSelect(formattedRange); 
            setShowDmodal(false);
        }
    };

    return (
        <div className={`absolute bg-white w-full shadow-xl rounded-3xl top-[75px] flex justify-center ${showDmodal ? '' : 'hidden'}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateRangeCalendar']}>
                    <DateRangeCalendar
                        value={selectedRange}
                        onChange={handleRangeChange}
                        sx={{
                            '& .Mui-selected': {
                              backgroundColor: 'black',  // Change the color of the selected date range
                              color: 'white',           // Change text color of selected dates
                            },
                            '& .MuiPickersDay-dayOutsideMonth': {
                              color: 'gray',           // Styling for days outside the current month
                            },
                          }}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}

export default LargeDate;
