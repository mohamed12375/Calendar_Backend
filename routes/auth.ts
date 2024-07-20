const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const expr = require('express');
const router = expr.Router();
const user_manager = require("../managers/user_manager")
import { UserAlreadyExists } from '../Exceptions/MyExceptions';
import { ValidationException } from '../Exceptions/ValidationException';

// import { UserNotFound } from '../Exceptions/UserNotFound';



router.post('/log-in', async (req: { body: { email: string; password: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; send: (arg0: any) => void; }) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

router.post('/sign-up', async (req: { body: { email: string; password: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): any; new(): any; }; }; send: () => void; }) => {
    const { error } = validate(req.body); 
    console.log(error)
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

module.exports = router; 
