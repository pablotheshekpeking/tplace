import { Box,Text } from "@chakra-ui/react";
import Image from "next/image";


export default function Categories() {
  return (
  
      <Box h={'auto'} w={'full'} bg={'gray'} color={'white'} py={'10px'}  >
<Box maxW={'7xl'} m={'auto'}  px={'10px'} display={'flex'} w={'full'} h={'auto'} justifyContent={'space-between'}>
<Text>
    Top Categories
</Text>
<Text>
    See all
</Text>
</Box>
      </Box>
    
  );
}
