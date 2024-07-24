"use client"
import useUser from '@/app/hooks/useUser'
import { Box, Text, VStack } from '@chakra-ui/react'



function Data() {
  const { user } = useUser();
  return (
    <VStack as="ul" spacing={0} listStyleType="none">
      
        <Box
       
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">Offers Made</Text>
          <Text color={`orange`} fontWeight="bold">
          {user?.offersCount}
          </Text>
        </Box>
        <Box
     
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">Products Created</Text>
          <Text color={`orange`} fontWeight="bold">
            {user?.productsCount}
          </Text>
        </Box>

    </VStack>
  )
}

export default Data
