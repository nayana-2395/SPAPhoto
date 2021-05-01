import { handleResponse } from '@/_helpers';

export const photoService = {
	getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: 
    {
        'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    }
 };
	return fetch(`https://jsonplaceholder.typicode.com/photos`, requestOptions)
	.then(handleResponse);
}
