import { useState } from 'react'
import App from '../App';

async function Xml_reader(props) {
    // const [database, setDatabase] = useState('');
    return fetch('/database/sample1.xml').then((response) => {
        response.text().then((xml) => {
            let xmlContent = xml;
            let parser = new DOMParser();
            let xmlDom = parser.parseFromString(xmlContent, 'application/xml');
            let test = xmlDom.querySelector('OUP_Bände_16_Ms-114');
            props.setDatabase(test);
            return props.database;
        });
    });
};

export default Xml_reader;
