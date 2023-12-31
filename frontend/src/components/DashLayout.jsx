import React from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashLayout = () => {
  return (
    <Flex maxW={'100vw'} minH={'100vh'}>
      <Sidebar />
      <Flex w={'100%'} maxW={'calc(100% - 220px)'} flexDir={'column'}>
        <Navbar />
        <Flex w={'100%'} h={'100%'}>
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashLayout;
