import type { UserEntity } from "../../domain";

interface Props {
	code: string;
	user: UserEntity;
}
export class ResetPasswordView {
	static create(props: Props) {
		return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Restablecer contraseña</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .container {
            background-color: white;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
          }
          h1 {
            color: #9E0044;
          }
          h2 {
            color: #9E0044;
            text-align: center;
            font-size: 2rem;
          }
          p {
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Restablecimiento de contraseña</h1>
          <p>Hola ${props.user.getName}.</p>
          <p>Para restablecer tu contraseña, por favor ingresa el siguiente código de verificación en la aplicación:</p>
          <h2>${props.code}</h2>
          <p>Saludos cordiales,<br>
          El equipo de CodeMinds</p>
        </div>
      </body>
    </html>
        `;
	}
}
