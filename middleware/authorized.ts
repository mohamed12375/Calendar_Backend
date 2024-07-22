import { UnauthorizedException } from "../Exceptions/UnauthorizedException";

const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuth = function (req: { header: (arg0: string) => any; user: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }, next: () => void) {
  const token = req.header('Authorization');
  console.log(token)

  if (!token) throw new UnauthorizedException(); //return res.status(401).send('Access denied. No token provided.');

  try {
    console.log(process.env.JWT_SECRET)

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; 
    next();
  }
  catch (ex) {
    console.log(ex)
    throw new UnauthorizedException();
  }
}

module.exports = jwtAuth;