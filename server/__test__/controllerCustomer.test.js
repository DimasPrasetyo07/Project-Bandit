const { sequelize, User, Product, Category, Wishlist } = require("../models");
const { queryInterface } = sequelize;
// const {  } = require("../models");

const request = require("supertest");
// const ControllerCustomer = require('../controllers/controllerCustomer')
const app = require("../app");

beforeAll(async () => {
  const user = require("../data/users.json").map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();

    return el;
  });
  await queryInterface.bulkInsert("Users", user, null);

  const category = require("../data/categories.json").map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el;
  });
  await queryInterface.bulkInsert("Categories", category, null);

  const product = require("../data/products.json").map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el;
  });
  await queryInterface.bulkInsert("Products", product, null);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Products", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete('Wishlists', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })
});

describe("Hitting endpoint POST /pub/customers", () => {
  test("POST new customer with correct input", () => {
    return request(app)
      .post("/pub/customers")
      .send({
        username: "Ucok3",
        email: "ucok3@mail.com",
        password: "zxc123",
        role: "Customer",
        phoneNumber: "123456",
        address: "jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("email", "ucok3@mail.com");
      });
  });
  test("POST new customer with existing email", () => {
    return request(app)
      .post("/pub/customers")
      .send({
        username: "Baba",
        email: "ucok3@mail.com",
        password: "zxc123",
        role: "Customer",
        phoneNumber: "123456",
        address: "jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Your email already used");
      });
  });
  test("POST new customer without email", () => {
    return request(app)
      .post("/pub/customers")
      .send({
        username: "Baba",
        // email: 'baba@mail.com',
        password: "zxc123",
        role: "Customer",
        phoneNumber: "123456",
        address: "jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Email is required");
      });
  });
  test("POST new customer without password", () => {
    return request(app)
      .post("/pub/customers")
      .send({
        username: "Baba",
        email: "baba@mail.com",
        // password: 'zxc123',
        role: "Customer",
        phoneNumber: "123456",
        address: "jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Password is required");
      });
  });
  test("POST new customer with empty string as password", () => {
    return request(app)
      .post("/pub/customers")
      .send({
        username: "Baba",
        email: "baba@mail.com",
        password: "",
        role: "Customer",
        phoneNumber: "123456",
        address: "jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Password is required");
      });
  });
  test("POST new customer with empty string as email", () => {
    return request(app)
      .post("/pub/customers")
      .send({
        username: "Baba",
        email: "",
        password: "zxc123",
        role: "Customer",
        phoneNumber: "123456",
        address: "jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Email is required");
      });
  });
  test("POST new customer with wrong format email", () => {
    return request(app)
      .post("/pub/customers")
      .send({
        username: "Baba",
        email: "olala",
        password: "zxc123",
        role: "Customer",
        phoneNumber: "123456",
        address: "jakarta",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Format email is required");
      });
  });
});

describe("Hitting endpoint POST /pub/login", () => {
  test("Login with correct input", () => {
    return request(app)
      .post("/pub/login")
      .send({
        email: "ucok3@mail.com",
        password: "zxc123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("role", "Customer");
        expect(response.body).toHaveProperty("username", "Ucok3");
      });
  });
  test("Login with wrong password", () => {
    return request(app)
      .post("/pub/login")
      .send({
        email: "ucok3@mail.com",
        password: "zxc123456",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("msg", "Email/Password Incorrect");
      });
  });
  test("Login with wrong email", () => {
    return request(app)
      .post("/pub/login")
      .send({
        email: "ucok3456@mail.com",
        password: "zxc123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("msg", "Email/Password Incorrect");
      });
  });
});

describe("Hitting endpoint GET /pub/products", () => {
  test("Fetch all product without access token and without filter", () => {
    return request(app)
      .get("/pub/products")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        // expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("count", expect.any(Number));
        expect(response.body).toHaveProperty("rows", expect.any(Array));
        expect(response.body.rows).toBeInstanceOf(Array);
        expect(response.body.rows).toHaveLength(8);
        expect(response.body.rows[0]).toHaveProperty("id", expect.any(Number));
        expect(response.body.rows[0]).toHaveProperty(
          "name",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "description",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "price",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "stock",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "imgUrl",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "categoryId",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "authorId",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "status",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "createdAt",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "updatedAt",
          expect.any(String)
        );
      });
  });
  test("Fetch product with 1 query filter parameter", () => {
    return request(app)
      .get("/pub/products?search=nanju")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("count", expect.any(Number));
        expect(response.body).toHaveProperty("rows", expect.any(Array));
        expect(response.body.rows).toBeInstanceOf(Array);
        expect(response.body.rows).toHaveLength(1);
        expect(response.body.rows[0]).toHaveProperty("id", expect.any(Number));
        expect(response.body.rows[0]).toHaveProperty(
          "name",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "description",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "price",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "stock",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "imgUrl",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "categoryId",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "authorId",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "status",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "createdAt",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "updatedAt",
          expect.any(String)
        );
      });
  });
  test("Fetch product with pagination", () => {
    return request(app)
      .get("/pub/products?page=2")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("count", expect.any(Number));
        expect(response.body).toHaveProperty("rows", expect.any(Array));
        expect(response.body.rows).toBeInstanceOf(Array);
        expect(response.body.rows).toHaveLength(6);
        expect(response.body.rows[0]).toHaveProperty("id", expect.any(Number));
        expect(response.body.rows[0]).toHaveProperty(
          "name",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "description",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "price",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "stock",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "imgUrl",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "categoryId",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "authorId",
          expect.any(Number)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "status",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "createdAt",
          expect.any(String)
        );
        expect(response.body.rows[0]).toHaveProperty(
          "updatedAt",
          expect.any(String)
        );
      });
  });
  test("Fetch a product by id", () => {
    return request(app)
      .get("/pub/products/1")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("name", expect.any(String));
        expect(response.body).toHaveProperty("description", expect.any(String));
        expect(response.body).toHaveProperty("price", expect.any(Number));
        expect(response.body).toHaveProperty("stock", expect.any(Number));
        expect(response.body).toHaveProperty("imgUrl", expect.any(String));
        expect(response.body).toHaveProperty("categoryId", expect.any(Number));
        expect(response.body).toHaveProperty("authorId", expect.any(Number));
        expect(response.body).toHaveProperty("status", expect.any(String));
        expect(response.body).toHaveProperty("createdAt", expect.any(String));
        expect(response.body).toHaveProperty("updatedAt", expect.any(String));
      });
  });
  test("Fetch a product with wrong id (product with those id not exist)", () => {
    return request(app)
      .get("/pub/products/100")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("msg", "Data Not Found");
      });
  });
});

describe("Hitting endpoint /pub/wishlist", () => {
  test("GET wishlist with current user id", () => {
    return request(app)
      .get("/pub/wishlist")
      .set(
        "access_token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJDdXN0b21lcjEiLCJlbWFpbCI6ImN1c3RvbWVyMUBtYWlsLmNvbSIsImlhdCI6MTY2NTM2MzgyOH0.K5WCIvLkS9CjbYJ-I22Do4aX95QWRBHNFrSFDgPBJqs"
      )
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      });
  });
  test('POST wishlist with correct id', () => {
    return request(app)
    .post('/pub/wishlist/12')
    .set(
    "access_token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJDdXN0b21lcjEiLCJlbWFpbCI6ImN1c3RvbWVyMUBtYWlsLmNvbSIsImlhdCI6MTY2NTM2MzgyOH0.K5WCIvLkS9CjbYJ-I22Do4aX95QWRBHNFrSFDgPBJqs"
    )
    .then((response) => {
      expect(response.statusCode).toBe(201)
      expect(response.body).toHaveProperty('UserId', expect.any(Number))
      expect(response.body).toHaveProperty('ProductId', expect.any(Number))
      expect(response.body).toHaveProperty('updatedAt', expect.any(String))
      expect(response.body).toHaveProperty('createdAt', expect.any(String))
    })
  })
  test('POST wishlist but product didnt exist', () => {
    return request(app)
    .post('/pub/wishlist/100')
    .set(
    "access_token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJDdXN0b21lcjEiLCJlbWFpbCI6ImN1c3RvbWVyMUBtYWlsLmNvbSIsImlhdCI6MTY2NTM2MzgyOH0.K5WCIvLkS9CjbYJ-I22Do4aX95QWRBHNFrSFDgPBJqs"
    )
    .then((response) => {
      expect(response.statusCode).toBe(404)
      expect(response.body).toHaveProperty('msg', 'Data Not Found')
    })
  })
  test('GET wishlist but without login/access token', () => {
    return request(app)
    .get("/pub/wishlist")
    .then((response) => {
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('msg', 'Please Login First');
    });
  })
  test('GET wishlist but with wrong role(not customer)', () => {
    return request(app)
    .get('/pub/wishlist')
    .set(
      'access_token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYXplbCIsImVtYWlsIjoiaGJlbGxvY2h0MEBpbnN0YWdyYW0uY29tIiwiaWF0IjoxNjY1MzA5Mzk4fQ.P4Vb47v3VaYaHjd1jKcJYa4Cj1hSNnvkj3CBGAzugTM'
    )
    .then((response) => {
      expect(response.statusCode).toBe(403)
      expect(response.body).toHaveProperty('msg', 'You do not have permission')
    })
  })
})
