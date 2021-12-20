from bs4 import BeautifulSoup
import re
import pandas as pd
import argparse
import json
import requests
import os 

from xml_scraper2 import xml_to_dict
from requests.models import get_auth_from_url
from helpers import simple_get


XML_URL = 'http://wab.uib.no/cost-a32_xml/'

def get_names(dom):
    names = []
    rows = dom.findAll('a')
    for row in rows: 
        names.append(row.text)
    return names

def get_ms_url(name):
    ms_url = f'http://wab.uib.no/cost-a32_xml/{name}'
    return ms_url

def create_xml(url, name):
    xml = requests.get(url)
    soup = BeautifulSoup(xml.content, 'lxml') 
    soup_string = str(soup)

    with open(f'samples/{name}', 'w') as file:
        file.write(soup_string)

html = simple_get(XML_URL)
dom = BeautifulSoup(html, 'html.parser')
names = get_names(dom)
manuscripts = names[5:19]

for name in manuscripts:
    url = get_ms_url(name)
    create_xml(url, name)

database_dict = {}
counter = 0
for filename in os.listdir('/Users/ceesparis/excerscises-cs50/python_xml/samples'):
    xml_to_dict(filename, database_dict, counter)
    counter = len(database_dict)

j = json.dumps(database_dict)

with open("TotalDatabase.json", "w") as f:
    f.write(j)







