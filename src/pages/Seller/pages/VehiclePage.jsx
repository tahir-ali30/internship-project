import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../../components/Table'
import { getData } from '../../../lib/useAxiosWithAuth'
import { url } from '../../../api/routes'
import Loading from '../../../components/Loading'

export default function VehiclePage() {
  const cols = [
    {
      header: 'Name',
      accessorKey: 'thumbnail',
      cell: info => <img className='size-12 rounded-full' src={info.getValue() ? `https://viewnshop-stuff.s3.ap-southeast-2.amazonaws.com/uploads/vehicle/thumbnail/${info.getValue()}`: `data:image/png;base64,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`} alt="" />
    },
    {
      header: 'Year',
      accessorKey: 'year'
    },
    {
      header: 'Price',
      accessorKey: 'price'
    },
    {
      header: 'Color',
      accessorKey: 'color'
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
      // accessorKey: 'status'
    },
    {
      header: 'Action',
      cell: info => (
        <div className='flex gap-2'>
          <Link className='p-1 bg-slate-300 text-xs rounded-md'>Private</Link>
          <Link to={`/dashboard/seller/vehicle/${info.row.original.id}/video`} className='p-1 bg-slate-300 text-xs rounded-md'>Video</Link>
          <Link className='p-1 bg-slate-300 text-xs rounded-md'>Files</Link>
          <Link to={`/dashboard/seller/vehicle/${info.row.original.id}/features`} className='p-1 bg-slate-300 text-xs rounded-md'>Features</Link>
        </div>
      )
    },
  ];
  const { vehicles, isLoading } = useVehicles();

  return (
    <main className='bg-white rounded-md mx-10 mt-20'>
      <div className='flex justify-between items-center border-b pb-5 p-4'>
        <h1>Vehicles</h1>
        <Link to={'/dashboard/seller/vehicle/add'} className='py-2 px-3 bg-[#1E3769] text-white rounded-md'>Add</Link>
      </div>

      {isLoading ? <Loading /> :
        <div>
          <Table data={vehicles} cols={cols} />
        </div>
      }
    </main>
  )
}

function useVehicles() {
  const [vehicles, setVehicles] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData(url + 'seller/vehicle/get').then(data => {
      setVehicles(data.vehicle)
      setIsLoading(false)
    });
  }, []);

  return { vehicles, isLoading };
}