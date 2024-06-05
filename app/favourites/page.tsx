import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import getFavouriteListings from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
      </ClientOnly>
    );
  }

  const lisitngs = await getFavouriteListings();
  if (!lisitngs || lisitngs.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites found"
          subtitle="Looks like you have no favourite listings"
        ></EmptyState>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavouritesClient listings={lisitngs} currentUser={currentUser} />
    </ClientOnly>
  );
};
export default ListingPage;
