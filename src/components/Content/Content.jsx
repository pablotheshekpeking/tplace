
"use client";
import { Box, Spinner, Text,Tab, Button, TabList, TabPanel, TabPanels, Tabs, Grid, FormControl, FormLabel, Input, Select, Switch } from "@chakra-ui/react";




import Notifications from "./Notifications";
import useUpdateUser from "@/app/hooks/useUpdateUser";
import { useState } from "react";
import useUser from "@/app/hooks/useUser";

const Content = () => {
  const { user } = useUser();

  const tabs = ["Account Settings", "Notifications"];
  const { updateUser, loading, error } = useUpdateUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
   
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(formData);
  };
  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      style={{ transform: "translateY(-100px)" }}
    >
      <Tabs>
        <TabList px={5}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: "transparent" }}
              _selected={{ color: "brand.dark", borderColor: "brand.blue" }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
          <form onSubmit={handleSubmit}>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
        <FormControl id="firstName">
          <FormLabel>First Name</FormLabel>
          <Input
          required
            focusBorderColor="brand.blue"
            type="text"
            placeholder={user?.firstName}
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="lastName">
          <FormLabel>Last Name</FormLabel>
          <Input
          required
            focusBorderColor="brand.blue"
            type="text"
            placeholder={user?.lastName}
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="phoneNumber">
          <FormLabel>Phone Number</FormLabel>
          <Input
          required
            focusBorderColor="brand.blue"
            type="tel"
            placeholder={user?.phoneNumber}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email Address</FormLabel>
          <Input
        
            focusBorderColor="brand.blue"
            type="email"
            placeholder={user?.email}
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
    
  
        <Button type="submit" isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Update'}
        </Button>
      </Grid>
      {error && <Text color="red.500">{error}</Text>}
    </form>
          </TabPanel>

          <TabPanel>
          <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="notificationEmails"
        mb={0}
        cursor="pointer"
        userSelect="none"
      >
        Receive notification emails
      </FormLabel>
      <Switch id="notificationEmails" />
    </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>


    </Box>
  );
};

export default Content;
