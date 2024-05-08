interface Props {
	user: User;
	chat: Chat[];
}

interface User {
	name: string;
	phone: string;
}

interface Chat {
	from: string;
	text: string;
}

export class SendChatView {
	static create(props: Props) {
		const { user, chat } = props;
		let bodyChat = "";
		chat.forEach((item) => {
			bodyChat += `<li style="margin-bottom: 6px;" ><strong>${
				item.from === "user" ? "Usuario" : "Asistente"
			}:</strong> ${item.text}</li>\n`;
		});

		return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat de Asistente Virtual</title>
        </head>
        <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Hola, Asesor</h2>
            <p>Una persona desea confirmar una inscripción o solicitar otra información. A continuación, encontrarás informacion y el historial del chat entre el visitante y el asistente virtual:</p>
            <hr>
            <h3>Informacion de contacto</h3>
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Telefono:</strong> ${user.phone}</p>
            <h3>Historial de la conversación:</h3>
            <ul style="list-style-type: none; padding: 0;">
                ${bodyChat}
            </ul>
        </div>
        </body>
        </html>
        `;
	}
}
