import Joi from 'joi';

export class CreateEventRequest {
    name: string;
    details?: string;
    fromDate: Date;
    toDate: Date;
  
    constructor(name: string, details: string, fromDate: Date, toDate: Date) {
      this.name = name;
      this.details = details;
      this.fromDate = fromDate;
      this.toDate = toDate;
    }

  static validate(req: CreateEventRequest) {
    const schema = Joi.object({
      name: Joi.string().max(255).required(),
      details: Joi.string().max(255).optional(),
      fromDate: Joi.date().iso().required(),  // .iso() ensures it is a valid ISO 8601 date string
      toDate: Joi.date().iso().greater(Joi.ref('fromDate')).required().messages({
        'date.greater': '"toDate" must be greater than "fromDate"'
      })
        });

    return schema.validate(req, { abortEarly: false });
  }
}
