import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DespesaModule } from './despesa/despesa.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    HttpModule,
    UsersModule,
    // ReceitaModule,
    DespesaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
