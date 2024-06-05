"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, currentUser, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Your accomodation
        </div>
        <div
          onClick={() => setIsOpen((cur) => !cur)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          {currentUser ? (
            <>
              <MenuItem
                onClick={() => router.push("/trips")}
                label="My trips"
              />
              <MenuItem
                onClick={() => router.push("/favourites")}
                label="My favourites"
              />
              <MenuItem
                onClick={() => router.push("/reservations")}
                label="My reservations"
              />
              <MenuItem
                onClick={() => router.push("/properties")}
                label="My properties"
              />
              <MenuItem onClick={rentModal.onOpen} label="PetHouse my house" />
              <hr />
              <MenuItem onClick={() => signOut()} label="Logout" />
            </>
          ) : (
            <>
              <MenuItem onClick={loginModal.onOpen} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Sign up" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default UserMenu;
