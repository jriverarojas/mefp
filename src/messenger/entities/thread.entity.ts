import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Instance } from "./instance.entity";
import { Message } from "./message.entity";

@Entity()
export class Thread {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    externalInstance: string;

    @Column()
    expirationDate: Date;

    @Column()
    instanceId: number;

    @ManyToOne(() => Instance, instance => instance.threads)
    @JoinColumn({ name: 'instanceId'})
    instance: Instance;

    @OneToMany(() => Message, message => message.thread)
    messages: Message[];
}