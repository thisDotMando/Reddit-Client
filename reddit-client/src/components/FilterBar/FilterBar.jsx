import "./FilterBar.css";
import { useState } from "react";

const FILTERS = ["hot", "new", "top"];

function FilterBar() {
    const [activeFilter, setActiveFilter] = useState("hot");

    return (
        <div className="filter-bar">
            {FILTERS.map((filter) => (
                <button
                    key={filter}
                    className={filter === activeFilter? "active" : ""}
                    onClick={() => setActiveFilter(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    )
}
export default FilterBar;