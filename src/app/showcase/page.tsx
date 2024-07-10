'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, Image, Link as ChakraLink, Text } from "@chakra-ui/react";
import Link from "next/link";
import { collections } from "@/consts/collections";

const Showcase = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems={["center", "flex-start"]}
      height="100vh" 
      paddingX={["10px", "50px"]}
      paddingTop="50px"
      paddingBottom="50px"
      bg="#1A202C"
      overflowY="auto"
    >
      {collections.map((collection, collectionIndex) => (
        <Box 
          key={collectionIndex} 
          marginBottom="40px" 
          width={["100%", "520px"]}
        >
          <Text 
            fontSize={["xl", "2xl"]} 
            color="#55ff00" 
            marginBottom="10px"
            textAlign={["center", "left"]}
          >
            {collection.title}
          </Text>
          <Box 
            width="100%" 
            height={["auto", "520px"]}
            borderRadius="20px" 
            border="4px solid #55ff00" 
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
                    <Image
                      src={link}
                      alt={`Placeholder ${index + 1}`}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      borderRadius="10px"
                    />
                  </ChakraLink>
                </Link>
              ))}
            </Grid>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Showcase;
