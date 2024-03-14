import { useState } from "react";
import { getBrand } from "../api/routes";
import { postData } from "../lib/useAxiosWithAuth";

export default function useFetchBrands() {
    const [brands, setBrands] = useState([]);

    function handleFetch(categoryId) {
        postData(getBrand, { category_id: categoryId }).then(data => setBrands(data.brand));
    }

    return { brands, fetchBrands: handleFetch };
}