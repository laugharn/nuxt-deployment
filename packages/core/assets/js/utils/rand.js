export default (length = 12) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (var i = length; i > 0; --i)
        result += characters[Math.floor(Math.random() * characters.length)];

    return result;
};
