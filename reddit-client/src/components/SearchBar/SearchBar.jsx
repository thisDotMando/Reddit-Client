import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../features/search/searchSlice";
import "./SearchBar.css";

function SearchBar() {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.search.term);

    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value))
    };

    return (
            <input
            type="text"
            placeholder="Search for Reddit Posts..."
            value={searchTerm}
            onChange={handleChange}
            className="search-bar"
            />     
    );
}
export default SearchBar;