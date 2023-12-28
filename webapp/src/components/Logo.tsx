import { SkeletonCircle } from "@chakra-ui/react";

export const Logo = ({ logoUrl }: { logoUrl: string }) => {
  return logoUrl ? (
    <img
      style={{
        height: "50px",
        width: "50px",
      }}
      src={logoUrl}
      alt=""
      role="presentation"
    />
  ) : (
    <SkeletonCircle width="50px" height="50px" />
  );
};
