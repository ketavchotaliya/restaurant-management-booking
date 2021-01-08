import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class Reservation extends Model {
  public reservation_id!: number;
  public user_id!: number;
  public restaurant_id!: number;
  public table_id!: number;
  public reservation_date!: Date;
  public reservation_start_time!: String;
  public reservation_end_time!: String;
  public booking_at!: Date;
  public is_cancelled!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Reservation.init(
  {
    reservation_id: {
      type: DataTypes.BIGINT(),
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: new DataTypes.BIGINT(),
      allowNull: false,
    },
    restaurant_id: {
      type: new DataTypes.BIGINT(),
    },
    table_id: {
      type: new DataTypes.INTEGER(),
    },
    reservation_date: {
      type: new DataTypes.DATE(),
    },
    reservation_start_time: {
      type: new DataTypes.STRING(),
    },
    reservation_end_time: {
      type: new DataTypes.STRING(),
    },
    booking_at: {
      type: new DataTypes.DATE(),
    },
    is_cancelled: {
      type: new DataTypes.TINYINT(),
    },
    created_at: {
      type: new DataTypes.DATE(),
    },
    updated_at: {
      type: new DataTypes.DATE(),
    },
  },
  {
    sequelize,
    tableName: 'reservation',
    timestamps: false,
  }
);

export default Reservation;
