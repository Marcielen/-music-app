import { Box, Flex, Icon } from "@chakra-ui/react";
import { Menu } from "components/Menu";
import { PlayerMusic } from "components/PlayerMusic";
import { EnumConstRouter } from "constants/enumConstRouter";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Player() {
  const router = useRouter();
  return (
    <Flex
      flexDirection="column"
      color="white"
      justifyContent="space-between"
      pt="7%"
      pl="3%"
    >
      <Flex>
        <Icon
          cursor="pointer"
          onClick={() => router.push(EnumConstRouter.ALL_COLLECTIONS)}
          as={AiOutlineArrowLeft}
        />
      </Flex>
      <PlayerMusic />
    </Flex>
  );
}
