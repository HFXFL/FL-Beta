'use client';

import { useEffect, useState } from 'react';
import { Box, keyframes } from "@chakra-ui/react";
import IntroOverlay from '@/components/shared/IntroOverlay';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const introShown = localStorage.getItem('introShown');
    if (!introShown) {
      setShowOverlay(true);
      localStorage.setItem('introShown', 'true');
    }
  }, []);

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };

  return (
    <Box>
      {showOverlay && <IntroOverlay onClose={handleOverlayClose} />}
      <HeroBanner />
      <Box py={20} textAlign="center">
        {/* add stuff */}
      </Box>
    </Box>
  );
}

const HeroBanner = () => {
  return (
    <Box 
      w="100%" 
      h={{ base: "200px", md: "400px" }} 
      bg="gray.200"
      backgroundImage="url('https://res.cloudinary.com/ddyecvz0i/image/upload/v1676485932/FL/thumbnail_100_dhaaki.jpg')" // Replace with your Cloudinary link
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position="relative"
      mt="0"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="white"
        textAlign="center"
        animation={`${fadeIn} 2s ease-in-out`}
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Adding text shadow
      >
        <Box fontSize={{ base: "2xl", md: "6xl" }} fontWeight="bold">
          The Film-Legion Scannan Collection
        </Box>
        <Box fontSize={{ base: "md", md: "xl" }} mt={2}>
          Crowdfund this phenomenal series for a chance to win a prize from 1000 GBP/USD. 
          Solve the cryptic clues hidden deep in these images, own the correct ones to WIN!
        </Box>
      </Box>
    </Box>
  );
};
