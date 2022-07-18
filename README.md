# Final Sistemas de Computación 2 - Aplicación deplegada en Heroku

[`Heroku`](https://https://www.heroku.com/platform/) es una plataforma para desplegar y ejecutar aplicaciones en la nube. Funciona como un SAS (software como servicio) y provee ecosistemas para alojar aplicaciones web basadas en varios lenguajes.

Para el trabajo final utilicé un entorno `nodejs` para una aplicación web constituida por: un backend (`nodejs`) y un frontend (`react`).

`Heroku` se encarga de compilar y construir el código fuente de la aplicación en lo que ellos llaman ***slugs***, estos ***slugs*** son ejecutados en contenedores basados en UNIX llamados ***dynos***.
Los ***dynos*** son manejados automáticamente por la plataforma de `Heroku` con la posibilidad de configurarlos manualmente para su personalización.
`Heroku` permite una alta escalabilidad y disponibilidad. Con posibilidad de escalar cuantas instancias ***dynos*** de nuestra aplicación queremos ejecutar.

Al no tener gran cantidad de tráfico, utilicé 1 sola instancia de la aplicación pudiendo permanecer en la versión gratuita de la plataforma.

## Repositorio de datos
Para la base de datos utilicé [`MongoDB Atlas`](https://www.mongodb.com/es/atlas/database), una solución en la nube alojada y manejada enteramente por `Mongo` pudiendo utilizar su versión gratuita con un límite de peticiones pero con una disponibilidad 24/7.

## Configuraciones necesarias

Además del código fuente de la aplicación y sus dependencias tuve que agregar configuraciones para que `Heroku` pueda interpretar cómo ejecutarla y que funcione correctamente.

| Archivo | Descripción |
| --- | --- |
| `procfile` | En este archivo se especifica el tipo de entorno a utilizar y cómo ejecutar la aplicación. |
| `package.json` | Aquí tuve que agregar el script bajo la clave *heroku-postsbuild* para que el frontend funcione dentro del entorno nodejs de `Heroku`. Básicamente especificamos cómo instalar los archivos estáticos del frontend y dónde se encuentran. Sin esto sólo se levantaría la API del backend. |
| `base de datos` | Para la conexión a la base de datos fue necesario configurar el acceso desde la web de MongoDB Atlas utilizando [SCRAM](https://www.mongodb.com/docs/manual/core/security-scram/) como método de autenticación basado en usuario y contraseña. |

# Final Programación 3 - Backoffice para Gimnasio

Se compone de un módulo de backend y uno de frontend. Los mismos se encuentran desacoplados.

No se utilizan datos locales, la base de datos está alojada en Mongodb Cloud Atlas.

### Levantar el backend:

Parados en el directorio ./backend y ejecutar

`npm update` para descargar dependencias

`nodemon start` para iniciar la aplicación

El backend se inicia en el puerto 5000.\
Abrir [http://localhost:5000/api/gimnasio](http://localhost:5000/api/gimnasio) 

### Levantar el frontend:

Moverse al directorio ./frontend y ejecutar

`npm update` para descargar dependencias

`npm start` para iniciar la aplicación

El frontend se inicia en el puerto 3000.\
Abrir [http://localhost:3000/](http://localhost:3000/) 
