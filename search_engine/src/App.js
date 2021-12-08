import { useEffect, useState } from 'react';
import data from './Database.json'

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [database, setDatabase] = useState([]);
  const [result_counts, setCount] = useState(0)
 
  // const loadWorks = () => { 
  //   return new Promise((resolve, reject)=> {
  //   setDatabase(data);
  //     if(true){
  //       resolve()
  //     } else {
  //       reject('error: something went wrong')
  //     }
  //   });
  // }

  useEffect(() => {
    // import('./Database.json').then(data => setDatabase(data));
    setDatabase(data)

    // await loadWorks();
    // alert('Database Loaded');
    // console.log(database[0]);
  }, [])

  const searchDatabase = (search) => {
    const searchword = Object.values({search});
    var counter = 0;
    var text_list = [];
    // console.log(searchword);
    for (var i in database) {
      const entry = database[i]
      const text = entry.text;
      // console.log(text);
      if (text.includes(searchword)){
          console.log(text);
          counter += 1;
          text_list.push(text)
      }
    }
    setCount(counter);
    setResults(text_list);
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (search === ''){
      return;
    } else {
        searchDatabase(search);
      }
  }

  if (database.length === 0) {
    return (
      <div>loading...</div>
    )
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
        <p>Search Results: {result_counts}</p>
      </header>
      <div className='Results'>
        {
          results.map((result, i) => {
            return (
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
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
