# COVID-19 Stats App


Esta es una aplicación que apartir de un archivo .csv con los datos de las estadisticas del covid, permite visualizar en un gráfico. Además, de responder unas preguntas que se hicieron en el documento de la prueba.

Para el desarrollo de esta prueba se tuvo en cuenta las consideraciones de la misma. El código cuenta con buenas practicas como lo es la comunicación entre componentes a través de servicios, el uso de observables, uso de rxjs, uso de pipes, uso de guards, uso de lazy loading, uso de conventional commits, manejo de JSON-SERVER y localstorage, principios SOLID, entre otros.

Se uso un patrón de diseño para la estructura de carpetas y archivos, el cual es el siguiente: Core, Shared, Features.

## Requisitos previos

Antes de ejecutar la aplicación, asegúrate de tener instalados los siguientes requisitos:

- Node.js (versión 20.5.0): https://nodejs.org/
- Angular CLI (versión 16.1.6json): https://angular.io/cli
- JSON Server (versión 0.17.3): https://www.npmjs.com/package/json-server

## Instalación

Sigue los siguientes pasos para instalar la aplicación:

1. Clona este repositorio en tu máquina local utilizando Git:
2. Navega al directorio del proyecto: cd covid-19 stats app
3. Instala las dependencias del proyecto utilizando npm: npm install
4. Instala JSON Server: npm install -g json-server



## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las variables de entorno y otros detalles específicos de tu proyecto si es necesario.

## Ejecución

Para iniciar la aplicación, ejecuta el siguiente comando: ng serve o npm start
Para iniciar JSON Server, ejecuta el siguiente comando: json-server --watch db.json


La aplicación estará disponible en `http://localhost:4200/`. Abre tu navegador web y navega a esta dirección para ver la aplicación en funcionamiento.

## Uso

Al iniciar la aplicación, se mostrará el login de la misma. Para acceder a la aplicación, utiliza las siguientes credenciales: usuario: usuario1, contraseña: clave1 o usuario: usuario2, contraseña: clave2. 

Luego de iniciar sesión, se mostrará la página donde podrá cargar el archivos .csv con los datos de las estadisticas del covid. (El archivo no se adjunta ya que al ser un repositorio público podrían utilizarlo y tal como se indico en el correo donde se envío la prueba, no se puede compartir el archivo). 

Por último, se mostrará la página donde se podrá visualizar el gráfico y responder las preguntas que se hicieron en el documento de la prueba.



