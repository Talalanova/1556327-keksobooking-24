const filterAds = (ads) => {
  ads
    .filter((ad) => ad.offer.type === 'flat');
};

export {filterAds};
