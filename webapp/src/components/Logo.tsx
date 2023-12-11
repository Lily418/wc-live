import { SkeletonCircle } from "@chakra-ui/react";
import { LogoDocument } from "../types/logo";

export const Logo = ({
  logoUrl,
  logos,
}: {
  logoUrl: string;
  logos: LogoDocument[];
}) => {
  const logo = logos.find((logo) => logo.url === logoUrl);

  return logo?.url ? (
    <img
      style={{
        height: "50px",
        width: "50px",
      }}
      src={logo?.url}
      alt=""
      role="presentation"
    />
  ) : (
    <SkeletonCircle width="50px" height="50px" />
  );
};
