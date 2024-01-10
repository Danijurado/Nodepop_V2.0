# NodePop

## Para inicializar el proyecto:

```shell
npm install
```

Después puedes instalar los datos iniciales de la base de datos con:

```shell
npm run init-db.js
```

(este proceso te pedira confirmación antes de ejecutarse)

## Para arrancar el proyecto:

* En producción:

```shell
npm run start
```

* En desarrollo, para ver los cambios del código en el momento:

```shell
npm run dev
```
* Usuario y password swagger/API:
* username: admin  password: 1111
  
## Rutas de la Web

* http://localhost:3000

Home, muestra todos los anuncios, a esta URL podremos aplicar filtros y paginación para conseguir distintas listas.

## Rutas de swagger

* http://localhost:3000/api-doc

### Con los filtros: 

* Nombre

* Venta ( siendo un producto a la venta si es 'true' y un producto buscado si es 'false' )

* Precio. Usando la sintaxis X- , -X , X-Y para definir intervalos.

* Tags (pudiendo separar los tags por comas y encontrando todos los anuncios que tengan uno u otro tag).


## Rutas del API

* http://localhost:3000/api

Devuelve un json con todos los anuncios existentes. Sobre esta url podremos aplicar filtros para modificar la búsqueda.

El método y filtros son los mismos explicados con anterioridad en las rutas de la Web.

Mediante POST podemos añadir un nuevo anuncio. 
Con DELETE podremos eliminar un anuncio, introduciendo su ID al final de la ruta, 'http://localhost:3000/api/:id'.
