import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'place-form' })
export class FormPlace {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    name!: string

    @Column()
    description?: string

    @Column()
    address!: string
}
