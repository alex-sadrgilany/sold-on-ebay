import React from "react"
import { Box, Text, Link } from "@chakra-ui/react"

function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        <Link href="/">Logo</Link>
      </Text>
    </Box>
  )
};

export default Logo;