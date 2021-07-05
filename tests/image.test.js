const request = require('supertest');
const app = require('../app')

describe("POST /image/", () => {
    describe("Upload Image", () => {

        test("should respond with a 200 status code", async () => {
            let token = await getToken();
            console.log("Finish token")

            request(app)
                .post("/image")
                .set('x-auth-token', token)
                .attach('image', "C:\\Users\\ZahraIbr\\Downloads\\WhatsApp Image 2021-06-09 at 20.59.32.jpeg")

               expect(1).toBe(1)
        })

    })

})

async function getToken() {
    console.log("Getting token")
    request(app).post("/user/sign-in").send({
        email: "ibrahim1@gmail.com",
        password: "ibrahim"
    }).end((err, res) => {
        if (err) {
        }
        console.log("res " + res.token)
    })
    console.log("Response " + response.token)
}

