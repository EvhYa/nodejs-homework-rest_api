import mongoose from "mongoose";
import request from "supertest";

import app from "../../app.js";

import User from "../../models/User.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

const loginData = {
   email: "barryAlen@gmail.com",
   password: "12345678",
};

describe("test users/login route", () => {
   let server = null;
   beforeAll(async () => {
      await mongoose.connect(DB_TEST_HOST);
      server = app.listen(PORT);
   });

   afterAll(async () => {
      await mongoose.connection.close();
      server.close();
   });

   beforeEach(async () => {
      await request(app).post("/users/register").send(loginData);
   });

   afterEach(async () => {
      await User.deleteMany();
   });

   test("test users/login with correct data", async () => {
      const { body, statusCode } = await request(app).post("/users/login").send(loginData);

      expect(statusCode).toBe(200);
      expect(body.user.email).toBe(loginData.email);
      expect(body.user.subscription).toBe("starter");
   });
});
