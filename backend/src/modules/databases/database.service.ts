import { Injectable } from '@nestjs/common';
import { Connection, createConnection, Model, Schema } from 'mongoose';

@Injectable()
export class DatabaseService {
  private connections: Map<string, Connection> = new Map();

  getConnection(dbName: string): Connection {
    if (this.connections.has(dbName)) {
      return this.connections.get(dbName)!;
    }

    const uri = `mongodb://mongo:27017/${dbName}`;
    const connection = createConnection(uri);
    this.connections.set(dbName, connection);
    return connection;
  }

  getModel<T>(
    dbName: string,
    modelName: string,
    schema: Schema<T>,
    collection: string,
  ): Model<T> {
    const connection = this.getConnection(dbName);
    // if (connection.models[modelName]) {
    //   return connection.models[modelName] as Model<T>;
    // }
    return connection.model<T>(modelName, schema, collection);
  }
}
