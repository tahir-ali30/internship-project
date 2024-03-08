import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { sellerGetAllProductsRoute } from '../../../api/routes';
import { Link } from 'react-router-dom';
import { getData } from '../../../hooks/useAxiosWithAuth';

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
    const [product, setProduct] = useState([]);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        toast.promise(getData(sellerGetAllProductsRoute).then(data => setProduct(data.product)), {
            pending: 'Loading Products',
            success: 'Prodcuts Loaded'
        })
    }, []);

    const table = useReactTable({
        data: product,
        columns: cols,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting,
        },
        onSortingChange: setSorting,
    });

    return (
        <main className='bg-white rounded-md mx-10 mt-20'>
            <div className='flex justify-between items-center border-b pb-5 p-4'>
                <h1>Product</h1>
                <Link to={'/dashboard/seller/products/add'} className='py-2 px-3 bg-[#1E3769] text-white rounded-md'>Add</Link>
            </div>

            <div >
                <table className='w-full'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className='p-4 text-start cursor-pointer'>
                                        {header.isPlaceholder ?
                                            null
                                            :
                                            flexRender(header.column.columnDef.header, header.getContext())}
                                        {
                                            {asc: ' ⬆', desc: ' ⬇'}[header.column.getIsSorted(true) ?? null]
                                        }
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className='p-4 text-start'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
  )
}
