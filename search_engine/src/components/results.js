import Result from './result.js'

const Results = ({results, finalsearch, enlargeResult}) => {
    return (
        <div className='Results'>
          {
            results.map((result) => { 
              return <Result result={result} finalsearch={finalsearch} key={result.name} enlargeResult={enlargeResult}/>
          })
        }
        </div>
    )
}

export default Results