import { useEffect, useState } from "react";
import { sellerGetCategories } from "../../../api/routes";
import { getData } from "../../../lib/useAxiosWithAuth";

export default function useSelectedCategories() {
    const [selectedCategories, setSelectedCategories] = useState([]);

    function handleChange(id) {
        setSelectedCategories((prev) => {
            if (selectedCategories.includes(id)) {
                return prev.filter(categoryId => categoryId !== id);
            } else {
                return [...prev, id];
            }
        })
    }

    useEffect(() => {
        getData(sellerGetCategories).then(data => setSelectedCategories(prev => {
            prev = data?.category?.flat()
            const newState = prev?.map((item => item.category_id))
            return newState;
        }));

    }, []);

    return  { selectedCategories, handleChange };
}