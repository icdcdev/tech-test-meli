
# API de Gestión de Citas (Node.js + Serverless + DynamoDB)

Prueba técnica para desarrollador fullstack — arquitectura hexagonal, Serverless Framework y DynamoDB.

---

## Tecnologías

- Node.js
- Serverless Framework
- DynamoDB (local con Docker)
- Arquitectura Hexagonal (Clean Architecture)

---

## Instalación

### 1 - Clona el repositorio:

```bash
git clone https://github.com/icdcdev/tech-test-meli.git
cd tech-test-meli
```

### 2 - Instala dependencias:

```bash
npm install
```

### 3 - Levanta DynamoDB Local con Docker:

```bash
docker-compose up -d
```

### 4 -  Crea tabla en DynamoDB local (solo si no usas `migrate: true` en `serverless.yml`):

```bash
aws dynamodb create-table   --table-name AppointmentsTable   --attribute-definitions AttributeName=id,AttributeType=S   --key-schema AttributeName=id,KeyType=HASH   --billing-mode PAY_PER_REQUEST   --endpoint-url http://localhost:8000
```

---

## Ejecutar en Local

### 1 - Inicia DynamoDB Local:

```bash
sls dynamodb start --migrate
```

### 2 - Levanta Serverless Offline:

```bash
sls offline start
```

La API quedará disponible en:  
**http://localhost:3000**

---

## Endpoints

### Listar Citas por Fecha

**GET** `/appointments?date=2025-05-07`

---

### Crear Cita

**POST** `/appointments`

**Body:**
```json
{
  "clientId": "123",
  "date": "2025-05-07",
  "time": "10:00",
  "comments": "Primera cita",
  "vehicleId": "ABC123"
}
```

---

### Actualizar Cita

**PUT** `/appointments/{id}`

**Body:**
```json
{
  "date": "2025-05-08",
  "time": "11:00"
}
```

---

### Cancelar Cita

**DELETE** `/appointments/{id}`

---


## Ver Datos en DynamoDB Local

Puedes levantar un administrador web para DynamoDB local:

```bash
docker run -p 8001:8001 -e DYNAMO_ENDPOINT=http://host.docker.internal:8000 aaronshaf/dynamodb-admin
```

Accede desde tu navegador a:  
**http://localhost:8001**

---

## Comandos Rápidos

```bash
npm install                      # Instalar dependencias
docker-compose up -d             # Levantar DynamoDB local
sls dynamodb start --migrate     # Iniciar DynamoDB local con migración
sls offline start                # Levantar API local
```

---

## Estructura de Proyecto

```
src/
├── adapters/
│   ├── in/
│   │   └── handlers.js
│   └── out/
│       └── AppointmentRepositoryDynamo.js
├── application/
│   └── use_cases/
│       └── [casos de uso].js
└── domain/
    └── models/
        └── Appointment.js
```

---

## Arquitectura Hexagonal

- **Domain:** Entidades y lógica de negocio pura.
- **Application:** Casos de uso que coordinan las acciones.
- **Adapters:**
  - **In:** Lambdas que reciben los requests vía API Gateway.
  - **Out:** Implementación de repositorios hacia DynamoDB.

---

## 📝 Autor

👨‍💻 Alba Melissa May Pérez
📧 alba.melissa.mp@gmail.com

---
