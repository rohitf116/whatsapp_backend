import request from "supertest";
import app from "./app"; // Replace './app' with the path to your Express app
import { register } from "../../controllers/auth.controller.js";

jest.mock("../../controllers/auth.controller.js", () => ({
  register: jest.fn(),
}));

describe("POST /api/v1/auth/register", () => {
  it("should test register", async () => {
    // Mock the response of the register function
    register.mockResolvedValueOnce({
      status: 201,
      text: JSON.stringify({
        message: "User registered successfully",
        user: {
          _id: "64cfe70ce29e1ef8799608fe",
          name: "rohit",
          email: "rrssonvvaswsnse@gmail.com",
          picture:
            "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
          status: "Hey Hi im using WhatsApp",
        },
        access_token: "your_access_token_here",
      }),
    });

    const response = await request(app).post("/api/v1/auth/register").send({
      name: "rohit",
      email: "rrssonvvaswnse@gmail.com",
      picture: "",
      password: "123456",
      status: "",
    });

    // Assertions
    expect(response.status).toBe(201);
    expect(response.text).toEqual(
      JSON.stringify({
        message: "User registered successfully",
        user: {
          _id: "64cfe70ce29e1ef8799608fe",
          name: "rohit",
          email: "rrssonvvaswsnse@gmail.com",
          picture:
            "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
          status: "Hey Hi im using WhatsApp",
        },
        access_token: "your_access_token_here",
      })
    );
  });
});
