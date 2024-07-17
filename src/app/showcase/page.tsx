'use client';

import { useEffect, useState } from 'react';
import { MediaRenderer, useReadContract } from 'thirdweb/react';

import { getContractMetadata } from 'thirdweb/extensions/common';
import { Box, Grid, Link as ChakraLink, Text } from "@chakra-ui/react";
import Link from "next/link";
import { collections } from "@/consts/collections";
import { client } from '@/consts/client';
import { contract } from '../../../utils/contracts';

const Showcase = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: contractMetadata } = useReadContract(getContractMetadata, {
    contract: contract,
  });

  if (!isClient) {
    return null; 
  }

  return (
    <><MediaRenderer client={client} src="ipfs://QmamvVM5kvsYjQJYs7x8LXKYGFkwtGvuRvqZsuzvpHmQq9/0" />
{/* {"error":"The keys are invalid. Please check the secret-key/clientId and try again.","errorCode":"UNAUTHORIZED"} */}
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
                    <MediaRenderer
                      client={client}
                      src={link}
                      alt={`Media ${index + 1}`}
                      width="100%"
                      height="100%"
                      style={{ borderRadius: "10px" }} />
                  </ChakraLink>
                </Link>
              ))}
            </Grid>
          </Box>
        </Box>
      ))}
      {contractMetadata && (
        <Box>
          <MediaRenderer
            client={client}
            src={contractMetadata.image} />
        </Box>
      )}
    </Box></>
  );
};

export default Showcase;
