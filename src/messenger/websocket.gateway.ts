import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
@WebSocketGateway({
    cors: {
        origin: 'http://localhost:9000',
        credentials: true,
    }
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(/*private jwtService: JwtService*/) {}

    async handleConnection(client: Socket) {
        /*try {
            const token = client.handshake.query.token as string;
            const decoded = this.jwtService.verify(token);
            client.data.user = decoded.sub;
        } catch (err) {
            client.disconnect();
        }*/
        console.log('CONNECTED');
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        
    }
}