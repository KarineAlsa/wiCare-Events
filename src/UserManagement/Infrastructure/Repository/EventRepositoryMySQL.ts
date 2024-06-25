import EventInterface from "../../Domain/Port/EventInterface";
import bcrypt from 'bcrypt';
import query from "../../Database/mysql";
import { connection_pool } from "../../Database/mysql";
import { Event } from "../../Domain/Entity/Event";

export default class EventMySQLRepository implements EventInterface {
  async getEventsByCathegory(cathegory: string): Promise<any> {
    const sql = "SELECT * FROM Events WHERE cathegory = ?";
    const params: any[] = [cathegory];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        return false;
      }
      return result;
    } catch (error) {
      console.error("Error al obtener eventos por categoría:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
  }
}
  async registerEvent(event: Event): Promise<any> {
    const sqlEvent = "INSERT INTO Events (name, description, location, hour , cathegory, date, association_id) VALUES (?,?,?, ?,?,?,?)";

    const paramsEvent: any[] = [event.name, event.description, event.location, event.hour, event.cathegory, event.date, event.association_id];
    
    let connection;

    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();

        const [resultUser]: any = await query(sqlEvent, paramsEvent, connection);

        if (resultUser && resultUser.insertId) {
          await connection.commit();
          return {
            id: resultUser.insertId,
            name: event.name,
            description: event.description,
          };
        }
       
        await connection.rollback();
        return false;
    } catch (error) {
      console.error("Error al registrar evento:", error);
      if (connection) {
        await connection.rollback();
      }
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  async getAllEvents(): Promise<Event[]|any> {
    const sql = "SELECT * FROM Events";
    const params: any[] = [];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        return false;
      }
      return result;
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      return [];
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  async getEventById(id: number): Promise<any> {
    const sql = "SELECT * FROM Events WHERE id = ?";
    const params: any[] = [id];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      return result[0];
    } catch (error) {
      console.error("Error al obtener evento por id:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  async getAllEventsByAssociationId(association_id: number): Promise<Event[]|any> {
    const sql = "SELECT * FROM Events WHERE association_id = ?";
    const params: any[] = [association_id];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        return false;
      }
      return result;
    } catch (error) {
      console.error("Error al obtener eventos por id de asociación:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  
  

  async logout(token: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
