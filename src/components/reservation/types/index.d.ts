declare module Reservation {
  export interface Reservation {
    reservation_id?: number;
    user_id?: number;
    restaurant_id?: number;
    table_id?: number;
    reservation_date?: Date;
    reservation_start_time?: String;
    reservation_end_time?: String;
    booking_at?: Date;
    is_cancelled?: number;
    created_at?: Date;
    updated_at?: Date;
  }
}

export = Reservation;
