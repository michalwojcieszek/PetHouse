import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const userFavourites = currentUser?.favouriteIds;

    if (!currentUser?.favouriteIds || currentUser.favouriteIds.length === 0) {
      return null;
    }

    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(userFavourites || [])],
        },
      },
    });

    const safeFavourites = favourites.map((favourite) => ({
      ...favourite,
      createdAt: favourite.createdAt.toISOString(),
    }));

    return safeFavourites;
  } catch (error: any) {
    throw new Error(error);
  }
}
