import { useEffect, useState } from "react";

const List = ({ onCategoryClick }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://consulto.onrender.com/categories");
                if (!response.ok) {
                    throw new Error("Failed to fetch Categories");
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCategories();
    }, []);
    console.log(categories)

    return (
        <aside className="categoryList">
            <h3>Departments</h3>
            <ul>
                <li onClick={() => onCategoryClick("")}>All</li>
                {categories.map((item, index) => (
                    <li key={index} onClick={() => onCategoryClick(item.category)}>
                        {item.category}
                    </li>
                ))}
            </ul>
        </aside>

    );
};

export default List;