const request = require('supertest');
let app = require('../app')
const server=request(app)
describe("POST /users/sign-in", () => {
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
describe("POST /image/images", () => {

    describe("Upload Image", () => {
        test("should respond with a 200111 status code", async () => {
            let token = await getToken();
            await server.post("/image/images")
                .set('x-auth-token', token)
                .attach('image', "C:\\Users\\ZahraIbr\\Downloads\\WhatsApp Image 2021-06-09 at 20.59.32.jpeg")
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.length).toBe(3)

                });
        })

    })
    describe("Upload Image with missing image", () => {
        test("should respond with a 403 status code", async () => {
            let token = await getToken();
            console.log("Finish token" + token)
            const response = await server.post("/image/images")
                .set('x-auth-token', token)
                .then((res) => {
                    expect(res.statusCode).toBe(400)
                });
        })

    })


})


async function getToken() {
    console.log("Getting token")
    const response = await server.post("/user/sign-in").send({
        email: "ibrahim1@gmail.com",
        password: "ibrahim"
    })
    return response.body.token
}

