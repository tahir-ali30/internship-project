import React, { useEffect, useState } from 'react'
import { getData, postData } from '../../../hooks/useAxiosWithAuth';
import { getCategory, sellerGetCategories } from '../../../api/routes';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
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

    function handleSubmit(e) {
        e.preventDefault();
        postData(sellerGetCategories + '/update', { category_ids: selectedCategories });
    }

    useEffect(() => {
        getData(getCategory).then(data => setCategories(data.category));
        getData(sellerGetCategories).then(data => setSelectedCategories(prev => {
            prev = data?.category?.flat()
            const newState = prev?.map((item => item.category_id))
            return newState;
        }));

    }, []);

    return (
      <main className='bg-white rounded-md'>
          <div className='p-4 border-b'>
              <h1>Categories</h1>
          </div>

            <form onSubmit={handleSubmit} className=''>
                <div className='grid grid-cols-4 gap-5 p-4'>
                    {categories.map(({ name, category_id }) => (
                        <div className='space-x-2.5 flex items-center' key={category_id}>
                            <input
                                checked={selectedCategories?.includes(category_id)}
                                type="checkbox"
                                value={category_id}
                                className='size-4'
                                onChange={() => handleChange(category_id)}
                            />
                            <label htmlFor={category_id}>{name}</label>
                        </div>
                    ))}
                </div>
                <button type='submit' className='px-6 py-2 rounded-md bg-[#1E3769] m-5 text-white'>Update</button>
            </form>

    </main>
  )
}
