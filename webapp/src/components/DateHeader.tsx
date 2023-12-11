import { Text } from "@chakra-ui/react";

export const DateHeader = (props: { date: string }) => {
  return (
    <div>
      <Text>{props.date}</Text>
    </div>
  );
};
