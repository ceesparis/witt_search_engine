const Searchbar = ({setSearch, handleSearch}) => {

    return (
      <form className='Searchbar'>
         <input
         type='search'
         onChange={e => setSearch(e.target.value)}
         //   onSubmit={handleSearch}
         />
      </form>
   )
  }
  export default Searchbar;