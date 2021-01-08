// Get host details of micro service apps
export const HOST = () => {
  const ENV = process.env.ENV;
  let RESTAURANT: any;
  if (ENV === 'localhost') {
    RESTAURANT = process.env.RESTAURANT_APP_NAME;
  } else {
    RESTAURANT = process.env.RESTAURANT_APP_NAME;
  }
  return {
    RESTAURANT,
  };
};

// SETUP Restaurant Service Routes
export const RESTAURANT = {
  GET_RESTAURANTS: `/private/api/v1/restaurant/getRestaurantDetailsFromIds`,
};
