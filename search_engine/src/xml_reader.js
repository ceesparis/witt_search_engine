// import { useState } from 'react'

// async function Xml_reader(setDatabase) {
//     return fetch('/database/sample1.xml').then((response) => {
//         response.text().then((xml) => {
//             let xmlContent = xml;
//             let parser = new DOMParser();
//             let xmlDom = parser.parseFromString(xmlContent, 'application/xml');
//             let test = xmlDom.querySelector('text');
//             setDatabase(test);
//         });
//     });
// };

// export default Xml_reader;


async function Xml_reader(setDatabase) {
    return fetch("./Database.json").then((response) => {
        // console.log(response)
        response = JSON.stringify(response)
        return JSON.parse(response);
    }).then(file => {
        console.log(file)
        setDatabase(file)
    })
};

export default Xml_reader;

// async function Xml_reader(setDatabase) {
//     fetch('./database.json').then(response => {
//         console.log(response);
//         return response.json();
//     }).then(data => {
//         // Work with JSON data here
//         console.log(data);
//         setDatabase(data)
//     }).catch(err => {
//         // Do something for an error here
//         console.log("Error Reading data " + err);
//     });
// }
