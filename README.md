# 📦 Stock Control - Frontend

Frontend application for a complete stock control system, built with Angular 15.

## 🚀 Technologies

- Angular 15.2
- TypeScript 4.9
- RxJS 7.8
- Bootstrap 5 (opcional)
- Docker

## 🐳 Running with Docker

### Prerequisites
- Docker
- Docker Compose

### Steps

1. Clone the repository
```bash
git clone https://github.com/seu-usuario/stock-control.git
cd stock-control
```

2. Start the container
```bash
docker-compose up -d
```

3. Access the container
```bash
docker exec -it stock-control-angular15 sh
```

4. Install dependencies and run
```bash
npm install
ng serve --host 0.0.0.0
```

5. Access the application at `http://localhost:4200`

## 📡 API Connection

This application connects directly to the [Stock Control API](https://github.com/seu-usuario/stock-control-api) built with Spring Boot.

## 🛠️ Development
```bash
# Generate component
ng generate component components/component-name

# Generate service
ng generate service services/service-name

# Build for production
ng build --configuration production
```

## 📝 License

This project is under MIT license.
```

---

## 🔧 stock-control-api (Spring Boot)

**Descrição curta (para o campo description do GitHub):**
```
REST API for stock control system built with Spring Boot 3 and Java 17