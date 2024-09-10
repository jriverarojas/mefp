import { Injectable } from "@nestjs/common";
import { Assistant } from "../entities/assistant.entity";

@Injectable()
export class AutomaticService {
    constructor() {}
    async initConversation(assistant: Assistant, channel: string, instanceId: number, message: string): Promise<any> {
        switch(assistant.type) {
            case 'openai':
                console.log('OPEN AI start conversation');
                break;
            default:
                throw new Error(`Service ${assistant.type} not found`) 
        }
        return true;
    }

    async createMessage(assistant: Assistant, channel: string, instanceId: number, threadId: string, message: string): Promise<any> {
        switch(assistant.type) {
            case 'openai':
                console.log('OPEN AI create message');
                break;
            default:
                throw new Error(`Service ${assistant.type} not found`) 
        }
        return true;
    }
}