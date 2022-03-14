import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, spacer } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.jpg';

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    baths,
    title,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => (
  <Link href={`/property/${externalID}`} passHref>
    <Flex
      flexWrap="wrap"
      w="420px"
      p="5"
      paddingTop="0"
      cursor="pointer"
      justifyContent="flex-start"
    >
      <Box>
        <Image
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          height={260}
          width={400}
          alt="cover"
        />
      </Box>
      <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              Rs. {millify(price < 100000 ? price : price / 100)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="lg" src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          marginTop="2"
          justifyContent="space-around"
          color="purple.700"
          w="full"
        >
          <spacer />
          {rooms} <FaBed /> <spacer /> |<spacer /> {baths} <FaBath /> <spacer />{' '}
          |
          <spacer /> {millify(area)} sqft
          <BsGridFill />
          <spacer />
        </Flex>
        <Flex justifyContent="center" w="full" alignItems="center" marginTop="2">
          <Text fontSize="lg">
            {title.length > 35 ? `${title.substring(0, 35)}...` : title.toLowerCase()}
          </Text>
        </Flex>
      </Box>
    </Flex>
  </Link>
);

export default Property;
