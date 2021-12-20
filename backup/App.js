function App() {
    return (
      <div className='Searchengine'>
        <header>
          <h1>Wittgentein Search Engine</h1>
          <form className='Searchbar'>
              <Input type='search'/>
          </form>
          <p>Search Results: 0</p>
        </header>
        <div className='Results'>
            <div className='Result'>
              <h3 className='result_title'>title goes here</h3>
              <h3 className='result_date'>date goes here</h3>
              <a href='#'>expand</a>
              <p>
                paragraph goes here 
              </p>
              <a href='#'>expand</a>
            </div>
        </div>
      </div>
    );
  }
  
  export default App;
  