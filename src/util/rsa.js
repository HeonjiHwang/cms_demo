import { BigInteger } from "jsbn";
import { SecureRandom } from "jsencrypt/lib/lib/jsbn/rng";

function parseBigInt(str, r){
    return new BigInteger(str, r);
}

function linebrk(s, n){
    let ret = "";
    let i = 0;
    while(i + n < s.length){
        ret += s.substring(i, i+n) + '\n';
        i += n;
    }

    return ret + s.substring(i, s.length);
}

function byte2Hex(b){
    if(b < 0x10)
        return "0" + b.toString(16);
    else
        return b.toString(16);
}

function pkcslpad2(s, n){
    if(n < s.length + 11){
        alert("Message too long for RSA");
        return null;
    }

    let ba =[];
    let i = s.length - 1;

    while(i >= 0 && n > 0){
        let c = s.charCodeAt(i--);
        if(c < 128){
            ba[--n] = c;
        }else if((c > 127) && (c < 2048)){
            ba[--n] = (c & 63) | 128;
            ba[--n] = (c >> 6) | 192;
        }else{
            ba[--n] = (c & 63) | 128;
            ba[--n] = ((c >> 6) & 63) | 128;
            ba[--n] = (c >> 12) | 224;
        }
    }
    ba[--n] = 0;
    let rng = new SecureRandom();
    let x = [];

    while(n > 2){
        x[0] = 0;
        while(x[0] === 0) rng.nextBytes(x);
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;

    return new BigInteger(ba);
}

class RSAKey{
    constructor(){
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null;
    }

    setPublic(N, E){
        if(N != null & E != null && N.length > 0 && E.length > 0){
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
        }else{
            return false;
        }
    }

    doPublic(x){
        return x.modPowInt(this.e, this.n);
    }

    encrypt(text){
        let m = pkcslpad2(text, (this.n.bitLength() + 7) >> 3);
        if(m === null) return null;
        let c = this.doPublic(m);
        if(c === null) return null;
        let h = c.toString(16);
        if((h.length & 1) === 0) return h; 
        else return "0" + h;
    }
}

export default RSAKey;