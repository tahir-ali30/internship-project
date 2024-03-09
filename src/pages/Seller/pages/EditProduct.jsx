import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { sellerGetSingleProductRoute, sellerUpdateProductRoute } from '../../../api/routes';
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm';
import { postData } from '../../../hooks/useAxiosWithAuth';

export default function EditProduct() {
    const { productId } = useParams();
    const [details, setDetails] = useState();
    const navigate = useNavigate();

    async function onSubmit(data) {
        console.log(data);
        const message = await postData(sellerUpdateProductRoute, data);
        navigate('/dashboard/seller/products');
    }

    useEffect(() => {
        postData(sellerGetSingleProductRoute, { url: productId }).then(data => setDetails(data.product[0]));
    }, []);
    // console.log(JSON.stringify(details))

    return (
        <div>
            {details && <ProductForm label={'Edit'} details={details} onSubmit={onSubmit} />}
        </div>
  )
}
