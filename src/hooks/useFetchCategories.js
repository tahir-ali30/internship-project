import { useEffect, useState } from "react";
import { getData } from "../lib/useAxiosWithAuth";

export default function useFetchCategories(url) {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData(url).then(data => {
            setCategories(data.category.flat())
            setIsLoading(false);
        });
    }, []);

    return { categories, isLoading };
}