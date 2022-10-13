import { Stack } from "@chakra-ui/react";

export default function Layout({ children, ...props }) {
  return <Stack spacing='64px' margin={'15vw'} marginTop={'auto'} {...props}>{children}</Stack>;
}
