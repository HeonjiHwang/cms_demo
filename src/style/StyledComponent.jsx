import styled from 'styled-components';
import Icons from './Icons';

export const Wrapper = styled.div`
    width:100vw;
    height:100vh;
    overflow:hidden;
`;

export const ContentWrapper = styled.div`
    float:left;
    width:calc(100% - 300px);
    height:100%;
    overflow:auto;
    padding:10px;
`;

export const SignInWrapper = styled.div`
    width:100%;
    height:100%;
    background-color:#e4e4e4;
    display:flex;
    justify-content:center;
    align-items:center;

    .content{
        display:flex;
        background-color:#ffffff;
        width:1200px;
        height:550px;
        box-shadow: 5px 5px 20px 15px rgba(0, 0, 0, .1);
        overflow:hidden;
    }
`;

export const LeftSignInWrapper = styled.div`
    width:45%;
    height:100%;
    background-color:#444;
    color:#fff;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    
    .logoWrapper{
        height:60%;
        display:flex;
        align-items:center;
        h2{
            font-size:40px;
        }
    }
    .logoDesc{
        align-items: flex-start;
        justify-content: flex-end;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        width: 100%;
        margin: 0 auto 20px 20px;
        span{
            font-size:13px;
        }
    }
`;

export const RightSignInWrapper = styled.div`
    width:55%;
    height:100%;
    background-color:#fff;
    color:#444;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;

    .titleWrapper{
        height:20%;
        width:90%;
        display:flex;
        align-items:flex-end;
        justify-content:space-between;
        h2{
            font-size:32px;
            display: flex;
            align-items: center;
            span{
                font-size:26px;
                color:#888;
                margin:0 10px;
            }
        }
    }

    .signContent{
        height:calc(80% - 60px);
        width:90%;
        margin: 30px 0px;
        display:flex
        flex-direction:column;
        grid-gap : 0px;
        position:relative;

        div{
            width:100%;
        }

        .findInfo{
            margin-top:10px;
            font-size:13px;
            text-align:right;

            a{
                color:#888;
                transition:all .3s;
                cursor:pointer;

                &:hover{
                    color:#444;
                }
            }
        }

        .signInConfirm{
            position:absolute;
            bottom:40px;
        }
    }
`;



export const Header = styled.header`
    width:300px;
    height:100vh;
    background-color:#fff;
    border-right:1px solid #e4e4e4;
    float:left;
    padding:20px 30px;
    position:relative;
    transition:all .3s;

    .logo-wrapper{
        padding:30px 0px;
        display:none;
        
        h2{
            font-weight:700;
            font-size:24px;
        }
        span{
            font-size:14px;
        }
    }

    .userinfo-wrapper{
        display:flex;
        flex-direction:column;
        grid-gap:10px;
        align-items:center;
        box-shadow:0px 0px 15px 0px rgba(0,0,0,.2);
        border-radius:10px;
        padding:10px;
        margin-bottom:40px;

        .profile{
            width:100px;
            height:100px;
            background-color:#fff;
            border-radius:50%;
            border:2px solid #444;

            background-repeat:no-repeat;
            background-position:center;
            background-size:contain;
            background-image:url('./images/_photo.png');
        }
        .userinfo{
            div{
                font-size:13px;
                margin-top:15px;
                display:flex;
                flex-direction:column;
                align-items:center;
                transition:all .3s;

                .arrow{
                    display:block;
                    width:15px;
                    height:15px;
                    background-repeat:no-repeat;
                    background-position:center;
                    background-size:contain;
                    background-image:url('${Icons.Arrow}');
                    margin-top:15px;
                    cursor:pointer;
                    transition:all .3s;

                    &:hover{
                        background-image:url('${Icons.Arrow2}');
                    }
                }
                .toggle-userinfo{
                    overflow:hidden;
                    height:0px;
                    margin:0px;
                    transition:all .3s;
                    p{
                        font-size:12px;
                        margin-top:5px;
                        width:100%;
                        display:flex;
                        align-items:center;

                        i {
                            margin-right:5px;
                        }

                        a{
                            cursor:pointer;
                            &:hover{
                                color:#0225ff;
                            }
                        }
                    }
                }

                #chk-userinfo{
                    opacity:0;
                    width:0px;
                    height:0px;
                }

                #chk-userinfo:checked + label > .arrow{
                    transform:rotate(180deg);
                }
                #chk-userinfo:checked ~ .toggle-userinfo{
                    margin-top:15px;
                    height:auto;
                }
            }
        }
    }

    .close-userinfo{
        margin-bottom:20px;
        p{
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:50%;
            width:40px;
            height:40px;
            box-shadow:0 0 10px 0 rgba(0,0,0,.2);
        }
    }

    .menu-wrapper{
        padding-top:30px;
        border-top:2px solid #ccc;
        ul{
            display:flex;
            flex-direction:column;

            li{
                margin-bottom:15px;

                a{
                    display:flex;
                    align-items:center;
                    cursor:pointer;

                    i{
                        margin-right:10px;
                        pointer-events:none;
                    }

                    span{
                        font-size:14px;
                        pointer-events:none;

                        &.active{
                            font-weight:bold;
                        }
                    }

                    &.active{
                        i{
                            opacity:.8; 
                        }
                    }

                    &.closelink{
                        justify-content:center;
                        i{
                            margin:0px;
                        }
                    }
                    &:hover{
                        i{
                            opacity:.8;
                        }
                    }
                }

                &.submenu{
                    transition:all .3s;
                    margin-left:35px;
                    overflow:hidden;
    
                    &.close{
                        height:0px;
                        margin-bottom:0px;
                    }
                    &.open{
                        height:auto;
                        margin-bottom:15px;
                    }
                }

                &.closed-wrppaer{
                    a{
                        justify-content:center;
                        i{
                            margin:0px;
                        }
                    }
                }
            }
        }
    }

    .header-footer{
        a{
            position:absolute;
            bottom:30px;
            right:20px;
            display:flex;
            align-items:center;
            cursor:pointer;

            span{
                margin-left:10px;
                font-size:14px;
            }

            &:hover{
                i{
                    opacity:.8;
                }
            }
        }
    }

    .closeButton{
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        left:100%;
        transform:translateX(-50%);
        
        button{
            background-color:#fff;
            border:1px solid #ccc;
            padding:5px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            transition:all .3s;

            &:focus{
                outline:0px;
            }
            &:hover{
                background-color:#f2f3f4;
                border:1px solid #444;
            }
        }
    }
`;

/** 사용자관리 공통 스타일 컴포넌트 */
export const CollapseWrppaer = styled.div`
    margin:0;
    padding:10px;
`;

export const CollapseTitle = styled.div`
    font-weight:700;
    font-size:16px;
    padding:10px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:2px solid #f2f3f4;

    button{
        padding:0px;
        margin:0px;
        display:flex;

        &:hover > i{
            opacity:1;
        }
    }
`;
export const UserFormWrapper = styled.div`
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    grid-gap:10px;
    margin:30px 0;
    border-radius:20px;

    input{
        padding:0 10px;
    }
`;

export const UserConfirmWrapper = styled.div`
    text-align:right;
    button{
        margin-left:5px;
        padding:7px 25px;
    }
    margin-bottom:20px;
`;