import { Box, Flex, Spacer, Text, Container } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import { baseURL, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Box maxWidth="1000px" margin="auto" p="4">
    {photos && <ImageScrollbar data={photos} />}
    <Box w="full" p="6">
      <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Box paddingRight="3" color="green.400" fontSize="2xl">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="2xl">
            Rs. {millify(price < 100000 ? price : price / 100)}
            {rentFrequency && `/${rentFrequency}`}
          </Text>
        </Flex>
        <Box>
          <Avatar size="xl" src={agency?.logo?.url} />
        </Box>
      </Flex>
      <Flex
        alignItems="center"
        p="2"
        marginTop="4"
        fontSize="2xl"
        justifyContent="space-between"
        w="full"
        color="purple.600"
      >
        <spacer />
        {rooms} <FaBed /> <spacer /> |<spacer /> {baths} <FaBath /> <spacer /> |
        <spacer /> {millify(area)} sqft
        <BsGridFill />
        <spacer />
      </Flex>
    </Box>
    <Box m="6">
      <Text fontSize="lg" marginBottom="2" fontWeight="bold">
        {title}
      </Text>
      <Container lineHeight="2" maxW="full" color="gray.600" flexDirection="row" centerContent>
        {description}
      </Container>
    </Box>
    <Flex
      flexWrap="wrap"
      textTransform="uppercase"
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center"
            w="full"
            p="5"
    >
      <Flex
        justifyContent="space-between"
        w="full"
        borderBottom="1px"
        borderColor="gray.100"
        p="3"
      >
        <Text fontWeight="bold">Type</Text>
        <Text fontWeight="medium">{type}</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        w="full"
        borderBottom="1px"
        borderColor="gray.100"
        p="3"
      >
        <Text fontWeight="bold">Purpose</Text>
        <Text fontWeight="medium">{purpose}</Text>
      </Flex>
      {furnishingStatus && (
        <Flex
          justifyContent="space-between"
          w="full"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text fontWeight="bold">Furnishing Status</Text>
          <Text fontWeight="medium">{furnishingStatus}</Text>
        </Flex>
      )}
    </Flex>
    <Box m="6">
      {amenities.length && (
        <Text fontSize="2xl" fontWeight="black" marginTop="5" marginBottom="3">
          Facilites:
        </Text>
      )}
      <Flex flexWrap="wrap">
        {amenities?.map((item) =>
          item?.amenities?.map((amenity) => (
            <Text
              key={amenity.text}
              fontWeight="bold"
              color="purple.600"
              fontSize="l"
              p="2"
              bg="gray.200"
              m="1"
              borderRadius="5"
            >
              {amenity.text}
            </Text>
          ))
        )}
      </Flex>
    </Box>
  </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseURL}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
