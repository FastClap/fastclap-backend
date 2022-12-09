import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ComedianForm } from "./comedian/form.comedian.entity";
import { PlaceForm } from "./place/form.place.entity";

@Entity({ name: 'form' })
export class Form {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    projectId!: string;

    @Column()
    categoryId!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    alias?: string;
}
