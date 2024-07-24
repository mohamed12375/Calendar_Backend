export class EventDTO {
    id: number;
    name: string;
    details?: string;
    fromDate: Date;
    toDate: Date;
  
    constructor(id: number, name: string, details: string, fromDate: Date, toDate: Date) {
      this.id = id;
      this.name = name;
      this.details = details;
      this.fromDate = fromDate;
      this.toDate = toDate;
    }
  
    static fromDatabaseObject(dbObject: any): EventDTO {
      return new EventDTO(
        dbObject.id,
        dbObject.name,
        dbObject.details,
        new Date(dbObject.fromDate),
        new Date(dbObject.toDate)
      );
    }
  
    static fromDatabaseArray(dbArray: any[]): EventDTO[] {
      return dbArray.map(EventDTO.fromDatabaseObject);
    }
  }
  