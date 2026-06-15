/**
    * Search input component for filtering customers.
**/

const Search = ({ search, setSearch }) => (
    <input
        type="text"
        placeholder="Search by customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
);

export default Search;
