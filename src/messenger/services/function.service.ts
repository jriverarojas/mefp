import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Function } from "../entities/function.entity";
import { Repository } from "typeorm";
import { FunctionCall } from "../entities/functioncall.entity";
import axios from "axios";
import Handlebars from "handlebars";

@Injectable()
export class FunctionService {
    constructor( 
        @InjectRepository(Function)
        private functionRepository: Repository<Function>,
        @InjectRepository(FunctionCall)
        private functionCallRepository: Repository<FunctionCall>) {}

    async execute(functionEntities: Function[], queueItem: any) {
        const { functions, threadId, instance, channel, origin, firedBy, runId } = queueItem;
        for (const f of functionEntities) {
            const functionParams = functions[0].params;
            const params = JSON.parse(functionParams);
            const url = f.sendBodyParams ? f.url : this.replaceUrlParams(f.url, params);

            console.log('URL', url);

            /*const response = await axios({
                method: f.method,
                url,
                headers: f.headers ? JSON.parse(f.headers) : {},
                ...(f.sendBodyParams ? {data: params}: {}),

            });*/
        }
    }

    private replaceUrlParams(url: string, params: object): string {
        const template = Handlebars.compile(url);
        return template(params);
    }
}