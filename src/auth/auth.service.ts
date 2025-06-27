import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { userDetails } from "./interfaces/UserDetails";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async validateUser(details: userDetails) {
    console.log(" AuthService - details", details);

    const user = await this.userRepository.findOneBy({ email: details.email });

    if (user) {
      return user;
    }

    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
