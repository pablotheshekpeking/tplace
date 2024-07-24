"use client";
import Ads from "@/components/Ads";
import Bottom from "@/components/BottomNav";
import Header from "@/components/Header";
import Categories from "@/components/categories";
import Products from "@/components/Products";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading/>
  }

  if (status === "unauthenticated") {
   router.push('/login')
  }
  return (
    
    <Box position={'relative'} pb={'80px'} >
     
<Header/>
<Ads/>
<Categories/>
<Products/>
<Bottom/>

    </Box>
  );
}
