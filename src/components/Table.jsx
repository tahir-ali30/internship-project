import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react'

export default function Table({ data, cols }) {
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data: data,
        columns: cols,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting,
        },
        onSortingChange: setSorting,
    });

    return (
        <table className='w-full'>
            <thead>
                {table?.getHeaderGroups()?.map(headerGroup => (
                    <tr key={headerGroup?.id}>
                        {headerGroup?.headers?.map(header => (
                            <th key={header?.id}
                                onClick={header?.column?.getToggleSortingHandler()}
                                className='p-4 text-start cursor-pointer'>
                                {header?.isPlaceholder ?
                                    null
                                    :
                                    flexRender(header?.column?.columnDef?.header, header?.getContext())
                                }
                                {
                                    { asc: ' ⬆', desc: ' ⬇' }[header?.column?.getIsSorted(true) ?? null]
                                }
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table?.getRowModel()?.rows?.map(row => (
                    <tr key={row?.id}>
                        {row?.getVisibleCells()?.map(cell => (
                            <td key={cell?.id} className='p-4 text-start'>
                                {flexRender(cell?.column?.columnDef?.cell, cell?.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
