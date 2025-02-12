'use client';

import { useState } from 'react';
import { Flex, Box, Button, Spacer, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Image } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import { client } from "@/consts/client";

const Navbar = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState('right');

  return (
    <Flex as="nav" bg="gray.800" p="4" alignItems="center" position="sticky" top="0" zIndex="1000">
      <Box display="flex" alignItems="center">
        <Image
          src="https://res.cloudinary.com/ddyecvz0i/image/upload/v1676487528/FL/fllogo_m8xsex.png" 
          alt="Logo"
          boxSize="50px"
          mr={4}
        />
        <Link href="/">
          <Button colorScheme={pathname === "/" ? "purple" : "gray"} variant="ghost">
            Home
          </Button>
        </Link>
        <Link href="/showcase">
          <Button colorScheme={pathname === "/showcase" ? "yellow" : "gray"} variant="ghost">
            Showcase
          </Button>
        </Link>
        <Link href="/comingsoon">
          <Button colorScheme={pathname === "/comingsoon" ? "purple" : "gray"} variant="ghost">
            Coming Soon
          </Button>
        </Link>
        <Link href="/about">
          <Button colorScheme={pathname === "/about" ? "purple" : "gray"} variant="ghost">
            About
          </Button>
        </Link>
      </Box>
      <Spacer />
      <ConnectButton
        client={client}
        appMetadata={{
          name: "My App",
          url: "https://example.com",
        }}
      />
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
        ml={2}
      />
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Link href="/" onClick={onClose}>
              <Button w="100%" variant="ghost" mb={2}>
                Home
              </Button>
            </Link>
            <Link href="/showcase" onClick={onClose}>
              <Button w="100%" variant="ghost" mb={2}>
                Showcase
              </Button>
            </Link>
            <Link href="/comingsoon" onClick={onClose}>
              <Button w="100%" variant="ghost">
                Coming Soon
              </Button>
            </Link>
            <Link href="/about" onClick={onClose}>
              <Button w="100%" variant="ghost">
                About
              </Button>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
