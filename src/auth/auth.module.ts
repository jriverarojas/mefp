import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    ConfigModule
  ],
  providers: [],
  controllers: []
  
})
export class AuthModule {}
