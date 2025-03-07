# Cuestionario prueba técnica Kubo

## **CUESTIONARIO**

### 1️⃣ **¿Cuál es el propósito de `module.exports`?**

Se usa en Node.js para exportar funciones, objetos o variables desde un archivo, permitiendo que otros archivos los importen con `require()`. Es la forma de compartir código entre módulos en Node.js.

### 3️⃣ **¿Cuál es la diferencia entre código bloqueante y código no bloqueante?**

El **código bloqueante** espera a que una operación termine antes de seguir con la siguiente (ejemplo: `fs.readFileSync()`). En cambio, el **código no bloqueante** sigue ejecutándose mientras espera el resultado de una operación (ejemplo: `fs.readFile()` con un callback).

### 2️⃣ **¿Qué es un middleware?**

Es una función que se ejecuta entre la solicitud del cliente y la respuesta del servidor en frameworks como Express. Se usa para cosas como autenticar usuarios, registrar logs o manejar errores.

4️⃣ **¿Qué biblioteca de JavaScript usaría para manejar datos en tiempo real?**

 **Socket.IO** es una de las más populares para manejar comunicación en tiempo real con WebSockets. También hay otras como **Pusher** o **Firebase Realtime Database**, dependiendo del caso de uso.

## **PLUS**

5️⃣ **¿Cuál es la principal ventaja de trabajar un proyecto dockerizado?**

La principal ventaja es que **garantiza que el proyecto se ejecute igual en cualquier entorno** sin importar el sistema operativo o configuraciones locales. Ayuda a evitar el clásico "en mi máquina sí funciona".

7️⃣ **¿Con qué herramienta se puede orquestar un proyecto con múltiples imágenes en Docker?**

**Docker Compose** si es un entorno pequeño o de desarrollo, y **Kubernetes** si es algo más grande y escalable.

6️⃣ **¿Cuál es la diferencia entre una imagen y un volumen en Docker?**

Una **imagen** es una plantilla con todo lo necesario para correr una aplicación (código, dependencias, configuraciones). Un **volumen** es un espacio donde Docker guarda datos persistentes, permitiendo que sobrevivan aunque el contenedor se elimine.

8️⃣ **¿Cuál es la principal ventaja de trabajar con un clúster de Kubernetes?**

La **escalabilidad automática** y la **alta disponibilidad**. Kubernetes puede distribuir la carga entre varios contenedores, reiniciarlos si fallan y adaptarse al tráfico sin intervención manual.