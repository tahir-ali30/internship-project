import { useEffect, useState } from 'react';
import { sellerGetAllProductsRoute } from '../../../api/routes';
import { Link } from 'react-router-dom';
import { getData } from '../../../lib/useAxiosWithAuth';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';

export default function SellerProducts() {
    const cols = [
        {
            header: 'ID',
            cell: info => info.getValue() ? info.getValue() : '#'
        },
        {
            header: 'Name',
            accessorKey: 'name'
        },
        {
            header: 'Category',
            accessorKey: 'category'
        },
        {
            header: 'SubCategory',
            accessorKey: 'subcategory'
        },
        {
            header: 'Views',
            accessorKey: 'views'
        },
        {
            header: 'Date',
            accessorKey: 'time',
            cell: info => new Date(info.getValue()).toLocaleDateString(),
        },
        {
            header: 'Status',
            // accessorKey: ''
        },
        {
            header: 'Action',
            cell: info => (
                <div className='flex gap-2'>
                    <Link className='p-1 bg-slate-300 text-xs rounded-md'>Private</Link>
                    <Link to={`/dashboard/seller/products/${info.row.original.url}/edit`} className='p-1 bg-slate-300 text-xs rounded-md'>Edit</Link>
                    <Link className='p-1 bg-slate-300 text-xs rounded-md'>Videos</Link>
                    <Link className='p-1 bg-slate-300 text-xs rounded-md'>Multiple Images</Link>
                </div>
            )
        },
    ]
    const { product, isLoading } = useProducts();

    return (
        <main className='bg-white rounded-md mx-10 mt-20'>
            <div className='flex justify-between items-center border-b pb-5 p-4'>
                <h1>Product</h1>
                <Link to={'/dashboard/seller/products/add'} className='py-2 px-3 bg-[#1E3769] text-white rounded-md'>Add</Link>
            </div>

            {isLoading ? <Loading /> :
                <div>
                    <Table data={product} cols={cols} />
                </div>
            }
        </main>
    )
}

function useProducts() {
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData(sellerGetAllProductsRoute).then(data => {
            setProduct(data.product)
            setIsLoading(false);
        })
    }, []);
    return { product, isLoading };
}