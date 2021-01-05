import { Transaction } from 'sequelize';
import { Reservation } from '../schemas';
import { Reservation as ReservationType } from '../types';

class ReservationModel {
  async addOne(
    reservationObj: ReservationType,
    transaction: Transaction | undefined = undefined
  ): Promise<ReservationType> {
    try {
      const insertedObj: ReservationType = await Reservation.create(reservationObj, {
        transaction: transaction ? transaction : undefined,
      });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  async addMany(
    reservationArr: ReservationType[],
    transaction: Transaction | undefined = undefined
  ): Promise<ReservationType[]> {
    try {
      return await Reservation.bulkCreate(reservationArr, { transaction: transaction ? transaction : undefined });
    } catch (error) {
      throw error;
    }
  }

  async getSingle(whereObj: any): Promise<ReservationType | null> {
    try {
      return await Reservation.findOne({
        where: whereObj,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateOne(
    whereObj: {},
    reservationObj: ReservationType,
    transaction: Transaction | undefined = undefined
  ): Promise<any> {
    try {
      await Reservation.update(reservationObj, {
        where: whereObj,
        transaction: transaction ? transaction : undefined,
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  async getTotal(condition: any = {}): Promise<number> {
    try {
      const count: number = await Reservation.count({
        where: condition,
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<ReservationType[]> {
    try {
      return await Reservation.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new ReservationModel();
