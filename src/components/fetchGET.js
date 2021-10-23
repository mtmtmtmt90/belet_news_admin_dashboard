const url = "http://192.168.1.106:6556";


export const get = function(directory) { 
    return fetch(`${url}${directory}`,{
        method: 'GET',
        headers:{
            Authorization: "Bearer " + sessionStorage.getItem('token')
        }
    });
}