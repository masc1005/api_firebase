import { AuthClient, authAdmin } from "../config/firebase";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await authAdmin.verifyIdToken(token);
    request.user = decodedToken;
    next();
  } catch (error) {
    response.status(401).json({ message: "Unauthorized" });
  }
};
