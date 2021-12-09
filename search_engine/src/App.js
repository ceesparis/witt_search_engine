import { useEffect, useState } from 'react';
import data from './Database.json'
import Highlighter from 'react-highlight-words';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [database, setDatabase] = useState([]);
  const [result_counts, setCount] = useState(0)


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

  if (database.length === 0) {
    return (
      <div>loading...</div>
    )
  }

  return (
    // <Highlighter
    //       highlightClassName="Results"
    //       searchWords={search}
    //       autoEscape={true}
    //       textToHighlight={result.text}
    //       />,
            

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
            const Highlight = ({search}) => (
              <strong className="result_text">{search}</strong>
            );
            return (
              // <Highlighter
              // highlightClassName="Results"
              // searchWords={search}
              // autoEscape={true}
              // textToHighlight={result.text}
              // />,
              <div className='Result' key={i}>
            <span className='result_title'>{result.name}</span>
            <span className='result_date'>{result.date}</span>
            <div className="result_text">
              <a href='#'>expand</a>
              <p id='result_text'>
                {result.text}
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
