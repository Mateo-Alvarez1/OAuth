import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject("AUTH_SERVICE")
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      clientID: String(configService.get<string>("GOOGLE_CLIENT_ID")),
      clientSecret: String(configService.get<string>("GOOGLE_CLIENT_SECRET")),
      callbackURL: "http://localhost:3000/api/auth/google/redirect",
      scope: ["profile", "email"],
    });
  }

  authorizationParams(options: any) {
    return {
      access_type: "offline",
      prompt: "consent",
    };
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(" GoogleStrategy - validate - profile", profile);
    console.log(" GoogleStrategy - validate - refreshToken", refreshToken);
    console.log(" GoogleStrategy - validate - accessToken", accessToken);
    const email = profile.emails?.[0]?.value;

    if (!email) {
      throw new Error("Email not found in Google profile");
    }

    const user = await this.authService.validateUser({
      email,
      fullname: profile.displayName,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    return user! || null;
  }
}
