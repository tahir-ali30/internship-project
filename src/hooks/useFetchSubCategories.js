import { useState } from 'react'
import { postData } from '../lib/useAxiosWithAuth';
import { getSubcategory } from '../api/routes';

export default function useFetchSubCategories() {
    const [subCategories, setSubCategories] = useState([]);

    function handleFetch(categoryId){
        postData(getSubcategory, { category_id: categoryId }).then(data => setSubCategories(data.subcategory));
    }

    return { subCategories, fetchSubCategories: handleFetch };
}
