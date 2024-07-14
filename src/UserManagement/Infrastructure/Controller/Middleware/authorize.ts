import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  id: string;
  role: string[];
}

export function authorize(roles: string[]) {
  return function(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user as DecodedToken;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasPermission = roles.some(role => user.role.includes(role));
    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
