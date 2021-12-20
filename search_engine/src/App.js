import { useEffect, useState} from 'react';
import React from 'react';
import data from './totalDatabase.json';
import {Checkbox} from '@mui/material';
import Slider from './components/slider'
import Searchbar from './components/searchbar';
import Results from './components/results';
import Graph from './components/graph';
import BigResult from './components/bigresult';

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
  const [conjunct, setCon] = useState(false)
  const [disjunct, setDis] = useState(false)
 
  useEffect(() => {
    setDatabase(data);
  }, [])

  const valueText = (value) => {
    return {value};
  }

  const enlargeResult = (result) => {
    setEnlarge(true);
    setBigres(result);
  }

  const goBack = () => {
    setEnlarge(false);
  }

  const setCon_search = () => {
    setCon(!conjunct);
  }

  const setDis_search = () => {
    setDis(!disjunct);
  }

  const tick = () => {
    setStrict(!strict_search);
  }

  const show_graph = () => {
    setGraph(!graph);
  }

  const handleSearchbar = (event, newValue) => {
    setRange(newValue);
  }

  const countOccurences = (string, word) => {
    return string.split(word).length - 1;
 }

 const handleSearch = async (e) => {
  e.preventDefault();
  if (search === ''){
    return;
  } else if (!(conjunct|disjunct)){
      normSearch(search);
  } else if (conjunct) {
      conSearch(search);
  } else {
      disSearch(search);
  }
}

const normSearch = (search) => {
  const search_case = searchDatabase(search);
  var graph_info = search_case.graph;
  var word_count = search_case.word_counter;
  var result_count = search_case.counter;
  var case_results = search_case.result_list;
  var word = search_case.searchword;
  console.log(graph_info)
  addData(graph_info);
  setWordcount(word_count);
  setCount(result_count);
  setResults(case_results);
  if (strict_search) {
    let regex = new RegExp('\\b' + word + '(?![üïöëä])'+  '\\b', 'g');
    setFinalSearch([regex])
  }
  else {
    setFinalSearch(word);
  }
}

 const disSearch = (search) => {
   const searchwords = (search.trim()).split(' ');
   var total_counter = 0;
   var total_word_counter = 0;
   var total_graph = {};
   var total_result_list = [];
  //  add the search results of each searchword to variables
   for (var i = 0; i < searchwords.length; i++) {
     const pack = searchDatabase(searchwords[i]);
     total_word_counter += pack.word_counter;
     total_result_list = total_result_list.concat(pack.result_list);
     const case_graph = pack.graph;
     total_graph = {...total_graph, ...case_graph};
   }
  //  console.log(total_graph)
   const uniq_results = [...total_result_list.reduce((map, obj) => map.set(obj.name, obj), new Map()).values()];
   total_counter = uniq_results.length;
   addData(total_graph);
   setCount(total_counter);
   setWordcount(total_word_counter);
   setResults(uniq_results);
   setFinalSearch(searchwords);
 }

 const conSearch = (search) => {
  const searchwords = (search.trim()).split(' ');
  var total_counter = 0;
  var total_word_counter = 0;
  var total_graph = {}
  var total_result_list = [];
  var trim_first_search = searchwords[0].trim()
  // get the search results for first search word
  var case_zero = searchDatabase(trim_first_search)
  var case_zero_results = case_zero.result_list
  var blacklist = []
  // if any searchword is not present in a fragment of the search result, put the fragment on the blacklist
  for (var i = 0; i < case_zero_results.length; i++) {
    for (var j = 1; j < searchwords.length; j++){
      const cur_case = case_zero_results[i];
      const cur_case_text = cur_case.text
      if (strict_search) {
        let regex = new RegExp('\\b' + searchwords[j] + '(?![üïöëä])'+  '\\b', 'g');
        if (regex.test(cur_case_text)===false) {
          blacklist.push(cur_case)
          console.log(cur_case)
        }
      }
      const cur_word = searchwords[j];
      if (cur_case_text.includes(cur_word)===false) {
        blacklist.push(cur_case)
      }
    } 
  }
   // remove any blacklisted fragment from the search results of the first word
  const final_case_zero = case_zero_results.filter(n => (blacklist.includes(n)===false))
  total_counter = final_case_zero.length
  total_result_list = final_case_zero
  setCount(total_counter);
  setWordcount(total_word_counter);
  setResults(total_result_list);
  setFinalSearch(searchwords);
}

  const searchDatabase = (search) => {
    // if a word is found in an entry in the database, add this entry to results
    var searchword = search.trim()
    var counter = 0;
    var word_counter = 0;
    searchword = Object.values({searchword});
    var graph = {}
    var result_list = [];
    if (strict_search) {
      let regex = new RegExp('\\b' + searchword + '(?![üïöëä])'+  '\\b', 'g');
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
        <Slider year_range = {year_range} handleChange = {handleSearchbar}
         handleSearch = {handleSearch} valueText ={valueText}/>
        {result_counts > 0? <div><p>{result_counts} fragments were found</p>
         <p> search word(s) occurred {word_counts} times in the database</p> </div>: null}
         <table>
         <tbody>
           <tr>
            <td>
            <Checkbox value="strict search" onClick={tick}/>strict search
            </td>
            <td>
            <Checkbox value="conjunctive search" onClick={setCon_search}/> conjunctive search
            </td>
            <td>
            <Checkbox value="disjunctive search" onClick={setDis_search}/> disjunctive search
            </td>
          </tr>
          </tbody>
        </table>
      </header>
      {result_counts > 0 && (!graph ? <button className="graphButton" type="button" onClick={show_graph}> show graph </button>: <button className="graphButton" type="button" onClick={show_graph}> hide graph </button>)}
      {graph && <div id="graph">
        <Graph graph_info={graph_info} show_graph={show_graph} finalsearch={finalsearch} strict_search={strict_search}/>
        </div>}
      <Results results = {results} finalsearch = {finalsearch} enlargeResult={enlargeResult}/>
    </div>
  );
}

else {
  return (
    <BigResult big_res={big_res} finalsearch={finalsearch} goBack={goBack}/>
  )
}
}

export default App;