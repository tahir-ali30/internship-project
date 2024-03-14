import React from 'react'
import ProductForm from '../components/ProductForm'
import { postData } from '../../../lib/useAxiosWithAuth';
import { sellerAddProductRoute } from '../../../api/routes';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate()
  async function onSubmit(data) {
    const res = await postData(sellerAddProductRoute, data).data;
    navigate('/dashboard/seller/products')
    console.log(data)
  }

  return (
    <div>
      <ProductForm label={'Add Product'} onSubmit={onSubmit} />
    </div>
  )
}
