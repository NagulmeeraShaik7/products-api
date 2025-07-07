import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SWAGGER_CONSTANTS, PRODUCTION_SERVER_URL, PROD_SERVER_DESCRIPTION, DESC, FUNCTION_NAMES, PARAMS, RETURN } from "../constants/constants.mjs";

/**
 * Swagger configuration options for generating API documentation.
 * @type {Object}
 */
const swaggerOptions = {
  definition: {
    openapi: SWAGGER_CONSTANTS.OPENAPI_VERSION,
    info: {
      title: SWAGGER_CONSTANTS.API_TITLE,
      version: SWAGGER_CONSTANTS.API_VERSION,
      description: SWAGGER_CONSTANTS.API_DESCRIPTION,
    },
    servers: [
      {
        url: SWAGGER_CONSTANTS.SERVER_URL,
        description: SWAGGER_CONSTANTS.SERVER_DESCRIPTION,
      },
      {
        url: PRODUCTION_SERVER_URL,
        description: PROD_SERVER_DESCRIPTION,
      },
    ],
    components: {
      securitySchemes: {
        [SWAGGER_CONSTANTS.BEARER_AUTH_NAME]: {
          type: SWAGGER_CONSTANTS.BEARER_AUTH_TYPE,
          scheme: SWAGGER_CONSTANTS.BEARER_AUTH_SCHEME,
          bearerFormat: SWAGGER_CONSTANTS.BEARER_AUTH_FORMAT,
        },
      },
      schemas: {
        User: {
          type: SWAGGER_CONSTANTS.USER_TYPE,
          required: SWAGGER_CONSTANTS.USER_REQUIRED,
          properties: {
            _id: {
              type: SWAGGER_CONSTANTS.USER_ID_TYPE,
              description: SWAGGER_CONSTANTS.USER_ID_DESCRIPTION,
              example: SWAGGER_CONSTANTS.USER_ID_EXAMPLE,
            },
            username: {
              type: SWAGGER_CONSTANTS.USER_USERNAME_TYPE,
              description: SWAGGER_CONSTANTS.USER_USERNAME_DESCRIPTION,
              example: SWAGGER_CONSTANTS.USER_USERNAME_EXAMPLE,
            },
            email: {
              type: SWAGGER_CONSTANTS.USER_EMAIL_TYPE,
              description: SWAGGER_CONSTANTS.USER_EMAIL_DESCRIPTION,
              example: SWAGGER_CONSTANTS.USER_EMAIL_EXAMPLE,
            },
            password: {
              type: SWAGGER_CONSTANTS.USER_PASSWORD_TYPE,
              description: SWAGGER_CONSTANTS.USER_PASSWORD_DESCRIPTION,
              example: SWAGGER_CONSTANTS.USER_PASSWORD_EXAMPLE,
            },
            role: {
              type: SWAGGER_CONSTANTS.USER_ROLE_TYPE,
              enum: SWAGGER_CONSTANTS.USER_ROLE_ENUM,
              description: SWAGGER_CONSTANTS.USER_ROLE_DESCRIPTION,
              example: SWAGGER_CONSTANTS.USER_ROLE_EXAMPLE,
            },
            createdAt: {
              type: SWAGGER_CONSTANTS.USER_CREATED_AT_TYPE,
              format: SWAGGER_CONSTANTS.USER_CREATED_AT_FORMAT,
              description: SWAGGER_CONSTANTS.USER_CREATED_AT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.USER_CREATED_AT_EXAMPLE,
            },
            updatedAt: {
              type: SWAGGER_CONSTANTS.USER_UPDATED_AT_TYPE,
              format: SWAGGER_CONSTANTS.USER_UPDATED_AT_FORMAT,
              description: SWAGGER_CONSTANTS.USER_UPDATED_AT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.USER_UPDATED_AT_EXAMPLE,
            },
          },
        },
        Product: {
          type: SWAGGER_CONSTANTS.PRODUCT_TYPE,
          required: SWAGGER_CONSTANTS.PRODUCT_REQUIRED,
          properties: {
            _id: {
              type: SWAGGER_CONSTANTS.PRODUCT_ID_TYPE,
              description: SWAGGER_CONSTANTS.PRODUCT_ID_DESCRIPTION,
              example: SWAGGER_CONSTANTS.PRODUCT_ID_EXAMPLE,
            },
            name: {
              type: SWAGGER_CONSTANTS.PRODUCT_NAME_TYPE,
              description: SWAGGER_CONSTANTS.PRODUCT_NAME_DESCRIPTION,
              example: SWAGGER_CONSTANTS.PRODUCT_NAME_EXAMPLE,
            },
            category: {
              type: SWAGGER_CONSTANTS.PRODUCT_CATEGORY_TYPE,
              description: SWAGGER_CONSTANTS.PRODUCT_CATEGORY_DESCRIPTION,
              example: SWAGGER_CONSTANTS.PRODUCT_CATEGORY_EXAMPLE,
            },
            price: {
              type: SWAGGER_CONSTANTS.PRODUCT_PRICE_TYPE,
              description: SWAGGER_CONSTANTS.PRODUCT_PRICE_DESCRIPTION,
              example: SWAGGER_CONSTANTS.PRODUCT_PRICE_EXAMPLE,
            },
            description: {
              type: SWAGGER_CONSTANTS.PRODUCT_DESCRIPTION_TYPE,
              description: SWAGGER_CONSTANTS.PRODUCT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.PRODUCT_DESCRIPTION_EXAMPLE,
            },
            image: {
              type: SWAGGER_CONSTANTS.PRODUCT_IMAGE_TYPE,
              description: SWAGGER_CONSTANTS.PRODUCT_IMAGE_DESCRIPTION,
              example: SWAGGER_CONSTANTS.PRODUCT_IMAGE_EXAMPLE,
            },
            createdAt: {
              type: SWAGGER_CONSTANTS.PRODUCT_CREATED_AT_TYPE,
              format: SWAGGER_CONSTANTS.PRODUCT_CREATED_AT_FORMAT,
              description: SWAGGER_CONSTANTS.PRODUCT_CREATED_AT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.PRODUCT_CREATED_AT_EXAMPLE,
            },
            updatedAt: {
              type: SWAGGER_CONSTANTS.PRODUCT_UPDATED_AT_TYPE,
              format: SWAGGER_CONSTANTS.PRODUCT_UPDATED_AT_FORMAT,
              description: SWAGGER_CONSTANTS.PRODUCT_UPDATED_AT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.PRODUCT_UPDATED_AT_EXAMPLE,
            },
          },
        },
        Cart: {
          type: SWAGGER_CONSTANTS.CART_TYPE,
          required: SWAGGER_CONSTANTS.CART_REQUIRED,
          properties: {
            _id: {
              type: SWAGGER_CONSTANTS.CART_ID_TYPE,
              description: SWAGGER_CONSTANTS.CART_ID_DESCRIPTION,
              example: SWAGGER_CONSTANTS.CART_ID_EXAMPLE,
            },
            userId: {
              type: SWAGGER_CONSTANTS.CART_USER_ID_TYPE,
              description: SWAGGER_CONSTANTS.CART_USER_ID_DESCRIPTION,
              example: SWAGGER_CONSTANTS.CART_USER_ID_EXAMPLE,
            },
            items: {
              type: SWAGGER_CONSTANTS.CART_ITEMS_TYPE,
              description: SWAGGER_CONSTANTS.CART_ITEMS_DESCRIPTION,
              items: {
                type: SWAGGER_CONSTANTS.CART_ITEM_TYPE,
                properties: {
                  productId: {
                    type: SWAGGER_CONSTANTS.CART_ITEM_PRODUCT_ID_TYPE,
                    description: SWAGGER_CONSTANTS.CART_ITEM_PRODUCT_ID_DESCRIPTION,
                    example: SWAGGER_CONSTANTS.CART_ITEM_PRODUCT_ID_EXAMPLE,
                  },
                  quantity: {
                    type: SWAGGER_CONSTANTS.CART_ITEM_QUANTITY_TYPE,
                    description: SWAGGER_CONSTANTS.CART_ITEM_QUANTITY_DESCRIPTION,
                    example: SWAGGER_CONSTANTS.CART_ITEM_QUANTITY_EXAMPLE,
                  },
                },
              },
            },
            createdAt: {
              type: SWAGGER_CONSTANTS.CART_CREATED_AT_TYPE,
              format: SWAGGER_CONSTANTS.CART_CREATED_AT_FORMAT,
              description: SWAGGER_CONSTANTS.CART_CREATED_AT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.CART_CREATED_AT_EXAMPLE,
            },
            updatedAt: {
              type: SWAGGER_CONSTANTS.CART_UPDATED_AT_TYPE,
              format: SWAGGER_CONSTANTS.CART_UPDATED_AT_FORMAT,
              description: SWAGGER_CONSTANTS.CART_UPDATED_AT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.CART_UPDATED_AT_EXAMPLE,
            },
          },
        },
        Order: {
          type: SWAGGER_CONSTANTS.ORDER_TYPE,
          required: SWAGGER_CONSTANTS.ORDER_REQUIRED,
          properties: {
            _id: {
              type: SWAGGER_CONSTANTS.ORDER_ID_TYPE,
              description: SWAGGER_CONSTANTS.ORDER_ID_DESCRIPTION,
              example: SWAGGER_CONSTANTS.ORDER_ID_EXAMPLE,
            },
            userId: {
              type: SWAGGER_CONSTANTS.ORDER_USER_ID_TYPE,
              description: SWAGGER_CONSTANTS.ORDER_USER_ID_DESCRIPTION,
              example: SWAGGER_CONSTANTS.ORDER_TEST_ID_EXAMPLE,
            },
            items: {
              type: SWAGGER_CONSTANTS.ORDER_ITEMS_TYPE,
              description: SWAGGER_CONSTANTS.ORDER_ITEMS_DESCRIPTION,
              items: {
                type: SWAGGER_CONSTANTS.ORDER_ITEM_TYPE,
                required: SWAGGER_CONSTANTS.ORDER_ITEM_REQUIRED,
                properties: {
                  productId: {
                    type: SWAGGER_CONSTANTS.ORDER_ITEM_PRODUCT_ID_TYPE,
                    description: SWAGGER_CONSTANTS.ORDER_ITEM_PRODUCT_ID_DESCRIPTION,
                    example: SWAGGER_CONSTANTS.ORDER_ITEM_PRODUCT_ID_EXAMPLE,
                  },
                  quantity: {
                    type: SWAGGER_CONSTANTS.ORDER_ITEM_QUANTITY_TYPE,
                    description: SWAGGER_CONSTANTS.ORDER_ITEM_QUANTITY_DESCRIPTION,
                    example: SWAGGER_CONSTANTS.ORDER_ITEM_QUANTITY_EXAMPLE,
                  },
                },
              },
            },
            totalAmount: {
              type: SWAGGER_CONSTANTS.ORDER_TOTAL_AMOUNT_TYPE,
              description: SWAGGER_CONSTANTS.ORDER_TOTAL_AMOUNT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.ORDER_TOTAL_AMOUNT_EXAMPLE,
            },
            status: {
              type: SWAGGER_CONSTANTS.ORDER_STATUS_TYPE,
              enum: SWAGGER_CONSTANTS.ORDER_STATUS_ENUM,
              description: SWAGGER_CONSTANTS.ORDER_STATUS_DESCRIPTION,
              example: SWAGGER_CONSTANTS.ORDER_STATUS_EXAMPLE,
            },
            createdAt: {
              type: SWAGGER_CONSTANTS.ORDER_CREATED_AT_TYPE,
              format: SWAGGER_CONSTANTS.ORDER_CREATED_AT_FORMAT,
              description: SWAGGER_CONSTANTS.ORDER_CREATED_AT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.ORDER_CREATED_AT_EXAMPLE,
            },
            updatedAt: {
              type: SWAGGER_CONSTANTS.ORDER_UPDATED_AT_TYPE,
              format: SWAGGER_CONSTANTS.ORDER_UPDATED_AT_FORMAT,
              description: SWAGGER_CONSTANTS.ORDER_UPDATED_AT_DESCRIPTION,
              example: SWAGGER_CONSTANTS.ORDER_UPDATED_AT_EXAMPLE,
            },
          },
        },
      },
    },
  },
  apis: SWAGGER_CONSTANTS.API_PATHS,
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
  app.use(SWAGGER_CONSTANTS.SWAGGER_UI_ROUTE, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;