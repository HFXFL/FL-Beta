'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, keyframes, Image } from "@chakra-ui/react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/consts/client";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const glitch = keyframes`
  0% { clip: rect(0, 9999px, 0, 0); }
  5% { clip: rect(85px, 9999px, 50px, 0); }
  10% { clip: rect(20px, 9999px, 80px, 0); }
  15% { clip: rect(50px, 9999px, 30px, 0); }
  20% { clip: rect(0, 9999px, 0, 0); }
  25% { clip: rect(30px, 9999px, 60px, 0); }
  30% { clip: rect(80px, 9999px, 40px, 0); }
  35% { clip: rect(40px, 9999px, 70px, 0); }
  40% { clip: rect(60px, 9999px, 20px, 0); }
  45% { clip: rect(0, 9999px, 0, 0); }
  50% { clip: rect(40px, 9999px, 50px, 0); }
  55% { clip: rect(70px, 9999px, 20px, 0); }
  60% { clip: rect(10px, 9999px, 60px, 0); }
  65% { clip: rect(0, 9999px, 0, 0); }
  70% { clip: rect(50px, 9999px, 80px, 0); }
  75% { clip: rect(80px, 9999px, 40px, 0); }
  80% { clip: rect(0, 9999px, 0, 0); }
  85% { clip: rect(60px, 9999px, 20px, 0); }
  90% { clip: rect(30px, 9999px, 70px, 0); }
  95% { clip: rect(20px, 9999px, 10px, 0); }
  100% { clip: rect(0, 9999px, 0, 0); }
`;

const IntroOverlay = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    localStorage.setItem('introShown', 'true');
  }, []);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="2000"
      animation={`${fadeIn} 1s ease-in-out`}
    >
      <Flex direction="column" alignItems="center" textAlign="center" color="white" p={4} zIndex="2001">
        <Image
          src="https://res.cloudinary.com/ddyecvz0i/image/upload/v1676487528/FL/fllogo_m8xsex.png" 
          alt="Logo"
          boxSize={{ base: "100px", md: "150px" }}
          mb={4}
          animation={`${pulse} 2s infinite, ${glitch} 1s infinite`}
        />
        <Text fontSize="3xl" color="#55ff00" mb={4}>
          Welcome to Film-Legion
        </Text>
        <ConnectButton
          client={client}
          appMetadata={{
            name: "My App",
            url: "https://example.com",
          }}
        />
        <Button mt={4} colorScheme="black" color="#ffffff" onClick={onClose}>
          Browse
        </Button>
      </Flex>
    </Box>
  );
};

export default IntroOverlay;
