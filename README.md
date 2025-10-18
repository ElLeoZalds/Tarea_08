# Tarea 08

# Procedimientos

## 🚀 1. Clonar el repositorio de GitHub en la terminal:

```bash
git clone https://github.com/ElLeoZalds/Tarea_08.git
```

## 💾 2. Restaurar la Base de Datos:

```sql
CREATE TABLE albumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    lanzamiento DATE NOT NULL,
    artista VARCHAR(150) NOT NULL,
    venta INT NOT NULL,
    genero VARCHAR(100) NOT NULL,
    productora VARCHAR(150) NOT NULL,
    premios INT NOT NULL
) ENGINE = INNODB;
```

## 🔧 3. Abrir el proyecto _Tarea_08_ en Visual Studio Code usando por ejemplo el comando:

```
code .
```

## ⬇️ 4. Instalar ejecutar la instalación y recuperar todas las dependencias

### Usar **ctrl + ñ** para abrir la terminal de VSC y escribir

```bash
npm install
```

## ⚙️ 5. Configurar el archivo **.env**

```js
DB_HOST = localhost;
DB_USER = tu_usuario;
DB_PASSWORD = tu_contraseña;
DB_NAME = tarea_8_musica;
PORT = 3306;
```

## 💻 6. Instalar e iniciar el servidor con _nodemon_

```
npm install -g nodemon
nodemon server
```

## 📬 7. Probar la API

Puedes utilizar Postman, ThunderClient u otro cliente REST para probar los siguientes endpoints:

| Método | Ruta   | Qué hace                        |
| ------ | ------ | ------------------------------- |
| GET    | `/`    | Trae todos los álbumes          |
| GET    | `/:id` | Trae un álbum específico por ID |
| POST   | `/`    | Crea un álbum nuevo             |
| PUT    | `/:id` | Actualiza un álbum existente    |
| DELETE | `/:id` | Borra un álbum por su ID        |

## 🧑‍💻 Autor

```
https://github.com/ElLeoZalds
```
