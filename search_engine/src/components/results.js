import Result from './result.js';
import React, {useRef, useEffect} from 'react';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
 } from 'react-virtualized';


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function areResultsEqual(results1, results2) {
  if (results1.length !== results2.length) {
    return false;
  }

  return results1.every((result, i) => 
    result.name === results2[i].name
  )
}

// if there are new results, refresh CellMeasurerCache to ensure the fragments are well placed
const Results = ({results, finalsearch, enlargeResult}) => {
  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true, 
    defaultHeight: 200,
  })
  );

  const previousResults = usePrevious(results);

  if (previousResults && !areResultsEqual(results, previousResults)) {

    cache.current = new CellMeasurerCache({
      fixedWidth: true, 
      defaultHeight: 200,
    })
  }

    return (
        <div className='Results'>
          <AutoSizer>
            {({width, height}) => 
              <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={results.length}
              rowRenderer={({key, index, style, parent}) =>{
                const result = results[index];
                return (
                  <CellMeasurer
                  key={key}
                  cache={cache.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}>
                  <div style={style}>
                    <Result result={result} finalsearch={finalsearch} key={result.name} enlargeResult={enlargeResult}/>
                  </div>
                  </CellMeasurer>
                )
              }} />
            }
          </AutoSizer>
        </div>
    )
}

export default Results