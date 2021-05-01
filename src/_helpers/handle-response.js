import { authenticationService } from '@/_services';
import { history } from '@/_helpers';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                console.log("401,403")
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api

                
                // alert("going to logout")
                // authenticationService.logout();
                // history.push('/login');
                // location.reload(true);
            }
            else if ([400].indexOf(response.status) !== -1) {
                return data;
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export function handleLoginResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && {"message" : data.message,"status": data.status}) || {"message" : response.statusText,"status": 500};
            return Promise.reject(error);
        }
        return data;
    });
}

export function handleFileResponse(response) {
    return response.text().then(text => {
        if(response.status !== 200){
            const data = text && JSON.parse(text);
            const error = (data && {"message" : data.message,"status": data.status});
                return Promise.reject(error);
        }
        else{
            if (!response.ok) {
                const error = (data && {"message" : response.statusText,"status": response.status});
                return Promise.reject(error);
            }
        }
        return text;
    });
}