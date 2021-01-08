import { Order } from '../../environment';

class ReservationHelper {
  getReservationOrder(sortBy: string, sortOrder: string): Order {
    let orderBy, sortField;
    if (sortBy) {
      if (['reservation_date', 'reservation_start_time', 'reservation_end_time', 'is_cancelled'].includes(sortBy)) {
        orderBy = [[sortBy, sortOrder]];
        sortField = sortBy;
      } else {
        orderBy = [['created_at', sortOrder]];
        sortField = 'created_at';
      }
    } else {
      orderBy = [['created_at', sortOrder]];
      sortField = 'created_at';
    }
    return { orderBy, sortField };
  }

  getReservationFilters(filters: any): object {
    let condition: any = [];
    for (var key in filters) {
      const data: any = filters[key];

      if (key === 'reservation_date') {
        condition.push({
          [key]: new Date(data),
        });
      }
      if (['reservation_start_time', 'reservation_end_time'].includes(key)) {
        condition.push({
          [key]: data,
        });
      }
      if (key === 'is_cancelled') {
        if (+data === 0 || +data === 1) {
          condition.push({
            [key]: data,
          });
        }
      }
    }
    return condition;
  }
}

export default new ReservationHelper();
