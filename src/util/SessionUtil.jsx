import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setUserInfo } from "../redux/boffice";
import axios from 'axios'

export const SignOut = (msg) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(msg && typeof(msg) === 'string')
        alert(msg);

    dispatch(setUserInfo({}));
    navigate("/");
    //signout server session 삭제
    axios.post("/signout")
}