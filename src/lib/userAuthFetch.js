export default async function userAuthFetch(route, method, body, token = '') {
    const response = await fetch(`http://192.168.0.110:3000/api/web/user/${route}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(body),
    })
    const data = await response.json();
    return data;
}

export async function resendOTP(token) {

    const response = await fetch(`http://192.168.0.110:3000/api/web/user/otp/resend`, {
        headers: {
            "Authorization": token,
        }
    });

    return (await response.json());
}