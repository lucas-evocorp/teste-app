import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DespesaModule } from './despesa/despesa.module';
import { AuthModule } from './auth/auth.module';
import { ReceitaModule } from './receita/receita.module';
import { TotalValueModule } from './totalvalue/totalvalue.module';
import { MulterModule } from '@nestjs/platform-express';
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
      synchronize: false,
    } as TypeOrmModuleOptions),
    HttpModule,
    UsersModule,
    ReceitaModule,
    DespesaModule,
    AuthModule,
    TotalValueModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
