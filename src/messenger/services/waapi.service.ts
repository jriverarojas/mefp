import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Instance } from "../entities/instance.entity";
import { Repository } from "typeorm";
import axios from "axios";
import { ThreadService } from "./thread.service";
import { MessageService } from "./message.service";

@Injectable()
export class WaapiService {
    constructor(
        @InjectRepository(Instance) private readonly instanceRepository: Repository<Instance>,
        private readonly threadService: ThreadService,
        private readonly messageService: MessageService,
    ){}

    async execute(config: any, taskPayload:any): Promise<void> {
        if (taskPayload.type === 'out') {
            await this.handleOutgoingMessage(config, taskPayload);
        } else if (taskPayload.type === 'in') {
            console.log('INCOMING!!!!!', taskPayload);
            await this.handleIncommingMessage(config, taskPayload);
        } else {
            throw new Error(`Not implemented`)
        }
    }

    async handleOutgoingMessage(config: any, taskPayload:any): Promise<void> {
        const instance = await this.instanceRepository.findOne({ where: { id: taskPayload.instance }});
        if (!instance) {
            throw new Error(`Instance ID: ${taskPayload.instance} not found`)
        }

        //buscar o crear un thread
        const { thread } = await this.threadService.findOrCreateThread(instance, taskPayload.toFrom);
        const message = await this.messageService.createMessage(thread, taskPayload.message, taskPayload.id, 'outgoing', taskPayload.refId);
        const response = await this.sendMessage(config, instance.externalId, taskPayload.toFrom, taskPayload.message);
    }

    async handleIncommingMessage(config: any, taskPayload:any): Promise<void> {
        const instance = await this.instanceRepository.findOne({ where: { id: taskPayload.instance }});
        const from = taskPayload.data.message.from.split('@')[0];
        if (!instance) {
            throw new Error(`Instance ID: ${taskPayload.instance} not found`)
        }

        //buscar o crear un thread
        const { isNewThread, thread } = await this.threadService.findOrCreateThread(instance, from);

        //getAssistant
        if (isNewThread) {
            console.log('Assign assistant');
        }

        //if no assistant ... no hay un asistente disponible en este moemento...

        //save message

        //call to openai endpoints

        const message = await this.messageService.createMessage(thread, taskPayload.data.message.body, taskPayload.id, 'incoming');
    }

    async sendMessage(config: any, externalId: string, toFrom: string, message: string) {
        return axios.post(
            `${config.sendUrl}${externalId}${config.service}`,
            {
                chatId: `${toFrom}@c.us`,
                message
            },
            {
                headers: { Authorization: `Bearer ${config.apiKey}` },
            }
        )

    }
}