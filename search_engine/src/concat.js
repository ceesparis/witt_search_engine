
const  concatinator = () => {
const data1 = require('./newDatabase.json')
const data2 = require('./Database.json')
const fs = require('fs')

const data3 = {...data1, ...data2};

const datastr = JSON.stringify(data3)



fs.writeFile('totalDatabase.json', datastr, function(err, result) {
    if(err) console.log('error', err);
  });
}

concatinator();

// const newdata = data1.concat(data2)
// newdata = JSON.stringify(newdata)

// fs.writeFile("bigDatabase.json", newdata)
