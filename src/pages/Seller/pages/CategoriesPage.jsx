import { postData } from '../../../lib/useAxiosWithAuth';
import { getCategory, sellerGetCategories } from '../../../api/routes';
import useFetchCategories from '../../../hooks/useFetchCategories';
import useSelectedCategories from '../hooks/useSelectedCategories';
import Loading from '../../../components/Loading';

export default function CategoriesPage() {
    const { categories, isLoading } = useFetchCategories(getCategory);
    const { selectedCategories, handleChange } = useSelectedCategories();

    function handleSubmit(e) {
        e.preventDefault();
        postData(sellerGetCategories + '/update', { category_ids: selectedCategories });
    }

    return (
      <main className='bg-white rounded-md'>
          <div className='p-4 border-b'>
              <h1>Categories</h1>
          </div>

            {isLoading ? <Loading /> :
                <form onSubmit={handleSubmit} className=''>
                    <CategoriesCheckboxes categories={categories} selectedCategories={selectedCategories} handleChange={handleChange} />
                    <button type='submit' className='px-6 py-2 rounded-md bg-[#1E3769] m-5 text-white'>Update</button>
                </form>
            }
        </main>
    )
}

function CategoriesCheckboxes({categories, selectedCategories, handleChange}) {
    return (
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
        </div>)
}