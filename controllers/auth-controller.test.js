import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import "dotenv/config.js";
import User from "../models/User.js";


const { TEST_DB_HOST, PORT = 3000 } = process.env;


describe("test login controller", () => {
	let server = null;

	const userData = {
		email: "userauthtest@gmail.com",
		password: "123456QWEqwerty?"
	}

	beforeAll(async () => {
		await mongoose.connect(TEST_DB_HOST);
		server = app.listen(PORT);
	})

	afterAll(async () => {
		await mongoose.connection.close();
		server.close();
	})

	afterEach(async () => {
		await User.deleteMany({});
	})

	test("should return status code 200, token, object with email and subscription as String", async () => {

		await request(app).post("/api/users/register").send(userData);

		const { statusCode, text: res } = await request(app).post("/api/users/login").send(userData);

		const { token, user } = JSON.parse(res);

		expect(statusCode).toBe(200);
		expect(token).toBeTruthy();
		expect(typeof user.email).toBe('string');
		expect(typeof user.subscription).toBe('string');
	})
})