import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Instance } from "./instance.entity";
import { Thread } from "./thread.entity";
import { InstanceAssistant } from "./instance-assistant.entity";

@Entity()
export class Assistant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()//waapi, web, whatsapp
    active: boolean;

    @Column()//service to call on a new message
    isAutomatic: boolean;

    @Column({type: 'text',  nullable: true})//config for channel actions
    config: string;

    @ManyToMany(() => Thread, thread => thread.assistants)
    @JoinTable()
    threads: Thread[];

    @OneToMany(()=> InstanceAssistant, instanceAssistant => instanceAssistant.assistant)
    instanceAssistants: InstanceAssistant[];


}