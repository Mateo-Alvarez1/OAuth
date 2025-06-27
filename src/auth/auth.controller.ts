import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GoogleAuthGuard } from "./utils/guards/guards";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  login() {
    return { msg: "GoogleAuth" };
  }

  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  redirect() {
    return {
      msg: "ok",
    };
  }
}
