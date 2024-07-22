import Joi from 'joi';

export class CreateEventRequest {
  name: string;
  details?: string;
  date: Date;

  constructor(name: string, details: string, date: Date) {
    this.name = name;
    this.details = details;
    this.date = date;
  }

  static validate(req: CreateEventRequest) {
    const schema = Joi.object({
      name: Joi.string().max(255).required(),
      details: Joi.string().max(255).optional(),
      date: Joi.date().iso().required()  // .iso() ensures it is a valid ISO 8601 date string
    });

    return schema.validate(req, { abortEarly: false });
  }
}
