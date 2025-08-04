import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  bio: text("bio"),
  role: text("role").notNull().default("user"), // admin, user, driver
  status: text("status").notNull().default("active"), // active, inactive, suspended
  language: text("language").default("en"),
  timezone: text("timezone").default("UTC"),
  avatar: text("avatar"),
  lastActive: timestamp("last_active").defaultNow(),
  joinDate: timestamp("join_date").defaultNow(),
});

export const cars = pgTable("cars", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  licensePlate: text("license_plate").notNull().unique(),
  owner: text("owner").notNull(),
  status: text("status").notNull().default("active"), // active, inactive, maintenance
  location: text("location"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reports = pgTable("reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  carId: varchar("car_id"),
  type: text("type").notNull(), // accident, maintenance, complaint, feedback
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"), // pending, reviewed, resolved
  priority: text("priority").default("medium"), // low, medium, high
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  lastActive: true,
  joinDate: true,
});

export const insertCarSchema = createInsertSchema(cars).omit({
  id: true,
  createdAt: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  createdAt: true,
  resolvedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCar = z.infer<typeof insertCarSchema>;
export type Car = typeof cars.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;
