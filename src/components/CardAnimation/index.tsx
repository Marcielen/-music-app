import { Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type CardAnimationProps = {
  itensAnimation: { color: string; icon: IconType; animation: string }[];
};

export const CardAnimation = ({ itensAnimation }: CardAnimationProps) => {
  return (
    <>
      {Array.from(
        {
          length: 2,
        },
        function () {
          return (
            <>
              {itensAnimation.map((animation) => (
                <Flex key={animation.animation} animation={animation.animation}>
                  <Icon
                    w="100%"
                    bottom="20px"
                    color={animation.color}
                    h="25px"
                    as={animation.icon}
                  />
                </Flex>
              ))}
            </>
          );
        }
      )}
    </>
  );
};
