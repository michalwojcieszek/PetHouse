type IListingParams = {
  userId?: string | null;
};

export default async function getListings({
  userId = null,
}: IListingParams = {}) {
  try {
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma?.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = listings?.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
