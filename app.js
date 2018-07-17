class Converter {
    toHex(rgb) {
        if (!rgb || rgb.length!==3) {
            throw new Error ('Parameter needed');
        }
        const hexed = rgb.reduce((curr, next)=>{
            return curr = curr + next.toString(16);
        },"#");
        return hexed;
    }
};

module.exports = Converter