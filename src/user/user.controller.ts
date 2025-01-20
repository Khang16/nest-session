import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/entities/user.entity';

@Controller('user')
@ApiTags('Users')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody(
    {
      type: CreateUserDto,
    }
  )
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ):Promise<Pagination<User>>{
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginate({
      page,
      limit,
    });
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number){
    return this.userService.findOne(id)
  }
  @Put(':id')
  @ApiBody({
    type: UpdateUserDto
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
    return this.userService.update(id, updateUserDto)
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id)
  }
}
