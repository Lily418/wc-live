import { SkeletonCircle } from "@chakra-ui/react";

export const Logo = ({
  logoUrl,
  size = 50,
}: {
  logoUrl: string;
  size?: number;
}) => {
  return logoUrl ? (
    <img
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      src={logoUrl}
      alt=""
      role="presentation"
    />
  ) : (
    <SkeletonCircle width={`${size}px`} height={`${size}px`} />
  );
};
