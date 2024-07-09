const validation = (numb) => {
    if (!numb) return 0;
    else return parseInt(numb);
};

module.exports = { validation };