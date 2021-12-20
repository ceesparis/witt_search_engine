import Highlighter from 'react-highlight-words';
import React from 'react'


const Result = ({result, finalsearch, enlargeResult}) => {

  return (
      <div className='Result' key={result.name} onClick={() => enlargeResult(result)}>
      <span className='result_title'>{result.name}</span>
      <span className='result_date'>{result.date}</span>
      <div className="result_text">
        <Highlighter
          highlightClassName="result_text"
          searchWords={finalsearch}
          autoEscape={false}
          textToHighlight={result.text}
        />
      </div>
      </div>
          )
        }
export default Result 