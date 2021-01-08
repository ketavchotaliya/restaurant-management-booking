import got from 'got';
import { HOST, RESTAURANT } from './config';
const host = HOST().RESTAURANT;

class Restaurant {
  public async getRestaurantDetails(restaurantIds: number[]): Promise<any> {
    try {
      const uri = `${host}${RESTAURANT.GET_RESTAURANTS}`;
      const response = await got(uri, {
        method: 'POST',
        json: true,
        body: restaurantIds,
      });
      return response.body.payload;
    } catch (error) {
      throw error;
    }
  }
}

export default new Restaurant();
