"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import Image from "next/image";

export default function SwitchButton() {
  const { handleSwitchProfile, auth } = useAuthContext();

  return (
    <button
      onClick={handleSwitchProfile}
      className='bg-colar py-[6px] px-3 justify-center rounded-[5px] flex items-center h-[56px] flex-shrink-0'>
      <Image
        width={44}
        height={44}
        className={`${auth === "buyer" ? "opacity-100" : "opacity-40 scale-80"}`}
        src={"/icons/profile/activeBuyer.svg"}
        alt='buyer.svg'
      />
      <Image width={17} height={17} src={"/icons/profile/switch.svg"} alt='' />
      <Image
        width={44}
        height={44}
        className={`${auth === "seller" ? "opacity-100" : "opacity-40 scale-80"}`}
        src={"/icons/profile/activeSeller.svg"}
        alt='seller.svg'
      />
    </button>
  );
}
