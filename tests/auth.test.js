const request = require('supertest');
let app = require('../app')
const server=request(app)

describe("POST /users/sign-up", () => {
    describe("given a username and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await server.post("/user/sign-in").send({
                email: "ibrahim1@gmail.com",
                password: "ibrahim"
            })
            expect(response.statusCode).toBe(200)
        })

    })
    describe("given a username and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await server.post("/user/sign-in").send({
                email: "ibrahim1@gmail.com",
                password: "ibrahim"
            })
            expect(response.statusCode).toBe(200)
        })

    })

    describe("when the username and password is missing", () => {
        test("should respond with a status code of 400", async () => {
            const bodyData = [
                {username: "username"},
                {password: "password"},
                {}
            ]
            for (const body of bodyData) {
                const response = await server.post("/user/sign-in").send(body)
                expect(response.statusCode).toBe(400)
            }
        })
    })
    describe("POST /users/sign-in", () => {
        describe("when a username or password is wrong", () => {

            test("should respond with a 403 status code", async () => {
                const response = await server.post("/user/sign-in").send({
                    email: "worng@gmail.com",
                    password: "worng"
                })
                expect(response.statusCode).toBe(403)
            })

        })

    })
})
