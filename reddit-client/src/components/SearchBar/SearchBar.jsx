import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../features/search/searchSlice";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.term);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter gedrückt");
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for Reddit Posts..."
      value={searchTerm}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className="search-bar"
      data-testid="search-input"
    />
  );
}

export default SearchBar;
