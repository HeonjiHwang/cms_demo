import { useSelector } from 'react-redux';
import { Wrapper } from "./style/StyledComponent";
import ReactRouter from './router/ReactRouter';
import SignIn from "./views/SignIn";

function App() {
  const {userInfo} = useSelector((state) => state.boffice);

  return (
    <Wrapper>
      {
        !!userInfo.user_cd ? <ReactRouter/> : <SignIn/>
      }
    </Wrapper>
  );
}

export default App;
