import React, { useEffect, useState } from 'react';
import ProductImage from '../../components/ui/product-ui/ProductImage';
import ProductDetails from '../../components/ui/product-ui/ProductDetails';
import { IProductSchema } from 'shared-types/index';
import { getProduct } from '../../helpers/api-calls/product';
import { useParams } from 'react-router';

export default function Product() {
  const [productDetails, setProductDetails] = useState<IProductSchema | null>(null);
  const { id } = useParams();

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        setProductDetails(res.product);
      })
      .catch((err) => console.log(err));
  }, []);
  if (productDetails === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className='pt-12 flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto'>
      <ProductImage images={productDetails.images} />
      <ProductDetails productDetails={productDetails} />
    </div>
  );
}
