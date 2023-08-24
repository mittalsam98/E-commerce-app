import React, { Key, useEffect, useState } from 'react';
import ProductCard from '../../components/ui/product-card/ProductCard';
import { getAllProducts } from '../../helpers/api-calls/product';
import { IProductSchema } from 'shared-types/index';
import CircleLoading from '../../components/loading/Loading';

export default function Shop() {
  const [products, setProducts] = useState<IProductSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((res) => {
        setLoading(false);
        setProducts(res.products);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className='px-8 max-w-[80rem] mx-auto sm:my-8 w-full'>
      <h1 className='title my-12'>{'All Products'}</h1>
      {loading ? (
        <CircleLoading showFull={false} />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8'>
          {products.map((product: IProductSchema, index) => {
            return <ProductCard key={product._id.toString()} product={product} />;
          })}
        </div>
      )}
    </div>
  );
}
