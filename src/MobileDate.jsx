import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { useRecoilState } from 'recoil';
import { isEnglish, langCode, showDateModal } from './StateMangement/State';
import dayjs from 'dayjs';
import langs from './langs';

const MobileDate = ({ onRangeSelect,show ,setRange}) => {
    let [showDmodal, setShowDmodal] = useRecoilState(showDateModal);
    const [selectedRange, setSelectedRange] = React.useState([null, null]);
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [lang,setLang]=useRecoilState(langCode);
    const handleRangeChange = (newRange) => {
        setSelectedRange(newRange);
        if (newRange[0] && newRange[1]) {
            const formattedRange = [
                dayjs(newRange[0]).format('YYYY-MM-DD'),
                dayjs(newRange[1]).format('YYYY-MM-DD') 
            ];
            setRange(formattedRange[0]+' to '+formattedRange[1])
            setShowDmodal(false);
        }
    };

    return (
        <div className={`overflow-x-hidden bg-white w-full shadow-xl rounded-3xl flex flex-col ${show?'':'hidden'} `}>
            <h1 className='text-2xl font-bold pl-5 pt-5'>{langs[lang].whenIsYourTrip}</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateRangeCalendar']}>
                <div style={{display:'flex',justifyContent:'center' }}>  
                        <DateRangeCalendar
                            value={selectedRange}
                            onChange={handleRangeChange}
                            calendars={1} 
                            sx={{
                                '& .Mui-selected': {
                                  backgroundColor: 'black',  
                                  color: 'white',           
                                },
                                '& .MuiPickersDay-dayOutsideMonth': {
                                  color: 'gray',          
                                },
                              }}
                        />
                    </div>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}

export default MobileDate;
