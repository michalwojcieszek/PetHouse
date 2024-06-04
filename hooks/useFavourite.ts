import getCurrentUser from "@/app/actions/getCurrentUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { SafeUser } from "@/app/types";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

type IUseFavourite = {
  listingId: string;
  currentUser?: SafeUser | null;
};

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    console.log(currentUser);
    return list?.includes(listingId);
  }, [currentUser]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) return loginModal.onOpen();

      try {
        let request;
        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [hasFavourited, listingId, currentUser, loginModal, router]
  );

  return { hasFavourited, toggleFavourite };
};

export default useFavourite;
