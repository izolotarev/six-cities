export const adaptToClient = (data) => {
  const adaptedItem = Object.assign(
      {},
      data,
      {
        previewImage: data[`preview_image`],
        isFavorite: data[`is_favorite`],
        isPremium: data[`is_premium`],
        maxAdults: data[`max_adults`],
        host: {
          isPro: data[`host`][`is_pro`],
          avatarUrl: data[`host`][`avatar_url`],
          id: data[`host`][`id`],
          name: data[`host`][`name`],
        }
      },
  );
  delete adaptedItem[`preview_image`];
  delete adaptedItem[`is_favorite`];
  delete adaptedItem[`is_premium`];
  delete adaptedItem[`max_adults`];

  return adaptedItem;
};

export const adaptReviewsToClient = (data) => {
  const adaptedItem = Object.assign(
      {},
      data,
      {
        user: {
          avatarUrl: data.user[`avatar_url`],
          id: data.user.id,
          isPro: data.user[`is_pro`],
          name: data.user.name,
        },
      },
  );
  delete adaptedItem.user[`avatar_url`];
  delete adaptedItem.user[`is_pro`];
  return adaptedItem;
};
