import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class InertiaMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Check if the request comes from Inertia
    res.locals.inertia = req.headers['x-inertia'] === 'true';
    next();
  }
}