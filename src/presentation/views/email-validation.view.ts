import { UserEntity } from "../../domain";

interface Props {
  code: string,
  user: UserEntity,
}
export class EmailValidationView {

  static create(props: Props) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Verificacion de correo</title>
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
            text-align: center;
          }
          h2 {
            color: #9E0044;
            text-align: center;
            font-size: 2rem;
            margin-top: 30px;
          }
          p {
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>¡Bienvenido!</h1>
          <p>Gracias ${props.user.getName} por unirte a nuestra plataforma. Estamos emocionados de tenerte.</p>
          <p>Para completar tu registro y verificar tu correo electrónico, por favor ingresa el siguiente código de verificación en la aplicación:</p>
    
          <h2>${props.code}</h2>
          
          <p>¡Esperamos que disfrutes de todas las funcionalidades que  tiene para ofrecerte!</p>
          
          <p>Saludos cordiales,<br>
          El equipo de CodeMinds</p>
        </div>
      </body>
    </html>
        `
  }
}