# GrowMate - Personal Habit Tracker

A full-stack habit tracking application built with React TypeScript frontend and Spring Boot backend.

## Features

- **User Authentication**: Secure JWT-based authentication
- **Habit Management**: Create, edit, and delete personal habits
- **Progress Tracking**: Mark habits as complete and track streaks
- **Visual Analytics**: Charts and graphs to visualize progress
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for data visualization
- Axios for API calls
- React Router for navigation

### Backend
- Spring Boot 3.2
- Spring Security with JWT
- Spring Data JPA
- MySQL Database
- Maven for dependency management

## Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.6+
- MySQL 8.0+

## Setup Instructions

### Database Setup
1. Install MySQL and create a database:
```sql
CREATE DATABASE growmate_db;
```
2. Update database credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies and run:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Run Full Stack
To run both frontend and backend simultaneously:
```bash
npm run dev:full
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/user/me` - Get current user

### Habits
- `GET /api/habits` - Get all user habits
- `POST /api/habits` - Create new habit
- `PUT /api/habits/{id}` - Update habit
- `DELETE /api/habits/{id}` - Delete habit

### Habit Logs
- `GET /api/habit-logs` - Get all habit logs
- `POST /api/habit-logs/toggle` - Toggle habit completion
- `GET /api/habit-logs/check` - Check habit completion status

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Habits Table
```sql
CREATE TABLE habits (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  frequency ENUM('DAILY', 'WEEKLY') NOT NULL,
  color VARCHAR(7) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Habit Logs Table
```sql
CREATE TABLE habit_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  habit_id BIGINT NOT NULL,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
  UNIQUE KEY unique_habit_date (habit_id, date)
);
```

## Environment Variables

### Backend (`application.properties`)
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/growmate_db
spring.datasource.username=root
spring.datasource.password=password

# JWT
app.jwt.secret=mySecretKey
app.jwt.expiration=86400000

# CORS
app.cors.allowed-origins=http://localhost:5173
```

## Project Structure

```
growmate/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/growmate/
│   │       ├── controller/  # REST controllers
│   │       ├── dto/         # Data transfer objects
│   │       ├── model/       # JPA entities
│   │       ├── repository/  # Data repositories
│   │       ├── security/    # Security configuration
│   │       └── exception/   # Exception handlers
│   └── pom.xml
├── src/                     # React frontend
│   ├── components/          # Reusable components
│   ├── contexts/           # React contexts
│   ├── pages/              # Page components
│   ├── services/           # API services
│   └── App.tsx
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.