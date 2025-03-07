# Prueba Técnica - Desarrollador Backend Kubo

Este repositorio contiene la solución a las tareas planteadas en la prueba técnica para desarrollador backend de Kubo. La implementación fue realizada con:

- **Node.js** como entorno de ejecución
- **Prisma** como ORM
- **Express** para la creación de endpoints
- **Supabase** como base de datos relacional
- **Vercel** para el despliegue del servidor

## Contenido del repositorio

### 1. Modelo Relacional y Script de Base de Datos
Puedes encontrar el modelo relacional de la base de datos y el script correspondiente en la carpeta `db`:

- `movies_management_relational_model`
- `movies_management_database`

### 2. Cuestionario
El cuestionario se encuentra en la carpeta `docs` y está disponible en dos formatos:

- `Cuestionario_prueba_tecnica_kubo.pdf`
- `Cuestionario_prueba_tecnica_kubo.md`

Ambos contienen el mismo contenido, permitiendo elegir el formato más conveniente para su lectura.

## Documentación de las APIs

El servidor se encuentra subido en vercel en produccion, puedes verlo en la siguiente url: https://desarrollador-backend-kubo-prueba-tecnica.vercel.app/ 

### Rutas disponibles

| Ruta | Método | Descripción |
| --- | --- | --- |
| `/api/users/with-watched-movies` | GET | Devuelve una lista de usuarios con todas las películas que han visto. |
| `/api/users/create-user` | POST | Crea un nuevo usuario en la base de datos. |
| `/api/movies/mark-watched` | POST | Marca una película como vista por un usuario específico. |
| `/api/movies/movie-list` | GET | Obtiene todas las películas (paginadas y filtradas por categoría). |
| `/api/movies/new` | GET | Obtiene un listado de los últimos estrenos de películas. |
| `/api/movies` | POST | Crea una nueva pelicula en la base de datos. 

---

### Obtener todos los usuarios con sus películas vistas
**Método**: `GET`  
**URL**: `https://desarrollador-backend-kubo-prueba-tecnica.vercel.app/api/users/with-watched-movies`  
**Descripción**: Devuelve una lista de usuarios con todas las películas que han visto.  

**Ejemplo de respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "username": "joel_dev",
    "email": "joel@example.com",
    "watchedMovies": [
      {
        "movie": {
          "id": 3,
          "title": "Captain America: Brave New World",
          "description": "Sam Wilson, el nuevo Capitán América, se encuentra en medio de un incidente internacional y debe descubrir el motivo detrás de un plan global nefasto.",
          "releaseDate": "2025-02-13T00:00:00.000Z",
          "categoryId": 2,
          "createdAt": "2025-03-06T15:59:18.693Z"
        },
        "watchedAt": "2025-03-06T17:05:40.656Z"
      }
    ]
  }
]
```

**Ejemplo de error (500):**
```json
{
  "error": "Failed to fetch users with watched movies"
}
```

---

### Crear un nuevo usuario
**Método**: `POST`  
**URL**: `https://desarrollador-backend-kubo-prueba-tecnica.vercel.app/api/users/create-user`  
**Descripción**: Crea un nuevo usuario en la base de datos.  

**Cuerpo de la solicitud (JSON):**
```json
{
  "username": "mariano_dev",
  "email": "mariano@example.com",
  "password": "securepassword"
}
```

**Ejemplo de respuesta exitosa (201):**
```json
{
  "id": 2,
  "username": "mariano_dev",
  "email": "mariano@example.com",
  "createdAt": "2025-03-06T17:17:37.156Z"
}
```

**Ejemplo de error (409) Usuario o email ya existentes:**
```json
{
  "error": "Username or email already exists"
}
```

**Ejemplo de error (500):**
```json
{
  "error": "Failed to create user"
}
```

---

### Marcar una película como vista
**Método**: `POST`  
**URL**: `https://desarrollador-backend-kubo-prueba-tecnica.vercel.app/api/movies/mark-watched`  
**Descripción**: Marca una película como vista por un usuario específico.  

**Cuerpo de la solicitud (JSON):**
```json
{
  "userId": 1,
  "movieId": 1
}
```

**Ejemplo de respuesta exitosa (201):**
```json
{
  "id": 4,
  "userId": 1,
  "movieId": 1,
  "watchedAt": "2025-03-06T17:17:46.775Z"
}
```

**Ejemplo de error (404) Usuario no encontrado:**
```json
{
  "error": "User not found"
}
```

**Ejemplo de error (500):**
```json
{
  "error": "Failed to mark movie as watched"
}
```

---

### Obtener todas las películas (paginadas y filtradas por categoría)
**Método**: `GET`  
**URL**: `/api/movies/movie-list`  

**Parámetros opcionales:**
- `categoryId`: Filtra por categoría usando el ID correspondiente.
- `page`: Número de página para la paginación.
- `limit`: Número de resultados por página.  

**Ejemplo de uso:**  
`https://desarrollador-backend-kubo-prueba-tecnica.vercel.app/api/movies/movie-list?categoryId=4&page=2&limit=1`

**Ejemplo de respuesta exitosa (200):**
```json
{
  "data": [
    {
      "id": 7,
      "title": "The Batman 2",
      "description": "La continuación de la historia de Bruce Wayne como el Caballero Oscuro de Gotham.",
      "releaseDate": "2025-10-03T00:00:00.000Z",
      "categoryId": 2,
      "createdAt": "2025-03-06T16:08:50.627Z",
      "category": {
        "id": 2,
        "name": "Suspenso"
      }
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 4,
    "totalPages": 1
  }
}
```

**Ejemplo de error (500):**
```json
{
  "error": "Failed to fetch new movies"
}
```

---

### Obtener nuevos lanzamientos de películas
**Método**: `GET`  
**URL**: `https://desarrollador-backend-kubo-prueba-tecnica.vercel.app/api/movies/new`  
**Descripción**: Obtiene un listado de los últimos estrenos de películas.

**Ejemplo de respuesta exitosa (200):**
```json
[
  {
    "id": 7,
    "title": "The Batman 2",
    "description": "La continuación de la historia de Bruce Wayne como el Caballero Oscuro de Gotham.",
    "releaseDate": "2025-10-03T00:00:00.000Z",
    "categoryId": 2,
    "createdAt": "2025-03-06T16:08:50.627Z",
    "category": {
      "id": 2,
      "name": "Suspenso"
    }
  }
]
```
---

### Crear una nueva pelicula 
**Método**: `POST`  
**URL**: `https://desarrollador-backend-kubo-prueba-tecnica.vercel.app/api/movies/`  
**Descripción**: Crea una nueva pelicula en la base de datos. 

**Cuerpo de la solicitud (JSON)**:
```json
  {
    "title": "Inside Out 2",
    "description": "Riley experiences new emotions as she enters her teenage years.",
    "releaseDate": "2025-03-04T00:00:00.000Z",
    "categoryId": 4
  }
```

**Ejemplo de respuesta existosa code(200)**: 
```json
{
	"id": 11,
	"title": "Inside Out 2",
	"description": "Riley experiences new emotions as she enters her teenage years.",
	"releaseDate": "2024-06-14T00:00:00.000Z",
	"categoryId": 4,
	"createdAt": "2025-03-06T16:09:47.166Z",
	"category": {
		"id": 4,
		"name": "Comedia"
	}
}
```

**Ejemplo de error code(400) ID de la categoria no valida**:
```json
{
  "error": "Invalid category ID"
}
```

**Ejemplo de error code(500) Error en la creacion de la pelicula**:
```json
{
  "error": "Failed to create movie"
}
```

