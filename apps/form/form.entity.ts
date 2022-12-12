import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    description?: string;

    @Column()
    alias?: string;
}
