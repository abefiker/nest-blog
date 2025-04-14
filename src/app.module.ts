import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      })
    }),
    BlogModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')

  }
}

// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(greetingMiddleware).forRoutes({ path: 'greeting', method: RequestMethod.GET })
//   }
//   // configure(consumer: MiddlewareConsumer) {
//   //   consumer.apply(cors(),helmet()).forRoutes(BlogController)
//   // }
//  //}
