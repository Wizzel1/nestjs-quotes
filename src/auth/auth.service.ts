import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Adjust path if needed
import * as bcrypt from 'bcrypt'; // For password comparison
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    try {
      const user = await this.usersService.findByUsername(email);
      console.log(user);

      const isValid = await bcrypt.compare(pass, user.password);
      if (!user && !isValid) {
        return null;
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('User not authenticated');
    }
  }

  login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    }; // Customize payload with user data
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
