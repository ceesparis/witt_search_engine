
import Result from './result.js'
import React from 'react'
// import cache from '../App.js'
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
 } from 'react-virtualized'
import { defaultRowRenderer } from 'react-virtualized/dist/es/Table'
import { keyframes } from '@mui/styled-engine'
import { height } from '@mui/system'
import App from '../App.js'


const Results = ({results, finalsearch, enlargeResult, cache}) => {
  // const cache = React.useRef(new CellMeasurerCache({
  //   fixedWidth: true, 
  //   defaultHeight: 200,
  // })
  // );
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