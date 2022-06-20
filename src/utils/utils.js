export const adaptToClient = (data) => (data.map((item) => {
  const adaptedItem = Object.assign(
      {},
      item,
      {
        previewImage: item[`preview_image`],
        isFavorite: item[`is_favorite`],
        isPremium: item[`is_premium`],
        maxAdults: item[`max_adults`],
        host: {
          isPro: item[`host`][`is_pro`],
          avatarUrl: item[`host`][`avatar_url`],
          id: item[`host`][`id`],
          name: item[`host`][`name`],
        }
      },
  );
  delete adaptedItem[`preview_image`];
  delete adaptedItem[`is_favorite`];
  delete adaptedItem[`is_premium`];
  delete adaptedItem[`max_adults`];
  return adaptedItem;
}));
