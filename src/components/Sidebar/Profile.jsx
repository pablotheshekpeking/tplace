"use client";
import { useState, useRef } from 'react'
import {
  Avatar,
  AvatarBadge,
  Badge,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import useUser from '@/app/hooks/useUser';


function Profile() {
  const { user} = useUser();

  return (
    <VStack spacing={3} py={5} borderBottomWidth={1} borderColor="brand.light">
      <Avatar
        size="2xl"
        name={user?.firstName}
        cursor="pointer"
   
       
      >
        <AvatarBadge bg="brand.blue" boxSize="1em">
         
        </AvatarBadge>
      </Avatar>
   
    
      <VStack spacing={1}>
        <Heading as="h3" fontSize="xl" color="brand.dark">
       {user?.firstName}     {user?.lastName}
        </Heading>
        <Text color="brand.gray" fontSize="sm">
       Trader
        </Text>
      </VStack>
    </VStack>
  )
}

export default Profile
