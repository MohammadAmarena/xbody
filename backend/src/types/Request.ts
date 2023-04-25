/* eslint-disable @typescript-eslint/no-namespace */

import { User } from "../models/userModel";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
  }
}

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}


export interface IContact {
  [x: string]: any;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  message: string;
}

export interface IPacket {
  title: string;
  price: string;
  leistungenTitle: string;
  leistungen: string[];
  dauer: {
    package: string;
    price: number;
  }[];
  image: string;
}
