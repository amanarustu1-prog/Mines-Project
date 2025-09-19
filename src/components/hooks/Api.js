import axios from "@/interceptors/axios";
import { Aes256Decrypt, Aes256Encrypt } from '../Common/Utility';

const encDecStatus = "false";
var IsEncDec = encDecStatus == 'true' || encDecStatus == true

// Api.js
export const fetchPostData = async (url, postData) => {
    // console.log(url+" "+JSON.stringify(postData));
    var reUseUrl = url;
    var reUseData = postData;
    try {
        const ipAddress = sessionStorage.getItem('IPAddress');
        if (ipAddress) {
            postData.IPAddress = ipAddress;
        }

        if (Object.keys(postData).length !== 0) {
            // console.log(url+" "+JSON.stringify(postData));
            //--------------> New code with EncDec <------------ Don't Remove--------By AM
            if (IsEncDec) {
                const EncPostData = await Aes256Encrypt(JSON.stringify(postData));
                // console.log(EncPostData)
                const DecPostData = { 'EDpostData': EncPostData }
                // console.log(DecPostData)
                const res = await axios.post(url, DecPostData);
                // console.log("Hurray "+ res);
                const EncryptedData = res?.data?.data;
                // console.log(EncryptedData)
                const decryptedData = await Aes256Decrypt(EncryptedData);
                // console.log(decryptedData)
                const TextData = JSON.parse(decryptedData)
                return TextData?.Table
            } else {
                const cleanUrl = url.replace(/^\//, "");
                const res = await axios.post(cleanUrl, postData);

                const TextData = JSON.parse(res?.data?.data);
                return TextData?.Table
            }

        } else {
            // console.log(`${url}-----${postData}`)
            console.log("%c🚀 ~ fetchPostData: " + `${url}-----${postData}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

        }
    } catch (error) {
        if (error?.response?.status === 401) {
            if (Object.keys(reUseData)?.length !== 0) {
                //--------------> New code with EncDec <------------ Don't Remove--------By DK
                const ipAddress = sessionStorage.getItem('IPAddress');
                if (ipAddress) {
                    reUseData.IPAddress = ipAddress;
                }
                if (IsEncDec) {
                    const EncPostData = Aes256Encrypt(JSON.stringify(reUseData));
                    const DecPostData = { 'EDpostData': EncPostData }
                    const res = await axios.post(reUseUrl, DecPostData);
                    const EncryptedData = JSON.parse(res?.data?.data);
                    const decryptedData = await Aes256Decrypt(EncryptedData);
                    const TextData = JSON.parse(decryptedData)
                    return TextData?.Table
                } else {
                    const res = await axios.post(reUseUrl, reUseData);
                    const TextData = JSON.parse(res?.data?.data);
                    return TextData?.Table
                }

            } else {
                // console.log(`${url}-----${postData}`)
                console.log("%c🚀 ~ fetchPostData: " + `${url}-----${postData}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

            }
        }
        if (error.response) {
            // console.log(`${error.response?.request?.responseURL} -- ${error.response?.data?.Message}`);
            console.log("%c🚀 ~ fetchPostData: " + `${error.response?.request?.responseURL} -- ${error.response?.data?.Message}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

        }
        return []
    }
};



// --------ADD Update Delete Data  With API Post Request

export const AddDeleteUpadate = async (url, postData) => {
    if (Object.keys(postData).length !== 0) {
        const ipAddress = sessionStorage.getItem('IPAddress');
        if (ipAddress) {
            postData.IPAddress = ipAddress;
        }
        if (IsEncDec) {
            const EncPostData = Aes256Encrypt(JSON.stringify(postData));
            const DecPostData = { 'EDpostData': EncPostData }
            const res = await axios.post(url, DecPostData);
            if (res.code == "ERR_BAD_REQUEST") {
                return res
            } else {
                const EncryptedData = res.data.data
                const decryptedData = await Aes256Decrypt(EncryptedData);
                return decryptedData;
            }
        } else {
            const res = await axios.post(url, postData);
            if (res.code == "ERR_BAD_REQUEST") {
                return res
            } else {
                return res.data;
            }
        }
    } else {
        // console.log(`${url}-----${postData}`)
        console.log("%c🚀 ~ AddDeleteUpadate: " + `${url}-----${postData}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

    }
}
