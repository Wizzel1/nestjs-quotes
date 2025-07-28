import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UsersModule {}
