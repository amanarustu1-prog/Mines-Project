import { IP_ADDRESS } from "../actionTypes";

export const fetchIpAddress = () => async (dispatch: any) => {
    try {
        const res = await fetch('https://api.ipify.org');
        const data = await res.text();
        if (data) {
            dispatch({ type: IP_ADDRESS, payload: data });
        } else {
            dispatch({ type: IP_ADDRESS, payload: [] });
        }
    } catch (error) {
        console.error('Error fetching IP Address:', error);
    }
};
