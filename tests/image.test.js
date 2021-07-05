const request = require('supertest');
const app = require('../app')
const server=request(app)
jest.setTimeout(150000)
describe("POST /image", () => {

    describe("Upload Image", () => {
        test("should respond with a 200111 status code", async () => {
            let token = await getToken();
            await server.post("/image")
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
            const response = await server.post("/image")
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

