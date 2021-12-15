import Highlighter from 'react-highlight-words';
import enlargeResult from '../App.js'
import React, { useCallback } from 'react'


// const Result = React.memo(({result, finalsearch, enlargeResult}) => {
//   const enlarge = useCallback(() => {
//     enlargeResult(result);
//   }, [enlargeResult]);

//   return (
//       <div className='Result' key={result.name} onClick={() => enlargeResult(enlarge)}>
//       <span className='result_title'>{result.name}</span>
//       <span className='result_date'>{result.date}</span>
//       <div className="result_text">
//         <Highlighter
//           highlightClassName="result_text"
//           searchWords={[finalsearch]}
//           autoEscape={false}
//           textToHighlight={result.text}
//         />
//       </div>
//       </div>
//           )
//         }
// );
// export default Result 


const Result = ({result, finalsearch, enlargeResult}) => {

  return (
      <div className='Result' key={result.name} onClick={() => enlargeResult(result)}>
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
        }
export default Result 