import { Box, Center, Spinner } from "@chakra-ui/react"
export default function Loading(){
    return(
<Center h={'100dvh'} w={'100%'} bg={'grey.100'} position={'relative'} zIndex={999}>
<Spinner/>
</Center>
    )
}