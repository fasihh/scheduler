import '../styles/SearchBar.css';

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="search-container">
            <form onSubmit={ e => e.preventDefault() }>
                <input 
                    type="text"
                    value={ search }
                    onChange={ e => setSearch(e.target.value) }
                    placeholder='Enter keywords to search task by title'
                />
            </form>
            <button onClick={ () => setSearch('') }>Clear</button>
        </div>
    );
}
 
export default SearchBar;