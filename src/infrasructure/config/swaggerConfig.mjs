import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/**
 * Swagger configuration options for generating API documentation.
 * @type {Object}
 */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for the E-Commerce application",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["username", "email", "password", "role"],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the user",
              example: "60d0fe4f5311236168a109ca",
            },
            username: {
              type: "string",
              description: "The username of the user",
              example: "john_doe",
            },
            email: {
              type: "string",
              description: "The email address of the user",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              description: "The hashed password of the user (not returned in responses)",
              example: "$2a$10$hashedpassword",
            },
            role: {
              type: "string",
              enum: ["customer", "admin"],
              description: "The role of the user",
              example: "customer",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the user was created",
              example: "2025-07-07T14:56:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the user was last updated",
              example: "2025-07-07T14:56:00.000Z",
            },
          },
        },
        Product: {
          type: "object",
          required: ["name", "category", "price"],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the product",
              example: "60d0fe4f5311236168a109cb",
            },
            name: {
              type: "string",
              description: "The name of the product",
              example: "Laptop",
            },
            category: {
              type: "string",
              description: "The category of the product",
              example: "Electronics",
            },
            price: {
              type: "number",
              description: "The price of the product",
              example: 999.99,
            },
            description: {
              type: "string",
              description: "The description of the product",
              example: "A high-performance laptop",
            },
            image: {
              type: "string",
              description: "URL or path to the product image",
              example: "http://example.com/images/laptop.jpg",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the product was created",
              example: "2025-07-07T14:56:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the product was last updated",
              example: "2025-07-07T14:56:00.000Z",
            },
          },
        },
        Cart: {
          type: "object",
          required: ["userId"],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the cart",
              example: "60d0fe4f5311236168a109cc",
            },
            userId: {
              type: "string",
              description: "Reference to the user who owns the cart",
              example: "60d0fe4f5311236168a109ca",
            },
            items: {
              type: "array",
              description: "Array of items in the cart",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "Reference to the product in the cart",
                    example: "60d0fe4f5311236168a109cb",
                  },
                  quantity: {
                    type: "number",
                    description: "Quantity of the product in the cart",
                    example: 1,
                  },
                },
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the cart was created",
              example: "2025-07-07T14:56:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the cart was last updated",
              example: "2025-07-07T14:56:00.000Z",
            },
          },
        },
        Order: {
          type: "object",
          required: ["userId", "items", "totalAmount", "status"],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the order",
              example: "60d0fe4f5311236168a109cd",
            },
            userId: {
              type: "string",
              description: "Reference to the user who placed the order",
              example: "60d0fe4f5311236168a109ca",
            },
            items: {
              type: "array",
              description: "Array of items in the order",
              items: {
                type: "object",
                required: ["productId", "quantity"],
                properties: {
                  productId: {
                    type: "string",
                    description: "Reference to the product in the order",
                    example: "60d0fe4f5311236168a109cb",
                  },
                  quantity: {
                    type: "number",
                    description: "Quantity of the product in the order",
                    example: 2,
                  },
                },
              },
            },
            totalAmount: {
              type: "number",
              description: "Total amount for the order",
              example: 1999.98,
            },
            status: {
              type: "string",
              enum: ["placed", "shipped", "delivered"],
              description: "Status of the order",
              example: "placed",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the order was created",
              example: "2025-07-07T14:56:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the order was last updated",
              example: "2025-07-07T14:56:00.000Z",
            },
          },
        },
      },
    },
  },
  apis: ["./src/apps/auth/routers/auth.route.mjs", "./src/apps/products/routers/prouduct.route.mjs"],
};

/**
 * Generates the Swagger specification from JSDoc comments.
 * @type {Object}
 */
const swaggerSpec = swaggerJSDoc(swaggerOptions);

/**
 * Configures Swagger UI for the Express application.
 * @param {Object} app - The Express application instance.
 * @returns {void}
 */
const setupSwagger = (app) => {
  /**
   * Serves the Swagger UI at /api-docs.
   */
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;