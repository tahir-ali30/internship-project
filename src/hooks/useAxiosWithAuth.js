import axios from "axios";
import { toast } from "react-toastify";

const token = JSON.parse(localStorage.getItem('auth')).token;
// const token = 'eyJpdiI6IitBUno4ZU5LNktTTWczWWdULzFVcEE9PSIsInZhbHVlIjoib3JoZFNoaXJxYzNOZjE1c2syREJsRWFkdzl2d1RWN0dUMGFObzFQNWF1cz0iLCJtYWMiOiJlMTAxYWJiY2ZiMTdhZTNiYTA1YmQ4NzhiNGYxNGU4ZTIyZWM3N2RmMzg1Y2I0MDc0ODNhZGNlYjdkOGYzMzFlIiwidGFnIjoiIn0='

async function getData(url) {
    try {
        const { error, message, data } = (await axios.get(url, { headers: { Authorization: token } })).data;
        if (!error) {
            message && toast.success(message)
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
        const { error, message, data } = (await axios.post(url, payload, { headers: { Authorization: token } })).data;
        if (!error) {
            message && toast.success(message)
            return data;
        } else {
            throw new Error(message);
        }
    } catch (error) {
        return toast.error(error.message);
    }
}

export { getData, postData };