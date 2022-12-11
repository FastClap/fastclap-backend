import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'comedian-form' })
export class FormComedian {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column()
    age!: number;

    @Column()
    address!: string;
}
