# be_fintech

This project is a backend application built using **Express.js** and **MongoDB** with **Mongoose** as the ODM. It provides functionalities for managing financial operations and includes features like authentication, dashboard overviews, and comprehensive CRUD operations for financial planning and management.

## Features

### Authentication
- Implemented using **JSON Web Tokens (JWT)**.
- Provides secure access to the application's endpoints.

### Dashboard Overview
- Displays key financial metrics such as:
  - Expenses
  - Receivables
  - Revenues
- Includes interactive charts to provide insights into financial data.

### Financial Plan Management
- Create, update, retrieve, and delete financial plans.

### Employee Management
- Manage employee information with CRUD endpoints.

### Project and Contract Management
- Handle projects and contracts with endpoints for:
  - Creation
  - Retrieval
  - Updating
  - Deletion

### Invoice Management
- Manage invoices with full CRUD support.

### Task Management
- Add, retrieve, update, and delete tasks related to financial operations.

## API Endpoints
All features support the following HTTP methods:
- **GET**: Retrieve data.
- **POST**: Add new entries.
- **PUT**: Update existing entries.
- **DELETE**: Remove entries.

## Technologies Used
- **Node.js** with **Express.js** for building the backend server.
- **MongoDB** with **Mongoose** for database operations.
- **JSON Web Tokens (JWT)** for authentication.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/be_fintech.git
   ```

2. Navigate to the project directory:
   ```bash
   cd be_fintech
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:

     ```env
     MONGODB_URI=mongodb://localhost:27017/mydatabase
     FIREBASE_ADMIN_KEY_PATH=./firebase-adminsdk.json
     DB_URL=mongodb+srv://db_user:db_password@authorization.kgoyr.mongodb.net/?retryWrites=true&w=majority&appName=authorization
     PORT=5000
     JWT_ACCESS_SECRET=app-jwt-secret-key
     JWT_REFRESH_SECRET=app-jwt-refresh-secret-key
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=your-email
     SMTP_PASSWORD=your-app-password
     API_URL=http://localhost:5000
     CLIENT_URL=http://localhost:3000
     VONAGE_API_KEY=your-vonage-api-key
     VONAGE_API_SECRET=your-vonage-api-secret
     VONAGE_FROM=your-phone-number
     ```

5. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

## Usage
- Use a REST API client like **Postman** or **Insomnia** to interact with the endpoints.
- For authentication-protected routes, include the JWT token in the request header.

## Future Improvements
- Add role-based access control (RBAC) for enhanced security.
- Integrate third-party payment gateways.
- Enhance dashboard visualizations with real-time data updates.
- Add automated tests for endpoints.

## License
This project is licensed under the MIT License.

