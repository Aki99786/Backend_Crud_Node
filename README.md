## Quick setup
1. Install dependencies:
    npm install

2. Create a `.env` in project root (example):
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=service_catalog
    DB_DIALECT=mysql
    JWT_SECRET=your_jwt_secret

3. Start the app:
    npm run dev
    or use a process manager / nodemon in development.

The app will authenticate with the DB and call sequelize.sync() on startup.

## Project structure
- src/
  - config/db.ts
  - controllers/
     - authController.ts
     - categoryController.ts
     - serviceController.ts
  - middlewares/
     - auth.ts
  - routes/
     - authRoutes.ts
     - categoryRoutes.ts
     - serviceRoutes.ts
- server.ts

## Routes

Auth
- POST /auth/login
  - Body: { email, password }
  - Response: JWT token (on success)

Categories (protected by auth middleware)
- POST /categories
  - Create a category. Body: { name, ... }
- GET /categories
  - List all categories
- PUT /categories/:id
  - Update category by id
- DELETE /categories/:id
  - Delete category by id

Services (protected, nested under category)
- POST /services/:categoryId
  - Add a service to category. Body: { name, description, price, ... }
- GET /services/:categoryId
  - List services in a category
- PUT /services/:categoryId/:serviceId
  - Update a service
- DELETE /services/:categoryId/:serviceId
  - Delete a service
