import { useEffect, useState} from 'react';
import React from 'react';
import data from './totalDatabase.json';
import {Checkbox} from '@mui/material';
import Slider from './components/slider'
import Searchbar from './components/searchbar'
import Results from './components/results';
import Graph from './components/graph'
import BigResult from './components/bigresult'
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
 } from 'react-virtualized'

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
  const cache = React.useRef(new CellMeasurerCache({
    fixedWidth: true, 
    defaultHeight: 200,
  })
  );
 
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
    console.log('on!')
  }

  const handleChange = (event, newValue) => {
    setRange(newValue);
  }

  const countOccurences = (string, word) => {
    return string.split(word).length - 1;
 }

 const disSearch = (search) => {
   const searchwords = (search.trim()).split(' ');
   console.log(searchwords);
   var total_counter = 0;
   var total_word_counter = 0;
   var total_graph = {}
   var total_result_list = [];
   for (var i = 0; i < searchwords.length; i++) {
     const pack = searchDatabase(searchwords[i])
     total_counter += pack.counter;
     total_word_counter += pack.word_counter;
     console.log(total_graph);
     total_result_list = total_result_list.concat(pack.result_list);

   }
  //  for (var j = 0; j < total_result_list.length; j++){
  //    const text_part = total_result_list[j].text
  //   //  console.log(text_part)
  //    var shank = searchwords.every((word) => {
  //       if (text_part.includes(word)) {
  //         return total_result_list[j];
  //       }
  //    })
  //    console.log(shank)

  //  }
   setCount(total_counter);
   setWordcount(total_word_counter);
   setResults(total_result_list);
   setFinalSearch(searchwords);
 }

 const conSearch = (search) => {
  const searchwords = (search.trim()).split(' ');
  console.log(searchwords);
  var total_counter = 0;
  var total_word_counter = 0;
  var total_graph = {}
  var total_result_list = [];
  var case_zero = searchDatabase(searchwords[0])
  var case_zero_results = case_zero.result_list
  var case_casualties = []
  for (var i = 1; i < searchwords.length; i++) {
    const pack = searchDatabase(searchwords[i])
    var pack_results = pack.result_list
    for (var j = 0; j < case_zero_results.length; j++){
      if (!(pack_results.includes(case_zero_results[j]))){
        case_casualties.push(case_zero_results[j])
    } 
  }
}
  const final_case_zero = case_zero_results.filter(n => case_casualties.includes(n))
  console.log(final_case_zero)
  setCount(final_case_zero.length);
  setWordcount(final_case_zero.result_list);
  setResults(total_result_list);
  setFinalSearch(searchwords);
 

}
  const searchDatabase = (search) => {
    var searchword = search.trim()
    var counter = 0;
    var word_counter = 0;
    searchword = Object.values({searchword});
    var graph = {}
    var result_list = [];
    if (strict_search) {
      let regex = new RegExp('\\b' + searchword + '(?![üïöë])'+  '\\b', 'g');
      for (var i in database) {
        const entry = database[i]
        const text = entry.text;
        const year = entry.date.substring(0, 4);
          if ((regex.test(text)) && (year >= year_range[0] && year <= year_range[1])){
            const count = countOccurences(text, regex);
            word_counter += count;
            counter += 1;
            result_list = result_list.concat(entry);

            if (graph[year]) {
              graph[year] += count;
            } else {
              graph[year] = count;
            }
          }
    }
    } else {
    for (var j in database) {
      const entry = database[j];
      const text = entry.text;
      const year = entry.date.substring(0, 4);
      if (text.includes(searchword) && (year >= year_range[0] && year <= year_range[1])){
          const count = countOccurences(text, searchword);
          word_counter += count;
          counter += 1;
          result_list = result_list.concat(entry);

          if (graph[year]){
            graph[year] += count;
          } else {
            graph[year] = count;
          }
      }
    }
  }
    const pack = {graph, word_counter, counter, result_list, searchword}
    return pack;
}

  const handleSearch = async (e) => {
    e.preventDefault()
    if (search === ''){
      return;
    } else {
        disSearch(search);
        // conSearch(search);
        // searchDatabase(search);
      }
  }

  const states = (plot, word_counter, counter, result_list) => {
    addData(plot);
    setWordcount(word_counter);
    setCount(counter);
    setResults(result_list);
    setFinalSearch(search);
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
        <Searchbar setSearch={setSearch}/>
        <button type="button" onClick={handleSearch}> search </button>
        <Slider year_range = {year_range} handleChange = {handleChange}
         handleSearch = {handleSearch} valueText ={valueText}/>
        {result_counts > 0? <div><p>{result_counts} fragments were found</p>
         <p> search word(s) occurred {word_counts} times in the database</p> </div>: null}
        <Checkbox value="strict search" onClick={tick}/>strict search
      </header>
      {result_counts > 0 && !graph ? <button className="graphButton" type="button" onClick={show_graph}> show graph </button>: null}
      {graph ? <div id="graph">
        <Graph graph_info={graph_info} show_graph={show_graph} />
        </div>: null}
      <Results results = {results} finalsearch = {finalsearch} enlargeResult={enlargeResult}/>
    </div>
  );
}
// else if (graph){
//   return (
//     <Graph graph_info = {graph_info}/>
//   )
// }
else {
  return (
    <BigResult big_res={big_res} finalsearch={finalsearch} goBack={goBack}/>
  )
}
}

export default App;