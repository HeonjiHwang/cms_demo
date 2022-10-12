import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentWrapper } from "../style/StyledComponent";

import DashBoard from '../views/Dashboard/DashBoard';
import MenuSecond from '../views/MenuSecond';
import UserManagement from '../views/UserManagement/UserManagement';
import CommonHeader from '../components/CommonHeader';
import UserRequestInfo from "../views/UserManagement/UserRequestInfo";
import UserAccessList from "../views/UserManagement/UserAccessList";
import AuthorityManagement from "../views/Authority/AuthorityManagement";
import MenuAuthorityManagement from "../views/Authority/MenuAuthorityManagement";
import NftMenu from "../views/NFT/NftMenu";

const ReactRouter = () => {

    return (
        <BrowserRouter>
            <CommonHeader/>
            <ContentWrapper className="content-wrapper">
                <Routes>
                    <Route path="*" element={<div>Not Found</div>}/>
                    <Route path="/" element={<DashBoard/>}/>
                    <Route path="/menu2" element={<MenuSecond/>}/>
                    <Route path="/whitelist" element={<NftMenu/>}/>
                    <Route path="/authority" element={<AuthorityManagement/>}/>
                    <Route path="/menuauthority" element={<MenuAuthorityManagement/>}/>
                    <Route path="/usermanagement" element={<UserManagement/>}/>
                    <Route path="/userrequest" element={<UserRequestInfo/>}/>
                    <Route path="/useraccess" element={<UserAccessList/>}/>
                </Routes>
            </ContentWrapper>
        </BrowserRouter>
    )
}

export default ReactRouter;