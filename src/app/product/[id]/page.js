"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Box, Text, Button } from "@chakra-ui/react";
import { IoChevronBackSharp, IoLocation } from "react-icons/io5";
import Image from "next/image";
import useUser from "@/app/hooks/useUser";
import { FaHeart, FaClock, FaStar } from "react-icons/fa";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import Bottom from "@/components/BottomNav";

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
  const handleBackClick = () => {
    router.back();
  };
  const productId = params?.slug; // Handle potential undefined params
  const { user, loading, error } = useUser();

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
    <Box
      w={'full'}
      h={'auto'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box
        px={'10px'}
        w={'full'}
        h={'50px'}
        bg={'orange'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        color={'white'}
      >
        <Button onClick={handleBackClick} color={'white'} bg={'none'} leftIcon={<IoChevronBackSharp />}>
          Back
        </Button>
        <Text mr={'20px'} fontSize={'15px'} fontWeight={'600'}>
          Offers
        </Text>
      </Box>

      <Box
        w={'full'}
        px={'24px'}
        h={'100vh'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={'24px'}
        pt={'40px'}
      >
        {/** carousel */}
        <Box
          bg={'white'}
          gap={'20px'}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }} display={'flex'} w={'full'} h={'auto'} justifyContent={'space-between'} overflowX={'scroll'}
        >
          <Image src={product.mainPhoto} width={300} height={300} style={{ borderRadius: '12px' }} />
          {product.photos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              width={300}
              height={300}
              alt={`Product photo ${index + 1}`} // Add an alt attribute for accessibility
              style={{ borderRadius: '12px' }}
            />
          ))}
        </Box>

        {/** user name and heart section */}
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          maxWidth={'7xl'}
          w={'full'}
          flexDirection={'column'}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            w={'full'}
          >
            <Box
              h={'auto'}
              width={'45%'}
              display={'flex'}
              flexDirection={'row'}
              p={'12px'}
              justifyContent={'space-between'}
              gap={'5px'}
            >
              <Avatar name='User' w={'32px'} fontSize={'8px'} h={'32px'} borderRadius={'24px'} />
              <Box>
                <Text fontWeight={700} fontSize={'12px'}>
                  {product?.user?.ProductUser || 'Unknown User'}
                </Text>
                <Text fontSize={'8px'}>{product.createdAt}</Text>
              </Box>
            </Box>

            <Box
              h={'inherit'}
              width={'45%'}
              p={'12px'}
              display={'flex'}
              justifyContent={'flex-end'} // Aligns the content horizontally at the end
              alignItems={'center'} // Vertically centers the icon within the box
            >
              <FaHeart fill="orange" />
            </Box>
          </Box>

          <Box
            w={'full'}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'12px'}
            px={'12px'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={'4px'}
              w={'140px'}
            >
              <IoLocation fill="orange" />
              <Text fontWeight={700} fontSize={'10px'}>{product.state || 'Unknown State'}</Text>
            </Box>

            <Box
              w={'140px'}
              display={'flex'}
              alignItems={'center'}
              gap={'8px'}
              justifyContent={'flex-end'}
            >
              <FaClock fill="orange" />
              <Text fontSize={'8px'}>{product.createdAt || 'Unknown Date'}</Text>
            </Box>

            <Box
              w={'140px'}
              display={'flex'}
              alignItems={'center'}
              gap={'4px'}
              justifyContent={'flex-end'}
            >
              <FaStar fill="orange" />
              <Text fontSize={'8px'}>5</Text>
            </Box>
          </Box>
        </Box>

        {/** description */}
        <Box
          w={'full'}
          maxW={'7xl'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Text fontWeight={700} fontSize={'18px'}>Description</Text>
          <Text fontSize={'12px'}>{product.description}</Text>
        </Box>

        {/** map */}
        <Box
          w={'full'}
          maxW={'7xl'}
          display={'flex'}
          flexDirection={'column'}
          gap={'12px'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
          >
            <IoLocation fill="orange" /><Text fontWeight={700} fontSize={'12px'}>Main Location</Text>
          </Box>
          <Box
            w={'full'}
            h={'200px'}
            bg={'grey'}
            borderRadius={'12px'}
          ></Box>
        </Box>

      </Box>
      <Bottom />
    </Box>
  );
};

export default ProductList;
