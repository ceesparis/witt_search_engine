import data1 from './newDatabase.json';
import data2 from './Database.json';


const fs = require('fs')

const newdata = data1.concat(data2)
newdata = JSON.stringify(newdata)

fs.writeFile("bigDatabase.json", newdata)
