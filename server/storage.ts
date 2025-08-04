import { type User, type InsertUser, type Car, type InsertCar, type Report, type InsertReport } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  
  // Car methods
  getCar(id: string): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
  updateCar(id: string, car: Partial<Car>): Promise<Car | undefined>;
  deleteCar(id: string): Promise<boolean>;
  getAllCars(): Promise<Car[]>;
  
  // Report methods
  getReport(id: string): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
  updateReport(id: string, report: Partial<Report>): Promise<Report | undefined>;
  deleteReport(id: string): Promise<boolean>;
  getAllReports(): Promise<Report[]>;
  
  // Authentication
  validateToken(token: string): Promise<User | null>;
  createSession(user: User): Promise<string>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cars: Map<string, Car>;
  private reports: Map<string, Report>;
  private sessions: Map<string, User>;

  constructor() {
    this.users = new Map();
    this.cars = new Map();
    this.reports = new Map();
    this.sessions = new Map();
    this.initializeDummyData();
  }

  private initializeDummyData() {
    // Create admin user
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      username: "admin",
      email: "admin@example.com",
      password: "admin123", // In real app, this would be hashed
      firstName: "John",
      lastName: "Admin",
      phone: "+1 (555) 123-4567",
      bio: "System administrator with 5+ years of experience in car fleet management.",
      role: "admin",
      status: "active",
      language: "en",
      timezone: "UTC-5",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastActive: new Date(),
      joinDate: new Date(),
    };
    this.users.set(adminId, adminUser);

    // Create sample users
    const users = [
      {
        id: randomUUID(),
        username: "jane.cooper",
        email: "jane.cooper@example.com",
        password: "password123",
        firstName: "Jane",
        lastName: "Cooper",
        phone: "+1 (555) 234-5678",
        bio: "Regular user",
        role: "user",
        status: "active",
        language: "en",
        timezone: "UTC-5",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        joinDate: new Date("2024-01-15"),
      },
      {
        id: randomUUID(),
        username: "tom.cook",
        email: "tom.cook@example.com",
        password: "password123",
        firstName: "Tom",
        lastName: "Cook",
        phone: "+1 (555) 345-6789",
        bio: "Professional driver",
        role: "driver",
        status: "inactive",
        language: "en",
        timezone: "UTC-5",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        joinDate: new Date("2023-12-22"),
      }
    ];

    users.forEach(user => this.users.set(user.id, user as User));

    // Create sample cars
    const cars = [
      {
        id: randomUUID(),
        make: "Toyota",
        model: "Camry",
        year: 2024,
        licensePlate: "ABC-123",
        owner: "John Smith",
        status: "active",
        location: "New York, NY",
        latitude: "40.7128",
        longitude: "-74.0060",
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        make: "Honda",
        model: "Civic",
        year: 2023,
        licensePlate: "XYZ-456",
        owner: "Sarah Johnson",
        status: "maintenance",
        location: "Los Angeles, CA",
        latitude: "34.0522",
        longitude: "-118.2437",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        make: "Ford",
        model: "F-150",
        year: 2023,
        licensePlate: "DEF-789",
        owner: "Mike Wilson",
        status: "active",
        location: "Chicago, IL",
        latitude: "41.8781",
        longitude: "-87.6298",
        image: "https://images.unsplash.com/photo-1594736797933-d0ef6ba6373e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        createdAt: new Date(),
      }
    ];

    cars.forEach(car => this.cars.set(car.id, car as Car));

    // Create sample reports
    const reports = [
      {
        id: randomUUID(),
        userId: Array.from(this.users.values())[1].id,
        carId: Array.from(this.cars.values())[0].id,
        type: "accident",
        message: "Minor collision at intersection, no injuries reported. Vehicle needs inspection and minor repairs to front bumper.",
        status: "pending",
        priority: "high",
        createdAt: new Date("2024-01-20"),
        resolvedAt: null,
      },
      {
        id: randomUUID(),
        userId: Array.from(this.users.values())[2].id,
        carId: Array.from(this.cars.values())[1].id,
        type: "maintenance",
        message: "Regular maintenance due for vehicle. Oil change and brake inspection needed. Last service was 6 months ago.",
        status: "resolved",
        priority: "medium",
        createdAt: new Date("2024-01-18"),
        resolvedAt: new Date("2024-01-19"),
      },
      {
        id: randomUUID(),
        userId: Array.from(this.users.values())[1].id,
        carId: null,
        type: "complaint",
        message: "Having issues with the mobile app. Unable to track vehicle location properly. App crashes frequently.",
        status: "reviewed",
        priority: "medium",
        createdAt: new Date("2024-01-15"),
        resolvedAt: null,
      }
    ];

    reports.forEach(report => this.reports.set(report.id, report as Report));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      lastActive: new Date(),
      joinDate: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Car methods
  async getCar(id: string): Promise<Car | undefined> {
    return this.cars.get(id);
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const id = randomUUID();
    const car: Car = {
      ...insertCar,
      id,
      createdAt: new Date(),
    };
    this.cars.set(id, car);
    return car;
  }

  async updateCar(id: string, updates: Partial<Car>): Promise<Car | undefined> {
    const car = this.cars.get(id);
    if (!car) return undefined;
    
    const updatedCar = { ...car, ...updates };
    this.cars.set(id, updatedCar);
    return updatedCar;
  }

  async deleteCar(id: string): Promise<boolean> {
    return this.cars.delete(id);
  }

  async getAllCars(): Promise<Car[]> {
    return Array.from(this.cars.values());
  }

  // Report methods
  async getReport(id: string): Promise<Report | undefined> {
    return this.reports.get(id);
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = randomUUID();
    const report: Report = {
      ...insertReport,
      id,
      createdAt: new Date(),
      resolvedAt: null,
    };
    this.reports.set(id, report);
    return report;
  }

  async updateReport(id: string, updates: Partial<Report>): Promise<Report | undefined> {
    const report = this.reports.get(id);
    if (!report) return undefined;
    
    const updatedReport = { ...report, ...updates };
    this.reports.set(id, updatedReport);
    return updatedReport;
  }

  async deleteReport(id: string): Promise<boolean> {
    return this.reports.delete(id);
  }

  async getAllReports(): Promise<Report[]> {
    return Array.from(this.reports.values());
  }

  // Authentication methods
  async validateToken(token: string): Promise<User | null> {
    return this.sessions.get(token) || null;
  }

  async createSession(user: User): Promise<string> {
    const token = randomUUID();
    this.sessions.set(token, user);
    return token;
  }
}

export const storage = new MemStorage();
