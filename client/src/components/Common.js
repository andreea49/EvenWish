function checkResponseStatus(res) {
    if(res.status === 200){
        return res
    } else {
        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
    }
}

exports.checkResponseStatus = checkResponseStatus