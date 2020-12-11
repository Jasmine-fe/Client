import { Interface } from 'readline';

export const mobileWidth= 600

// Web test can use localhost, cellphone use IP 
export const webServerURL = "http://localhost:3000"
// export const webServerURL = "http://192.168.43.196:3000"

export const brokerServerURL = "http://192.168.43.196:5000"
export const saltRounds = 10;

export const parseJwt = function (jwtToken) {
    var base64Url = jwtToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}


export const notificationSetting = {
    duration: 2000,
    horizontalPosition: "start",
    verticalPosition: "bottom"
}