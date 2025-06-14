import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, StrategyOptions } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["email", "profile"],
    } as StrategyOptions);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, emails } = profile;
    return {
      email: emails?.[0]?.value,
      googleId: id,
    };
  }
}
