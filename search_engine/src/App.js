import { useEffect, useState } from 'react';
import data from './totalDatabase.json';
import Highlighter from 'react-highlight-words';
import { Checkbox, Slider } from '@mui/material';
import Plot from 'react-plotly.js'


function App() {
  const [finalsearch, setFinalSearch] = useState('');
  const [results, setResults] = useState([]);
  const [database, setDatabase] = useState([]);
  const [result_counts, setCount] = useState(0);
  const [enlarge_result, setEnlarge] = useState(false);
  const [big_res, setBigres] = useState([]);
  const [search, setSearch] = useState('');
  const [year_range, setRange] = useState([1913, 1951]);
  const [strict_search, setStrict] = useState(false);
  const [graph, setGraph] = useState(false);
  const [word_counts, setWordcount] = useState(0);
  const [graph_info, addData] = useState({});
  

  useEffect(() => {
    // import('./Database.json').then(data => setDatabase(data));
    // const data3 = concatinator()
    setDatabase(data);

  }, [])


  const valueText = (value) => {
    return {value};
  }

  const tick = () => {
    setStrict(!strict_search);
  }

  const show_graph = () => {
    setGraph(!graph);
    console.log(graph)
  }

  const handleChange = (event, newValue) => {
    setRange(newValue);
    // handleSearch(event);
  }

  const searchDatabase = (search) => {
    search = search.trim()
    // if (strict_search) {
    //   search = /\b\b/
    // }
    
  const countOccurences = (string, word) => {
      return string.split(word).length - 1;
   }

    var searchword = Object.values({search});
    // console.log(searchword)

    var counter = 0;
    var word_counter = 0;
    var result_list = [];
    if (strict_search) {
      let regex = new RegExp('\\b' + searchword + '(?![üïöë])'+  '\\b', 'g');
      // console.log(regex);
      for (var i in database) {
        const entry = database[i]
        const text = entry.text;
        const year = entry.date.substring(0, 4);
          if ((regex.test(text)) && (year >= year_range[0] && year <= year_range[1])){
            const count = countOccurences(text, regex);
            word_counter += count;
            counter += 1;
            result_list.push(entry);

            if (graph_info[year]){
              graph_info[year] += count;
            } else {
              graph_info[year] = count;
            }
          }
    }
    console.log(graph_info)
    setCount(counter);
    setResults(result_list);
    setFinalSearch(regex);
    setWordcount(word_counter)
    } else {
    for (var j in database) {
      const entry = database[j];
      const text = entry.text;
      const year = entry.date.substring(0, 4);
      if (text.includes(searchword) && (year >= year_range[0] && year <= year_range[1])){
          const count = countOccurences(text, searchword);
          word_counter += count;
          counter += 1;
          result_list.push(entry);
      }
    }
    setWordcount(word_counter)
    setCount(counter);
    setResults(result_list);
    setFinalSearch(search);
  }

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

  if (!enlarge_result && !graph)
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
        <div id='slider'>
          <Slider
          getAriaLabel={() => 'Year range'}
          value={year_range}
          min={1912}
          max={1951}
          onChange={handleChange}
          onChangeCommitted={handleSearch}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          />
        </div>
       
        <p>{result_counts} fragments were found</p>
        <p> search word(s) occurred {word_counts} times in the database</p>
        <Checkbox value="strict search" onClick={tick}/>strict search
        {/* <Checkbox value='show graph' onClick={show_graph}/>graph */}
      </header>
      <div className='Results'>
      <button type='button' onClick={show_graph}> show graph </button>
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
                autoEscape={false}
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
else if (graph){
  return (
    <Plot
    data={[
      {
        x: year_range,
        y: result_counts,
        type: 'scatter',
        mode: 'lines',
        marker: {color: 'red'},
      },
      {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
    ]}
    layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
    />
  )
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
                autoEscape={false}
                textToHighlight={big_res.text}
              />
         
            </div>
    </div>
  

  )
}
}

export default App;
