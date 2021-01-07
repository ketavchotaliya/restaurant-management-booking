import got from 'got';
import { HOST, RESTAURANT } from './config';
const host = HOST().RESTAURANT;

class Restaurant {
  public async getRestaurantDetails(restaurantId: number): Promise<any> {
    try {
      const uri = `${host}${RESTAURANT.GET_RESTAURANT(restaurantId)}`;
      const response = await got(uri, {
        method: 'GET',
        json: true,
        body: {},
      });
      return response.body.payload;
    } catch (error) {
      throw error;
    }
  }
}

export default new Restaurant();
