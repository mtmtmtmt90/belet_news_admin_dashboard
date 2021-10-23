const url = "http://192.168.1.106:6556";

export const post = (directory, bodyData) => fetch(`${url}${directory}`,{
    method: 'POST',
    headers : { 
         Authorization: "Bearer " + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        
    },
    body: JSON.stringify(bodyData)
});