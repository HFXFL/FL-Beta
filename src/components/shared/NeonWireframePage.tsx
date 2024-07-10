'use client';

import { Box, Flex, VStack, HStack, Text } from "@chakra-ui/react";
import { keyframes, css } from "@emotion/react";

const neonGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px #00f6ff, 0 0 20px #00f6ff, 0 0 30px #00f6ff, 0 0 40px #00f6ff, 0 0 50px #00f6ff;
  }
  50% {
    box-shadow: 0 0 10px #00f6ff, 0 0 30px #00f6ff, 0 0 40px #00f6ff, 0 0 50px #00f6ff, 0 0 60px #00f6ff;
  }
`;

const neonStyles = css`
  border: 2px solid #00f6ff;
  border-radius: 5px;
  animation: ${neonGlow} 2s infinite alternate;
`;

const NeonWireframePage = () => {
  return (
    <Box bg="gray.900" color="white" minH="100vh" p={4}>
      <Flex direction="column" height="100%">
        {/* Toolbar */}
        <Box mb={4} p={4} css={neonStyles}>
          <Text fontSize="xl" fontWeight="bold">Toolbar</Text>
        </Box>

        <Flex flex="1">
          {/* Left Sliding Drawer */}
          <VStack flex="1" mr={2} p={4} align="start" css={neonStyles}>
            <Text fontSize="lg">Sliding Drawer</Text>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
            <Text>Item 3</Text>
          </VStack>

          {/* Middle Instagram-like Feed */}
          <VStack flex="2" mx={2} p={4} align="start" css={neonStyles}>
            <Text fontSize="lg">Instagram Feed</Text>
            <Box w="100%" h="200px" bg="gray.800" css={neonStyles} />
            <Box w="100%" h="200px" bg="gray.800" css={neonStyles} />
            <Box w="100%" h="200px" bg="gray.800" css={neonStyles} />
          </VStack>

          {/* Right Discord-like Sidebar */}
          <VStack flex="1" ml={2} p={4} align="start" css={neonStyles}>
            <Text fontSize="lg">Discord Sidebar</Text>
            <Text>Channel 1</Text>
            <Text>Channel 2</Text>
            <Text>Channel 3</Text>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NeonWireframePage;
