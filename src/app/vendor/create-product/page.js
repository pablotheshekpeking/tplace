import { Box,Button,Text } from "@chakra-ui/react";
import Create from "./create";
import { IoChevronBackSharp } from "react-icons/io5";
export default function Page(){
    return(
        <Box h={'100vh'} w={'100%'} maxW={'7xl'} m={'auto'} bg={'white'}>
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
<Button
color={'white'}
bg={'none'}
 leftIcon={<IoChevronBackSharp />}
>
    Back
</Button>
<Text mr={'20px'} fontSize={'15px'} fontWeight={'600'}>
    Create Product
</Text>
</Box>

               <Create/>
        </Box>
     
    )
}