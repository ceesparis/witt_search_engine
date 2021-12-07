import { useState } from 'react'

async function Xml_reader(setDatabase) {
    return fetch('/database/sample1.xml').then((response) => {
        response.text().then((xml) => {
            let xmlContent = xml;
            let parser = new DOMParser();
            let xmlDom = parser.parseFromString(xmlContent, 'application/xml');
            let test = xmlDom.querySelector('text');
            setDatabase(test);
        });
    });
};

export default Xml_reader;
