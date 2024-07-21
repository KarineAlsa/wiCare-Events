import EventInterface from "../../Domain/Port/EventInterface";
import bcrypt from 'bcrypt';
import query from "../../Database/mysql";
import { connection_pool } from "../../Database/mysql";
import { Event } from "../../Domain/Entity/Event";
import { Event_User } from "../../Domain/Entity/Event_User";

export default class EventMySQLRepository implements EventInterface {
  async markFinishedEvents(date: string): Promise<any> {
    const sql = "UPDATE Events SET finished = true WHERE finished = false AND CONCAT(date, ' ', hour_end) <= ?";
    console.log(date);
    const params: any[] = [date];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      const [result]: any = await query(sql, params, connection);
      if (result.affectedRows > 0) {
        await connection.commit();
        return true;
      }
      await connection.rollback();
      return false;
    } catch (error) {
      console.error("Error al marcar eventos como finalizados:", error);
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
  async getEventsUserFinished(id_volunteer: number): Promise<Event[] | any> {
    const sql = "SELECT * FROM Events e JOIN Events_Users eu ON e.id = eu.event_id WHERE eu.user_id = ? AND e.finished = true";
    const params: any[] = [id_volunteer];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        return false;
      }
      return result;
    } catch (error) {
      console.error("Error al obtener eventos a los que asistió el usuario:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  async getEventsUserComing(id_volunteer:number): Promise<Event[] | any> {
    
    const sql = "SELECT * FROM Events e JOIN Events_Users eu ON e.id = eu.event_id WHERE eu.user_id = ? AND e.finished = false";
    const params: any[] = [id_volunteer];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        return false;
      }
      return result;
    } catch (error) {
      console.error("Error al obtener eventos a los que asistirá el usuario:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  
  async getEventUsersByIdEvent(id: number): Promise<any> {
    const sql = "SELECT user_id FROM Events_Users WHERE event_id = ?";
    const params: any[] = [id];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        return false;
      }
      return result;
    } catch (error) {
      console.error("Error al obtener usuarios por id de evento:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  async registerEventUser(Event_user: Event_User): Promise<any> {
    const sql = "INSERT INTO Events_Users (event_id, user_id) VALUES (?,?)";
    const params: any[] = [Event_user.event_id, Event_user.user_id];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      const [result]: any = await query(sql, params, connection);
      if (result && result.insertId) {
        await connection.commit();
        return {
          id: result.insertId,
          event_id: Event_user.event_id,
          user_id: Event_user.user_id,
        };
      }
      await connection.rollback();
      return false;
    } catch (error) {
      console.error("Error al registrar usuario al evento", error);
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
    const sqlEvent = "INSERT INTO Events (name, description, latitude,longitude, hour_start,hour_end , cathegory, date, association_id, picture) VALUES (?,?,?, ?,?,?,?,?,?,?)";

    const paramsEvent: any[] = [event.name, event.description, event.latitude,event.longitude, event.hour_start,event.hour_end, event.cathegory, event.date, event.association_id, event.picture];
    
    let connection;

    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();

        const [resultEvent]: any = await query(sqlEvent, paramsEvent, connection);

        if (resultEvent && resultEvent.insertId) {
          await connection.commit();
          return {
            id: resultEvent.insertId,
            name: event.name,
            description: event.description,
            location: {
              latitude: event.latitude,
              longitude: event.longitude,
            },
            hour_start: event.hour_start,
            hour_end: event.hour_end,
            cathegory: event.cathegory,
            date: event.date,
            association_id: event.association_id,
            picture: event.picture
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
    const sql = "SELECT * FROM Events WHERE finished = false";
    const params: any[] = [];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        return false;
      }
      const formattedResult = result.map((event: any) => {
        
        return {
          ...event,
          date: new Date(event.date).toISOString().split('T')[0]
        };
      });
      return formattedResult;
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      return false
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
