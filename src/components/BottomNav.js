"use client";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { IoHomeOutline } from "react-icons/io5";

import { IoMdHeartEmpty } from "react-icons/io";
import { useSession, getSession } from "next-auth/react";
import { IoCartOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import Link from "next/link";

export default function Bottom() {
    const { data: session, status } = useSession();

  return (
    <Box
      h={["60px","60px","70px","80px"]}
      w={"full"}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="#fff"
      boxShadow="0 -1px 5px rgba(0, 0, 0, 0.1)"
      zIndex={50000}
    >
      <Box
        w={"full"}
        gap={"10px"}
        justifyContent={"space-around"}
        display={"flex"}
        h={"full"}
        px={"10px"}
      >
         <Link href={'/'}>
        <Box
    
          h={"full"}
          w={"80px"}
          bg={"white"}
          fontSize={["20px","25px","30px","40px"]}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IoHomeOutline />
          <Text fontSize={"15px"}>Home</Text>
        </Box>
        </Link>
        <Link href={ '/wishlist'}>
        <Box
          h={"full"}
          w={"80px"}
          bg={"white"}
          fontSize={["20px","25px","30px","40px"]}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IoMdHeartEmpty />
          <Text fontSize={"15px"}>Wish</Text>
        </Box></Link>
        <Link href={ '/offers'}>
        <Box
          h={"full"}
          w={"80px"}
          bg={"white"}
          fontSize={["20px","25px","30px","40px"]}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IoCartOutline />
          <Text fontSize={"15px"}>Offer</Text>
        </Box>{" "}
        </Link>
        <Link href={session?.user ? '/me' : '/login'}>
     
        <Box
          h={"full"}
          w={"80px"}
          bg={"white"}
          fontSize={["20px","25px","30px","40px"]}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CiUser />
          <Text fontSize={"15px"}>Me</Text>
        </Box>   </Link>
      </Box>
    </Box>
  );
}
