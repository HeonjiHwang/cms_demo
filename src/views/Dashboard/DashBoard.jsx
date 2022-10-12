import { Icon } from "../../style/CommonStyle";
import CustomCalendar from "../../components/CustomCalendar";
import styled from "styled-components";

const MyCanlendar = styled.section`
    width:100%;
    padding:10px;
    height:auto;
    margin:0 auto;
    display:flex;
    justify-content:space-between;
    
    .graph-wrapper{
        width:calc(100% - 320px);
        height:260px;
        overflow:hidden;
        padding:10px;
        margin-left:20px;
        box-shadow:0px 0px 15px 0px rgba(0,0,0,.2);
        border-radius:10px;
        display:flex;
        flex-direction:column;

        h3{
            font-weight:700;
            margin-bottom:20px;
            display:flex;
            align-items:center;

            i{
                margin-right:5px;
            }
        }

    }
`
const DashBoard = () => {
    const mark = ['2022-08-19', '2022-08-13', '2022-08-14'];

    return (
        <>
            <MyCanlendar>
                <CustomCalendar mark={mark} />
                <div className="graph-wrapper">
                    <h3>
                        <Icon width={20} height={20} src={'Info'} opacity={1}/>
                        <span>이번주 나의 업무</span>
                    </h3>
                    <div>hello</div>
                </div>
                {/*  */}
            </MyCanlendar>
        </>
    )
}

export default DashBoard;