import { useEffect, useState } from 'react';
import data from './Database.json'
import Highlighter from 'react-highlight-words';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [database, setDatabase] = useState([]);
  const [result_counts, setCount] = useState(0)
  const [enlarge_result, setEnlarge] = useState(false)
  const [big_res, setBigres] = useState([])


  useEffect(() => {
    // import('./Database.json').then(data => setDatabase(data));
    setDatabase(data)
  }, [])

  const searchDatabase = (search) => {
    const searchword = Object.values({search});
    var counter = 0;
    var result_list = [];
    // console.log(searchword);
    for (var i in database) {
      const entry = database[i]
      const text = entry.text;
      if (text.includes(searchword)){

          // var high_text = new Mark(text);
          // high_text.mark("Todes");
          // console.log(high_text);
          counter += 1;
          result_list.push(entry)
      }
    }
    setCount(counter);
    setResults(result_list);
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
              {/* <a href='#'>expand</a> */}
              <Highlighter
                highlightClassName="result_text"
                searchWords={[search]}
                autoEscape={true}
                textToHighlight={result.text}
              />
              {/* <a href='#'>expand</a> */}
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
    <div>
    <div className='BigResult'>
            <span className='result_title'>{big_res.name}</span>
            <span className='result_date'>{big_res.date}</span>
            <div className="bigresult_text">
  
              <Highlighter
                highlightClassName="bigresult_text"
                searchWords={[search]}
                autoEscape={true}
                textToHighlight={big_res.text}
              />
         
            </div>
    </div>
    <button onClick={goBack}>goback</button>
    </div>

  )
}
}

export default App;
