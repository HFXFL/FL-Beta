'use client';

import { useEffect, useState } from 'react';
import { MediaRenderer, useReadContract } from 'thirdweb/react';
import { getContractMetadata } from 'thirdweb/extensions/common';
import { Box, Grid, Link as ChakraLink, Text, Spinner, Center, keyframes, useBreakpointValue, Skeleton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import Link from "next/link";
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { collections } from "@/consts/collections";
import { client } from '@/consts/client';
import { contract } from '../../../utils/contracts';

// Define fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Showcase = () => {
  const [isClient, setIsClient] = useState(false);
  const [loadedCollections, setLoadedCollections] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: contractMetadata } = useReadContract(getContractMetadata, {
    contract: contract,
  });

  const handleCollectionLoaded = (index: number) => {
    setLoadedCollections((prev) => [...prev, index]);
  };

  const checkImagesLoaded = (collectionIndex: number) => {
    const totalImages = collections[collectionIndex].links.length;
    let loadedImages = 0;

    const incrementLoadedImages = () => {
      loadedImages += 1;
      if (loadedImages === totalImages) {
        handleCollectionLoaded(collectionIndex);
      }
    };

    collections[collectionIndex].links.forEach((link) => {
      const img = new Image();
      img.src = link;
      img.onload = incrementLoadedImages;
      img.onerror = incrementLoadedImages;
    });
  };

  useEffect(() => {
    collections.forEach((_, index) => checkImagesLoaded(index));
  }, []);

  // Ensure hook is called consistently
  const flexDirection = useBreakpointValue<"row" | "column">({ base: "column", md: "row", lg: "row" });

  if (!isClient) {
    return null; 
  }

  const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Text>Collection is now live!</Text>;
    } else {
      return (
        <Text
          fontSize={["xl", "2xl"]}
          color="#ffffff"
          textAlign="center"
          bg="rgba(0, 0, 0, 0.6)"
          padding="10px"
          borderRadius="10px"
        >
          {days}d {hours}h {minutes}m {seconds}s
        </Text>
      );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      paddingX={["10px", "50px"]}
      paddingTop="50px"
      paddingBottom="50px"
      bg="#1A202C"
      overflowY="auto"
    >
      <Box
        display="flex"
        flexDirection={flexDirection}
        flexWrap="wrap"
        justifyContent="center"
        width="100%"
      >
        {collections.map((collection, collectionIndex) => (
          <Box
            key={collectionIndex}
            marginBottom="40px"
            width={["100%", "520px"]}
            marginRight={["0", "40px"]}
            position="relative"
          >
            {!loadedCollections.includes(collectionIndex) && (
              <Center
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                zIndex="1"
                bg="rgba(26, 32, 44, 0.8)"
                borderRadius="20px"
              >
                <Spinner size="xl" color="white" />
              </Center>
            )}
            <Box
              animation={loadedCollections.includes(collectionIndex) ? `${fadeIn} 1.5s ease-in-out` : ''}
              opacity={loadedCollections.includes(collectionIndex) ? 1 : 0}
            >
              <Text
                fontSize={["xl", "2xl"]}
                color="#ffffff"
                marginBottom="10px"
                textAlign={["center", "left"]}
              >
                {collection.title}
              </Text>
              <Box
                width="100%"
                height={["auto", "520px"]}
                borderRadius="20px"
                border="4px solid #ffffff"
                padding={["5px", "10px"]}
                boxShadow="0 0 20px rgba(85, 255, 0, 0.6)"
              >
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  templateRows="repeat(2, 1fr)"
                  gap={2}
                  width="100%"
                  height="100%"
                >
                  {collection.links.map((link, index) => (
                    <Link href="/marketplace" passHref key={index}>
                      <ChakraLink
                        display="block"
                        width="100%"
                        height="100%"
                        border="2px solid #55ff00"
                        borderRadius="10px"
                        overflow="hidden"
                        _hover={{ transform: "scale(1.05)", transition: "0.3s", zIndex: 1 }}
                        boxShadow="0 0 10px rgba(255, 255, 255, 0.8)"
                      >
                        <Box
                          width="100%"
                          height="100%"
                          position="relative"
                        >
                          <MediaRenderer
                            client={client}
                            src={link}
                            alt={`Media ${index + 1}`}
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                      </ChakraLink>
                    </Link>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Box>
        ))}
        {/* Placeholder for upcoming collection */}
        <Box
          key="coming-soon"
          marginBottom="40px"
          width={["100%", "520px"]}
          marginRight={["0", "40px"]}
          position="relative"
          onClick={onOpen}
          cursor="pointer"
        >
          <Box
            width="100%"
            height={["auto", "520px"]}
            borderRadius="20px"
            border="2px solid rgba(85, 255, 0, 0.2)" // 20% opacity border
            padding={["5px", "10px"]}
            boxShadow="0 0 10px rgba(85, 255, 0, 0.2)" // 20% opacity green glow
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg="rgba(85, 255, 0, 0.1)" // 10% opacity background
          >
            <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(2, 1fr)"
              gap={2}
              width="100%"
              height="100%"
            >
              <Skeleton width="100%" height="100%" />
              <Skeleton width="100%" height="100%" />
              <Skeleton width="100%" height="100%" />
              <Skeleton width="100%" height="100%" />
            </Grid>
            <Box
              position="absolute"
              top="50%"
              transform="translateY(-50%)"
              textAlign="center"
              bg="rgba(0, 0, 0, 0.6)"
              padding="10px"
              borderRadius="10px"
            >
              <Countdown date={Date.now() + 1000 * 60 * 60 * 24 * 7} renderer={renderer} />
            </Box>
          </Box>
        </Box>
      </Box>
      {contractMetadata && (
        <Box>
          <MediaRenderer
            client={client}
            src={contractMetadata.image}
            style={{
              width: '520px',
              height: '520px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get Notified</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Enter your email to get notified when this collection goes live!</Text>
            {/* Add your email input and submit button here */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Showcase;
