import { User } from "../../src/api/User/entity";

interface Context {
  user: User;
}

declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
  }
}
