from bs4 import BeautifulSoup
import json

def xml_to_dict(xml, database_dict, counter):
    soup = BeautifulSoup(open(f'samples/{xml}'), 'lxml')

    for tag in soup.findAll(part='N'):
        if tag.name == 'ab':
            name = tag['n']
            date = tag['ana']
            i = date.find('date')
            date = date[i:]
            i = date.find('1')
            if date.find('?') == -1:
                date = date[i:i+8]
                date = date[:4] + '-' + date[4:6] + '-' + date[6:]
            else:
                date = date[i:i+19]
                date = date[:4] + '-' + date[4:6] + '? ' + date[10:14] + '-' + date[14:16] + '?'

            text = tag.text
            database_dict[counter] = {"name": name, "date": date, "text": text}
            counter += 1