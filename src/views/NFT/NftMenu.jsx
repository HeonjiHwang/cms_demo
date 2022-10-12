import { Button } from '../../style/CommonStyle';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FormWrapper } from '../../style/CommonStyle';
import NFT from '../../util/constant/NFT.json'
import Water from '../../util/constant/Water.json'
import BreadCrumb from '../../components/BreadCrumb';
import styled from 'styled-components';

const WhiteListWrapper = styled.div`
    width:100%;
    height:100%;
    padding:15px;
    display:flex;
    flex-direction:column;
    grid-gap:40px;

    div.section{
        display:flex;
        flex-direction:column;
        width:100%;
        height:auto;
    }
`;

const Title = styled.h2`
    font-size:17px;
    font-weight:bold;
`;

const NFTContentWrapper = styled.div`
    margin-top:20px;
    padding:20px 0px;
    border-radius:15px;
    box-shadow:0 0 15px 0 rgba(0,0,0,.2);

    div{
        div{
            margin:0px;
            border-bottom:0px;
            label{
                min-width:120px;
                width:10%;
            }
            span{
                font-size:15px;
            }
        }
        

        &.account-wrapper{
            display: flex;
            flex-direction: column;
            grid-gap: 20px;
        }

        &.white-wrapper{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 20px
        }
    }

    &.account-auth{
        color:#f00;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-size:15px;
        grid-gap:15px;

        span{
            &:last-child{
                font-size:13px;
                color:#000;
            }
        }
    }
`;

const NftMenu = () => {
    const path = [{title:'NFT', path:'/whitelist'}, {title:'화이트리스트'}];
    const [accountInfo, setAccountInfo] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    const handleConnectMetaMask = async () => {
        if(window.ethereum){
            let eth = window.ethereum;
            try{
                let accounts = await eth.request({method:'eth_requestAccounts'});
                if(accounts.length > 0){
                    let balanceHex = await eth.request({method:"eth_getBalance", params:[accounts[0], 'latest']});
                    let balance = ethers.utils.formatEther(balanceHex);

                    let walletData = {
                        addr : accounts[0],
                        balance : balance,
                    }
                    setAccountInfo(walletData);
                    startWalletEvent();

                    checkAdmin(accounts[0]);
                }
            }catch(e){

            }
        }
    }

    const checkAdmin = async (addr) => {
        let provider = getProvider("P");
        let nftContract = getContract("N", provider);

        let result = await nftContract.isAdmin();

        if(result.toLowerCase() === addr.toLowerCase()){
            setIsAdmin(true);
        }else{
            setIsAdmin(false);
        }
    }

    const isWhiteList = async (addr) => {
        let provider = getProvider();
        let nftContract = getContract("N", provider);

        try{
            let result = await nftContract.whiteList(addr);
            return result;
        }catch(e){
            console.log(e);
        }
    }

    const addWhiteList = async () => {
        let addr = document.querySelector(".addr");

        let isWhite = await isWhiteList(addr.value);
        
        if(isWhite){
            alert("이미 추가된 주소입니다.")
        }else{
            let provider = getProvider();
            let nftContract = getContract("N", provider);

            try{
                let result = await nftContract.addWhiteList(addr.value);
                let tx = await result.wait();
                if(tx){
                    alert("추가되었습니다.");
                    addr.value = "";
                }
            }catch(e){
                alert("Error");
                console.log(e);
            }
        }
    }
    const removeWhiteList = async (addr) => {

    }

    const getProvider = (flag) => {
        const provider = !!accountInfo.addr ? new ethers.providers.Web3Provider(window.ethereum) : new ethers.providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com');

        if(flag === 'P'){
            return provider;
        }else{
            console.log("!!!")
            const signer = provider.getSigner();
            return signer;
        }
    }

    const getContract = (flag, provider) => {
        let contract;
        if(flag === 'N'){
            contract = new ethers.Contract(process.env.REACT_APP_NFTMARKETADDR, NFT.abi, provider);
        }else{
            contract = new ethers.Contract(process.env.REACT_APP_WATEARADDR, Water.abi, provider);
        }
        return contract;
    }

    const startWalletEvent = () => {
        let eth = window.ethereum;

        eth.on("accountsChanged", (accounts) => {
            if(accounts.length < 0)
                setAccountInfo({});
            else{
                handleConnectMetaMask();
            }
        })
    }

    useEffect(() => {
        if(!!accountInfo.addr === false){
            handleConnectMetaMask();
        }
    }, [])

    return (
        <div className="content-wrapper">
            <BreadCrumb current="화이트리스트" path={path}/>
            <WhiteListWrapper>
                <div className="section">
                    <Title>메타마스크 연동</Title>
                    <NFTContentWrapper>
                        {
                            !!accountInfo.addr ? 
                            <div className="account-wrapper">
                                <FormWrapper>
                                    <label>계정주소</label>
                                    <span>{accountInfo.addr}</span>
                                </FormWrapper>
                                <FormWrapper>
                                    <label>잔액</label>
                                    <span>{accountInfo.balance}</span>
                                </FormWrapper>
                            </div> 
                            : <Button className="confirm" onClick={handleConnectMetaMask}>메타마스크 연동</Button>
                        }
                    </NFTContentWrapper>
                </div>
                <div className="section">
                    <Title>화이트리스트 추가</Title>
                    {
                        isAdmin ? 
                        <NFTContentWrapper>
                            <div className="white-wrapper">
                                <FormWrapper className="modify">
                                    <label>계정주소</label>
                                    <input type="text" className="addr"/>
                                </FormWrapper>
                                <div className="confirm-wrapper">
                                    <Button className="confirm" onClick={addWhiteList}>추가</Button>
                                </div>
                            </div>
                        </NFTContentWrapper>
                        : <NFTContentWrapper className="account-auth">
                            <span>권한 없음</span>
                            <span>관리자에게 문의하세요.</span>
                        </NFTContentWrapper>
                    }
                </div>
                <div className="section">
                    <Title>화이트리스트 제거</Title>
                    <NFTContentWrapper>
                        
                    </NFTContentWrapper>
                </div>
            </WhiteListWrapper>
        </div>
    )
}

export default NftMenu;