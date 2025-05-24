import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import { createConnection, getRepository } from "typeorm";
import { User } from "./entities/User";
import { AuthService } from "./services/AuthService";

const app = express();

app.use(cors());
app.use(express.json());

createConnection({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "ireserva",
  entities: [User],
  synchronize: true
}).then(() => {
  console.log("Connected to database");
}).catch((error) => {
  console.error("Error connecting to database:", error);
});

app.post("/api/auth/login", async (request: Request, response: Response) => {
  try {
    const authService = new AuthService();
    const result = await authService.execute(request.body);
    return response.json(result);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

app.post("/api/users", async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;
    
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      return response.status(400).json({ error: "User already exists" });
    }

    const user = userRepository.create({
      name,
      email,
      password
    });

    await user.hashPassword();
    await userRepository.save(user);

    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 