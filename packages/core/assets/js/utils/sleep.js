export default duration => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve(0);
        }, duration);
    });
};
