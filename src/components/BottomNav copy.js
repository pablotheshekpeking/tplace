import { Box } from "@chakra-ui/react";
import Image from "next/image";


export default function Bottom() {
  return (
  
      <Box h={'80px'} w={'full'} 
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="gray.800"
      boxShadow="0 -1px 5px rgba(0, 0, 0, 0.1)"
      zIndex={1000}>

      </Box>
    
  );
}
