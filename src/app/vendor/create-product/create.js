'use client'

import { useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  useToast,
} from '@chakra-ui/react'

// Define initial form data
const initialFormData = {
  title: '',
  description: '',
  price: '',
  mainPhoto: '',
  category: '',
  state: '',
  city: '',
  photos: [],
}

const Form1 = ({ formData, handleChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Product Information
      </Heading>
      <FormControl mb="2%">
        <FormLabel htmlFor="title" fontWeight={'normal'}>
          Title
        </FormLabel>
        <Input
          id="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb="2%">
        <FormLabel htmlFor="description" fontWeight={'normal'}>
          Description
        </FormLabel>
        <Textarea
          id="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb="2%">
        <FormLabel htmlFor="price" fontWeight={'normal'}>
          Price
        </FormLabel>
        <Input
          id="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
      </FormControl>
    </>
  )
}

const Form2 = ({ formData, handleChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Product Details
      </Heading>
      <FormControl mb="2%">
        <FormLabel htmlFor="mainPhoto" fontWeight={'normal'}>
          Main Photo URL
        </FormLabel>
        <Input
          id="mainPhoto"
          placeholder="Main Photo URL"
          value={formData.mainPhoto}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb="2%">
        <FormLabel htmlFor="category" fontWeight={'normal'}>
          Category
        </FormLabel>
        <Input
          id="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb="2%">
        <FormLabel htmlFor="state" fontWeight={'normal'}>
          State
        </FormLabel>
        <Input
          id="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb="2%">
        <FormLabel htmlFor="city" fontWeight={'normal'}>
          City
        </FormLabel>
        <Input
          id="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
      </FormControl>
    </>
  )
}

const Form3 = ({ formData, handleChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Additional Photos
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl mb="2%">
          <FormLabel htmlFor="photos" fontWeight={'normal'}>
            Photos (comma-separated URLs)
          </FormLabel>
          <Textarea
            id="photos"
            placeholder="Photo URLs"
            value={formData.photos}
            onChange={handleChange}
          />
        </FormControl>
      </SimpleGrid>
    </>
  )
}

export default function Create() {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          photos: formData.photos.split(','),
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to create product')
      }
      toast({
        title: 'Product created.',
        description: "We've created your product.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setFormData(initialFormData) // Reset form data after successful submission
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress colorScheme={'orange'} hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
        {step === 1 ? <Form1 formData={formData} handleChange={handleChange} /> : step === 2 ? <Form2 formData={formData} handleChange={handleChange} /> : <Form3 formData={formData} handleChange={handleChange} />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 33.33)
                }}
                isDisabled={step === 1}
         
                colorScheme={'orange'}
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1)
                  setProgress(progress + 33.33)
                }}
                colorScheme={'orange'}
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme={'orange'}
                variant="solid"
                onClick={handleSubmit}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}
