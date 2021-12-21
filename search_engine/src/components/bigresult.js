import Highlighter from 'react-highlight-words';

const BigResult = ({big_res, finalsearch, goBack}) => {
    return (
        <div className='BigResult'>
          <button id="goback" onClick={goBack}>go back</button>
          <span className='result_title'>{big_res.name}</span>
          <span className='result_date'>{big_res.date}</span>
          <div className="bigresult_text">

            <Highlighter
              highlightClassName="bigresult_text"
              searchWords={finalsearch}
              autoEscape={false}
              textToHighlight={big_res.text}
            />
          </div>
        </div>
    )
}

export default BigResult;