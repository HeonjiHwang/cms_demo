import styled from 'styled-components';
import Icons from './Icons';

export const Button = styled.button`
    padding:10px 25px;
    border:0px;
    background-color:#555;
    color:white;
    transition:all .3s;
    border-radius:5px;
    font-size:14px;

    &:hover{
        background-color:#444;
    }
    
    &:disabled{
        color:#f2f3f4;
        background-color:#888;
        cursor:not-allowed;
    }

    &.none{
        background-color:#ffffff00;
        border:0px;
        padding:0px;
        margin:0px;
        color:#444;
        font-size:14px;

        &:hover{
            color:#2755b3;
        }
    }

    &.default{
        background-color:#fff;
        border:1px solid #ccc;
        color:#444;

        &:hover{
            background-color:#f2f3f4;
        }

        &:disabled{
            color:#444;
            background-color:#ccc;
            cursor:not-allowed;
        }
    }

    &.confirm{
        background-color:#2755b3;

        &:hover{
            background-color:#5280dd;
        }

        &:disabled{
            color:#fff;
            background-color:#81abff;
            cursor:not-allowed;
        }
    }

    &.modify{
        background-color:#ff9900;

        &:hover{
            background-color:#ff8201
        }

        &:disabled{
            background-color:#f79e42;
            cursor:not-allowed;
        }
    }

    &.delete{
        background-color:#d90101;

        &:hover{
            background-color:#ff3a3a;
        }

        &:disabled{
            background-color:#eb4b4b;
            cursor:not-allowed;
        }
    }

    &.circled{
        width:150px;
        height:45px;
        border-radius:50px;
        text-align:center;
        font-weight:700;
        font-size:20px;
        padding:0px;
        lien-heght:20px;
    }
`;

export const FormWrapper = styled.div`
    display:flex;
    grid-gap:10px;
    align-items:center;
    border-bottom:1px solid #ccc;
    position:relative;
    margin-top:${props => !!props.marginTop ? props.marginTop : 30}px;

    label{
        width:20%;
        font-weight:500;
        font-size:13px;
        color:#444;
        font-weight:700;
        text-align:center;
        margin-right:15px;
        margin-left:15px;
    }
    input, select, textarea{
        width:100%;
        border:0px;
        font-size:14px;

        &:focus{
            outline:0px;
        }

        &:disabled{
            background-color:#f2f3f4;
            cursor:not-allowed;
        }
    }

    &.modify{
        border-bottom:0px;
        margin:0px;

        input, select, textarea{
            border:1px solid #e4e4e4;
            height:34px;
            padding:0 10px;
        }
        textarea{
            height:auto;
            padding:10px;
        }
    }
`;

export const Input = styled.input`
    border:1px solid #f2f3f4;
    height:34px; 
    font-size:13px;

    &:focus{
        outline:0px;
    }
`

export const Select = styled.select`
    border:1px solid #e4e4e4;
    height:34px;
    padding:0 10px;
    cursor:pointer;
    font-size:15px;
    background:url(${Icons['Arrow']}) no-repeat 98% 50%/15px auto;

    &:focus{
        outline:0px;
    }

    &:disabled{
        cursor:not-allowed;
    }
`;

export const Icon = styled.i`
    display:inline-block;
    width:${props => props.width || 20}px;
    height:${props => props.height || 20}px;
    background-image:url('${props => Icons[props.src]}');
    background-repeat:no-repeat;
    background-size:${props=>props.width-5 || 20}px ${props => props.height-5 || 20}px;
    background-position:center;
    opacity:${props => props.opacity || 0.5};

    transform:${props => props.transform || 'none'};
    transition:all .3s;
`;

export const Tooltip = styled.div`
    position:absolute;
    top:${props => props.top + 10 || 0}px;
    left:${props => props.left + 20 || 0}px;
    background-color:#fff;
    border-radius:5px;
    box-shadow:0 0 15px 0 rgba(0,0,0,.3);
    width:auto;
    height:auto;
    padding:10px;
    z-index:1000;

    div{
        font-size:13px;
        display:grid;
        grid-template-columns:repeat(2, 1fr);
        grid-gap:10px;

        span:first-child{
            self-justify:end
        }
    }
`;