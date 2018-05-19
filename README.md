# Emotioner

Aplicacion que permite a través de textos cortos o audios, llevar un control de la evolución de las emociones del usuario.
Genera sugerencias de música para su estado de humor con un set de playlists de Spotify y un hambiente para escucharlas mientras se puede jugar snake.
Los usuarios pueden darle "me gusta" a una playlist para ayudar a los demás a encontrarlas más fácilmente, las playlists con más "me gusta" aparecerán primero.
Además se agrega la funcionalidad de enviar una alerta por correo a alguien referido por el usuario en caso de que este presente varios días con sentimientos de tristeza en sus controles.

## Contiene 
Aplicación de * Meteor * usando * REACT *.
Además se usan diferentes API como la de Watson Tone Analyser, Google Translate, Google Speach-to-Text y Spotify. 
Los correos en nuestro caso son eviados desde una cuenta de Gmail, pero esta puede ser configurada en las variables de entorno.

## Pasos para usar
- Clonar el repositorio
- Instalar meteor
- Usar en /
- Configurar las siguientes variables de entorno
(en windows)
'''

SET IBM_USERNAME=<IBM Username>
SET IBM_PASSWORD=<IBM password>
SET SPFY_CLIENT=<Spotify user>
SET SPFY_SECR=<Spotify secret>
SET MAIL_URL=smtps://user:password@host:port

'''
(cambiar el protocolo -aquí smtps- según el que tenga su proveedor).
Referirse a la documentación de las diferentes API para obtener sus credenciales.
- Correr la aplicación con el siguiente código
```
meteor npm install
meteor
```

## Licencia 
MIT

## Autores
- Tomas F. Venegas Bernal
- Juan M. Lovera Lozano

## Demo
[Emotioner](https://emotioner.herokuapp.com)
