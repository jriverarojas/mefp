import { Injectable } from "@nestjs/common";
import { Assistant } from "../entities/assistant.entity";
import OpenAI from "openai";

@Injectable()
export class OpenaiAservice {
    private openai: OpenAI;
    constructor() {

    }

    async initConversation(assistant: Assistant, channel: string, instanceId: number, message: string): Promise<any> {
        const configObj = this.getConfigObj(assistant);
        this.initOpenAI(configObj.authorization);
        let res: string;
        const run = await this.openai.beta.threads.createAndRun({
            assistant_id: configObj.assistantId,
            thread: {
              messages: [
                { role: "user", content: message },
              ],
            },
          });
        
        res = await this.waitForResponse(run.thread_id, run.id);
        const response = await this.handleResponse(res, channel, instanceId);


    
    }

    private initOpenAI(authorization: string) {  
        this.openai = new OpenAI({
            apiKey: authorization,
        });
    }

    private getConfigObj(assistant: Assistant): any {
        const configObj = JSON.parse(assistant.config);
        return configObj;
    }

    private async waitForResponse(threadId: string, runId: string): Promise <string> {

        return 'response';

    }

    private async handleResponse(res: string, channel: string, instanceId: number): Promise<any> {
        return {};

    }
}