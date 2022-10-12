import axios from "axios";
import RSAKey from "./rsa";

export const getPublicKey = async () => {
    let data = await axios.get("/getPublicKey");

    if(data.status !== 200 || data.data.length <= 0)
        return false;

    return data;
}

export const Encrypt = (text, data) => {
    let rsa = new RSAKey();
    rsa.setPublic(data.rsaModulus, data.rsaExponent);

    let pwd = rsa.encrypt(text);

    return pwd;
}