import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../errors/ApiError";
import status from "http-status";
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}


const authGuard = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(status.UNAUTHORIZED, "Token is required");
      }
      const verifiedUser = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(status.FORBIDDEN, "You are not authorized to access this route");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default authGuard;
