import axios from "axios";
import { toast } from "react-toastify";

async function getData(url) {
    try {
        const {error, message, data} = (await axios.get(url)).data;
        if (!error) {
            return data;
        } else {
            throw new Error(message);
        }
    } catch (error) {
        return toast.error(error.message);
    }
}

async function postData(url, payload) {
    try {
        const { error, message, data } = (await axios.post(url, payload)).data;
        if (!error) {
            return data;
        } else {
            throw new Error(message);
        }
    } catch (error) {
        return toast.error(error.message);
    }
}

export { getData, postData };