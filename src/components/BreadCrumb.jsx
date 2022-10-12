import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../style/CommonStyle';
import styled from 'styled-components';

const BreadCrumbStyle = styled.div`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:column;
    margin:20px 0px;

    h3{
        font-size:24px;
        font-weight:700;
        margin:10px;
    }
    div{
        display:flex;
        align-items:center;
        justify-content:flex-start;
        margin:10px;
        span{
            color:#444
        }
        a{
            color:#318fef;
            i{
                margin:0 5px;
            }
        }
    }
`;

const BreadCrumb = ({current, path}) => {
    return (
        <BreadCrumbStyle>
            <h3>{current}</h3>
            <div>
                {
                    path.map((val, key) => {
                        return (
                            !val.path || val.path === '' ? 
                            <span key={key}>{val.title}</span> : 
                            <Fragment key={key}>
                                <Link to={val.path}>{val.title}</Link>
                                <Icon src={'Arrow'} width={20} height={20} transform={"rotate(-90deg)"}/>
                            </Fragment>
                        )
                    })
                }
            </div>
        </BreadCrumbStyle>
    )
}

export default BreadCrumb;