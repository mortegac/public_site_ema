import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      style={{
        height: "81px",
        width: "180px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src="/images/logos/logo.png"
        alt="Energica City"
        width={175}
        height={28}
        priority
      />
    </Link>
  );
};

export default Logo;
