import { useEffect, useState } from 'react';
import data from './Database.json'
import Highlighter from 'react-highlight-words';

function App() {
  const [finalsearch, setFinalSearch] = useState('');
  const [results, setResults] = useState([]);
  const [database, setDatabase] = useState([]);
  const [result_counts, setCount] = useState(0)
  const [enlarge_result, setEnlarge] = useState(false)
  const [big_res, setBigres] = useState([])
  const [search, setSearch] = useState('');

  useEffect(() => {
    // import('./Database.json').then(data => setDatabase(data));
    setDatabase(data)
  }, [])

  const searchDatabase = (search) => {
    const searchword = Object.values({search});
    var counter = 0;
    var result_list = [];
    for (var i in database) {
      const entry = database[i]
      const text = entry.text;
      if (text.includes(searchword)){
          counter += 1;
          result_list.push(entry)
      }
    }
    setCount(counter);
    setResults(result_list);
    setFinalSearch(search)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (search === ''){
      return;
    } else {
        searchDatabase(search);
      }
  }

  const enlargeResult = (result) => {
    setEnlarge(true);
    setBigres(result);
  }

  const goBack = () => {
    setEnlarge(false);
  }

  if (database.length === 0) {
    return (
      <div>loading...</div>
    )
  }

  if (!enlarge_result)
  {
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
              <div className='Result' key={i} onClick={() => enlargeResult(result)}>
            <span className='result_title'>{result.name}</span>
            <span className='result_date'>{result.date}</span>
            <div className="result_text">
              <Highlighter
                highlightClassName="result_text"
                searchWords={[finalsearch]}
                autoEscape={true}
                textToHighlight={result.text}
              />
          </div>
        </div>
          )
        })
      }
      </div>
    </div>
  );
}
else {
  return (
    <div className='BigResult'>
            <button id="goback" onClick={goBack}>goback</button>
            <span className='result_title'>{big_res.name}</span>
            <span className='result_date'>{big_res.date}</span>
            <div className="bigresult_text">
  
              <Highlighter
                highlightClassName="bigresult_text"
                searchWords={[finalsearch]}
                autoEscape={true}
                textToHighlight={big_res.text}
              />
         
            </div>
    </div>
  

  )
}
}

export default App;
