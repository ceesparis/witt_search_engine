import { useEffect, useState } from 'react';
import Xml_reader from './xml_reader'

function App() {
  const [search, setSearch] = useState('');
  // const [results, setResults] = useState([]);
  const [database, setDatabase] = useState('');
 
  const loadWorks = async () => {
    //  e.preventDefault()
     await Xml_reader(setDatabase);
     console.log(database);
  }

  useEffect(() => {
    loadWorks();
    // console.log('render');
  }, []);

  console.log(database)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (search === ''){
      return;
    }
    else {
      // const test = Xml_reader(setDatabase);
      // console.log(test)
      
    }

  }


  return (
    <div className='Searchengine'>
      <header>
        <h1>Wittgenstein Search Engine</h1>
        <form className='Searchbar' onSubmit={handleSearch}>
            <input
             type='search'
             value={search}
             onChange={e => setSearch(e.target.value)}
             />
        </form>
        <p>Search Results: 0</p>
      </header>
      <div className='Results'>
          <div className='Result'>
            <span className='result_title'>title goes here</span>
            <span className='result_date'>date goes here</span>
            <div className='Result_text'>
              <a href='#'>expand</a>
              <p>
                paragraph
              </p>
              <a href='#'>expand</a>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
