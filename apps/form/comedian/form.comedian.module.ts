import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormComedianController } from './form.comedian.controller';
import { FormComedian } from './form.comedian.entity';
import { FormComedianService } from './form.comedian.service';

@Module({
    imports: [TypeOrmModule.forFeature([FormComedian])],
    providers: [FormComedianService],
    controllers: [FormComedianController],
})
export class FormComedianModule {}
