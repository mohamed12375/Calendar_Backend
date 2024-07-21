const Joi = require('joi');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const expr = require('express');
const router = expr.Router();
const user_manager = require("../managers/user_manager")
import { UserAlreadyExists } from '../Exceptions/UserAlreadyExists';
import { ValidationException } from '../Exceptions/ValidationException';

// import { UserNotFound } from '../Exceptions/UserNotFound';



router.post('/log-in', async (req: { body: { email: string; password: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; send: (arg0: any) => void; }) => {
  // Trim and lowercase the email
  req.body.email = req.body.email.toLowerCase().trim();

  const { error } = validate(req.body); 
  if (error) throw new ValidationException(error.details[0].message);

  let user = await user_manager.validateUser( req.body.email, req.body.password );
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = generateAuthToken(user.id);
  res.send({access_token: token});
});

router.post('/sign-up', async (req: { body: { email: string; password: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): any; new(): any; }; }; send: () => void; }) => {
    // Trim and lowercase the email
    req.body.email = req.body.email.toLowerCase().trim();
    
    const { error } = validate(req.body); 
    if (error)  throw new ValidationException(error.details[0].message);
       //return res.status(400).send(error.details[0].message);

    let user = await user_manager.GetUser(req.body.email);

    if (user) {
      throw new UserAlreadyExists();
    }

    await user_manager.createUser(req.body.email, req.body.password);
    res.send();
});

function validate(req: any) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
  });

  return schema.validate(req, { abortEarly: false });
}

const generateAuthToken = function(userId: string) { 
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET,{ //{id} remember this
    expiresIn: 3 * 24 * 60 * 60 //for testing
  });
  return token;
}

module.exports = router; 
