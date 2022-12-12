import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormPlaceController } from './form.place.controller';
import { FormPlace } from './form.place.entity';
import { FormPlaceService } from './form.place.service';

@Module({
    imports: [TypeOrmModule.forFeature([FormPlace])],
    providers: [FormPlaceService],
    controllers: [FormPlaceController],
})
export class FormPlaceModule {}
