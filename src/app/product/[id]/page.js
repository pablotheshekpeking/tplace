"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const fetchProduct = async (id) => {
  // Convert the id to an integer if it's a string
  const integerId = parseInt(id, 10);

  const response = await fetch('/api/products-by-ids', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: integerId }), // Ensure 'id' is correctly passed as an integer
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
};



const ProductList = ({ params }) => {
  const router = useRouter();
  const productId = params?.slug; // Handle potential undefined params

  console.log(params.id);
 

  const { data: product, isFetching, isLoading, isError } = useQuery({
    queryKey: ['product', params.id],
    queryFn: () => fetchProduct(params.id),
    enabled: !!params.id, // Ensure query only runs if productId is defined
  });

  if (isLoading) return <div>Loading product...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  if (!product) return <div>No product found.</div>;

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default ProductList;
