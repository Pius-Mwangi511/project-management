// auth/strategy/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy,StrategyOptions } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
      const options: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'default_secret',
      };
      super(options);
    }
  
    async validate(payload: any) {
      return { userId: payload.sub, role: payload.role };
    }
  }
