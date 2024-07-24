import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default function Ads() {
  return (
    <Box
    bg={'white'}
    gap={'20px'}
    sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }} display={'flex'} maxWidth={'7xl'} m={'auto'} w={'full'} h={'auto'} p={'20px'} justifyContent={'space-between'} overflowX={'scroll'}
    >
      <Box borderRadius={'10px'} h={["120px","150px","180px","200px"]} minW={'250px'} w={"300px"} bg={"gray"}></Box>
      <Box borderRadius={'10px'} h={["120px","150px","180px","200px"]} minW={'250px'} w={"300px"} bg={"gray"}></Box>
      <Box borderRadius={'10px'} h={["120px","150px","180px","200px"]} minW={'250px'} w={"300px"} bg={"gray"}></Box>
    </Box>
  );
}
