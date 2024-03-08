import React from 'react'
import ProductForm from '../components/ProductForm'
import { postData } from '../../../hooks/useAxiosWithAuth';
import { sellerAddProductRoute } from '../../../api/routes';

export default function AddProduct() {
  async function onSubmit(data) {
    const {res} = await postData(sellerAddProductRoute, data).data;
    console.log(res);
  }

  return (
    <div>
      <ProductForm label={'Add'} onSubmit={onSubmit} />
    </div>
  )
}
