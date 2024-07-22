// dtos/EventDTO.ts

export class EventDTO {
    id: number;
    name: string;
    details?: string;
    date: Date;
  
    constructor(id: number, name: string, details: string, date: Date) {
      this.id = id;
      this.name = name;
      this.details = details;
      this.date = date;
    }
  
    static fromDatabaseObject(dbObject: any): EventDTO {
      return new EventDTO(
        dbObject.id,
        dbObject.name,
        dbObject.details,
        new Date(dbObject.date)
      );
    }
  
    static fromDatabaseArray(dbArray: any[]): EventDTO[] {
      return dbArray.map(EventDTO.fromDatabaseObject);
    }
  }
  