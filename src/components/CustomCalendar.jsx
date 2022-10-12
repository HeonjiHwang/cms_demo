import Calendar from 'react-calendar';
import moment from 'moment';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import '../assets/css/_lib_custom.css';

const Dot = styled.div`
    height:6px;
    width:6px;
    background-color:#f87171;
    border-radius:50%;
    display:flex;
    margin-left:1px;
`;

const CustomCalendar = ({mark}) => {
    return (
        <Calendar formatDay={(locale, date) => moment(date).format("DD")} className="mx-auto w-full text-sm border-b" 
            tileContent={({date, view}) => {
                if(mark.find((x) => x === moment(date).format("YYYY-MM-DD"))){
                    return (
                        <>
                            <div className="dot-wrapper">
                                <Dot/>
                            </div>
                        </>
                    )
                }
        }}/>
    )
}

export default CustomCalendar