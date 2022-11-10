const fs = require ('fs');



const readData = (file) => {
    const data = fs.readFileSync(`./src/data/${file}`)
    return JSON.parse(data);
};



const saveData = (data, file) => {
    fs.writeFileSync(`./src/data/${file}`, JSON.stringify(data, null, 2), {
        encoding: "UTF-8"
    })
}

module.exports = {
    saveData,
    readData
}