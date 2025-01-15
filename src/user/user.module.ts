import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import User Entity vào TypeOrmModule
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Xuất UserService nếu cần dùng ở module khác
})
export class UserModule {}
