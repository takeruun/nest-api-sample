import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

// controller に注入するクラスを providers に追加する
@Module({
  imports: [
    // isGlobal: true で個別のモジュールで ConfigModule を呼び出す必要はなくなるs
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    TodoModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
