/**
 * @file constants.mjs
 * This file contains various constants used throughout the application, including authentication messages, error messages, and user roles.
 * These constants help maintain consistency and avoid hardcoding strings in multiple places.
 * @module constants
 * @version 1.0.0
 */


/**
 * @constant {Object} AUTH_MESSAGES
 * @property {string} REGISTER_SUCCESS - Message displayed when a user is successfully registered.
 * @property {string} LOGIN_SUCCESS - Message displayed when a user successfully logs in.
 * @description Contains messages related to user authentication actions.
 */
export const AUTH_MESSAGES = {
  REGISTER_SUCCESS: "User registered",
  LOGIN_SUCCESS: "Login successful"
};

/**
 * @constant {Object} ERROR_MESSAGES
 * @property {string} SERVER_ERROR - Message displayed when there is an internal server error.
 * @property {string} INVALID_CREDENTIALS - Message displayed when the user provides invalid email or password.
 * @description Contains error messages used in the application.
 */

export const ERROR_MESSAGES = {
  SERVER_ERROR: "Internal Server Error",
  INVALID_CREDENTIALS: "Invalid email or password"
};

/**
 * @constant {Object} ROLES
 * @property {string} CUSTOMER - Role for regular customers.
 * @property {string} ADMIN - Role for administrators.
 * @description Contains user roles used in the application.
 */
export const ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin"
};

/** 
 * @constant {Object} ROUTES
 * @property {string} ROOT - Route for the root path.
 * @property {string} BY_ID - Route for accessing resources by their ID.
 * @property {string} REGISTER - Route for user registration.
 * @property {string} LOGIN - Route for user login.
 * @property {string} PRODUCTS - Route for accessing products.
 * @description Contains route paths used in the application.
 */
export const ROUTES = {
  ROOT: "/",
  BY_ID: "/:id",
  REGISTER: "/register",
  LOGIN: "/login",
  PRODUCTS: "/products",
};

/**
 * @constant {Object} HTTP_STATUS_CODES
 * @property {number} OK - HTTP status code for successful requests (200).
 * @property {number} CREATED - HTTP status code for resource creation (201).
 * @property {number} BAD_REQUEST - HTTP status code for client errors (400).
 * @property {number} UNAUTHORIZED - HTTP status code for unauthorized access (401).
 * @property {number} FORBIDDEN - HTTP status code for forbidden access (403).
 * @property {number} NOT_FOUND - HTTP status code for resource not found (404).
 * @property {number} SERVER_ERROR - HTTP status code for internal server errors (500).
 * @description Contains common HTTP status codes used in the application.
 */

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

/**
 * @constant {Object} SWAGGER_TAGS
 * @property {string} AUTH - Tag for authentication-related endpoints.
 * @property {string} PRODUCTS - Tag for product-related endpoints.
 * @description Contains tags used in Swagger documentation for API endpoints.
 */
export const SWAGGER_TAGS = {
  AUTH: "Auth",
  PRODUCTS: "Products",
};


/**
 * @constant {Object} TOKEN_CONSTANTS
 * @property {string} EXPIRES_IN - Duration for which the authentication token is valid.
 * @description Contains constants related to authentication tokens.
 */

export const TOKEN_CONSTANTS = {
  EXPIRES_IN: "1d",
};


/**
 * @constant {Object} PRODUCT_MESSAGES
 * @property {string} ADDED - Message displayed when a product is successfully added.
 * @property {string} UPDATED - Message displayed when a product is successfully updated.
 * @property {string} DELETED - Message displayed when a product is successfully deleted.
 * @description Contains messages related to product management actions.
 */

export const PRODUCT_MESSAGES = {
  ADDED: "Product added",
  UPDATED: "Product updated",
  DELETED: "Product deleted",
};


/**
 * @constant {Object} COLLECTION_NAMES
 * @property {string} USER - Name of the user collection in the database.
 * @property {string} PRODUCT - Name of the product collection in the database.
 * @property {string} CART - Name of the cart collection in the database.
 * @property {string} ORDER - Name of the order collection in the database.
 * @description Contains names of collections used in the database.
 */

export const COLLECTION_NAMES = {
  USER: "User",
  PRODUCT: "Product",
  CART: "Cart",
  ORDER: "Order",
};

/**
 * @constant {Object} CART_FIELDS
 * @property {string} USER_ID - Field for the user's ID in the cart.
 * @property {string} ITEMS - Field for the items in the cart.
 * @description Contains field names used in cart-related operations.
 */
export const CART_FIELDS = {
  USER_ID: "userId",
  ITEMS: "items",
};

/**
 * @constant {Object} PRODUCT_FIELDS
 * @property {string} PRODUCT_ID - Field for the product's ID in the cart.
 * @property {string} QUANTITY - Field for the quantity of the product in the cart.
 * @property {string} NAME - Field for the product's name.
 * @property {string} CATEGORY - Field for the product's category.
 * @property {string} PRICE - Field for the product's price.
 * @property {string} DESCRIPTION - Field for the product's description.
 * @property {string} IMAGE - Field for the product's image URL or path.
 * @description Contains field names used in product-related operations.
 */
export const PRODUCT_FIELDS = {
  PRODUCT_ID: "productId",
  QUANTITY: "quantity", 
  NAME: "name",
  CATEGORY: "category",
  PRICE: "price",
  DESCRIPTION: "description",
  IMAGE: "image",

};


/** 
 * @constant {Object} ORDER_FIELDS
 * @property {string} USER_ID - Field for the user's ID in the order.
 * @property {string} ITEMS - Field for the items in the order.
 * @property {string} TOTAL_AMOUNT - Field for the total amount of the order.
 * @property {string} STATUS - Field for the status of the order.
 * @description Contains field names used in order-related operations.
 */
export const ORDER_FIELDS = {
  USER_ID: "userId",
  ITEMS: "items",
  TOTAL_AMOUNT: "totalAmount",
  STATUS: "status",
};

/**
 * @constant {Object} ORDER_STATUS
 * @property {string} PLACED - Status indicating the order has been placed.
 * @property {string} SHIPPED - Status indicating the order has been shipped.
 * @property {string} DELIVERED - Status indicating the order has been delivered.
 * @description Contains possible statuses for orders in the application.
 */

export const ORDER_STATUS = {
  PLACED: "placed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
};

/**
 * @constant {Object} USER_ROLES
 * @property {string} CUSTOMER - Role for regular customers.
 * @property {string} ADMIN - Role for administrators.
 * @description Contains user roles used in the application.
 */

export const USER_ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
};

/**
 * @constant {Object} SWAGGER_CONSTANTS
 * @property {string} OPENAPI_VERSION - Version of the OpenAPI specification.  
 * @property {string} API_TITLE - Title of the API.
 * @property {string} API_VERSION - Version of the API.
 * @property {string} API_DESCRIPTION - Description of the API.
 * @property {string} SERVER_URL - URL of the server where the API is hosted.
 * @property {string} SERVER_DESCRIPTION - Description of the server.
 * @property {string} BEARER_AUTH_TYPE - Type of authentication used in the API.
 * @property {string} BEARER_AUTH_SCHEME - Scheme used for bearer authentication.
 * @property {string} BEARER_AUTH_FORMAT - Format of the bearer authentication token.
 * @property {Object} USER_SCHEMA - Schema definition for user objects in the API.
 * @property {Object} PRODUCT_SCHEMA - Schema definition for product objects in the API.
 * @property {Object} CART_SCHEMA - Schema definition for cart objects in the API.
 * @property {Object} ORDER_SCHEMA - Schema definition for order objects in the API.
 * @property {Array<string>} API_PATHS - Array of paths to the API route files.
 * @description Contains constants used for Swagger documentation and API schema definitions.
 */

export const SWAGGER_CONSTANTS = {
  OPENAPI_VERSION: "3.0.0",
  API_TITLE: "E-Commerce API",
  API_VERSION: "1.0.0",
  API_DESCRIPTION: "API documentation for the E-Commerce application",
  SERVER_URL: `http://localhost:${process.env.PORT || 3000}`,
  SERVER_DESCRIPTION: "Development server",
  BEARER_AUTH_NAME: "bearerAuth",
  BEARER_AUTH_TYPE: "http",
  BEARER_AUTH_SCHEME: "bearer",
  BEARER_AUTH_FORMAT: "JWT",
  USER_TYPE: "object",
  USER_REQUIRED: ["username", "email", "password", "role"],
  USER_ID_TYPE: "string",
  USER_ID_DESCRIPTION: "The unique identifier for the user",
  USER_ID_EXAMPLE: "60d0fe4f5311236168a109ca",
  USER_USERNAME_TYPE: "string",
  USER_USERNAME_DESCRIPTION: "The username of the user",
  USER_USERNAME_EXAMPLE: "john_doe",
  USER_EMAIL_TYPE: "string",
  USER_EMAIL_DESCRIPTION: "The email address of the user",
  USER_EMAIL_EXAMPLE: "john.doe@example.com",
  USER_PASSWORD_TYPE: "string",
  USER_PASSWORD_DESCRIPTION: "The hashed password of the user (not returned in responses)",
  USER_PASSWORD_EXAMPLE: "$2a$10$hashedpassword",
  USER_ROLE_TYPE: "string",
  USER_ROLE_ENUM: ["customer", "admin"],
  USER_ROLE_DESCRIPTION: "The role of the user",
  USER_ROLE_EXAMPLE: "customer",
  USER_CREATED_AT_TYPE: "string",
  USER_CREATED_AT_FORMAT: "date-time",
  USER_CREATED_AT_DESCRIPTION: "Timestamp when the user was created",
  USER_CREATED_AT_EXAMPLE: "2025-07-07T14:56:00.000Z",
  USER_UPDATED_AT_TYPE: "string",
  USER_UPDATED_AT_FORMAT: "date-time",
  USER_UPDATED_AT_DESCRIPTION: "Timestamp when the user was last updated",
  USER_UPDATED_AT_EXAMPLE: "2025-07-07T14:56:00.000Z",
  PRODUCT_TYPE: "object",
  PRODUCT_REQUIRED: ["name", "category", "price"],
  PRODUCT_ID_TYPE: "string",
  PRODUCT_ID_DESCRIPTION: "The unique identifier for the product",
  PRODUCT_ID_EXAMPLE: "60d0fe4f5311236168a109cb",
  PRODUCT_NAME_TYPE: "string",
  PRODUCT_NAME_DESCRIPTION: "The name of the product",
  PRODUCT_NAME_EXAMPLE: "Laptop",
  PRODUCT_CATEGORY_TYPE: "string",
  PRODUCT_CATEGORY_DESCRIPTION: "The category of the product",
  PRODUCT_CATEGORY_EXAMPLE: "Electronics",
  PRODUCT_PRICE_TYPE: "number",
  PRODUCT_PRICE_DESCRIPTION: "The price of the product",
  PRODUCT_DESCRIPTION_TYPE: "string",
  PRODUCT_DESCRIPTION: "The description of the product",
  PRODUCT_DESCRIPTION_EXAMPLE: "A high-performance laptop",
  PRODUCT_IMAGE_TYPE: "string",
  PRODUCT_IMAGE_DESCRIPTION: "URL or path to the product image",
  PRODUCT_IMAGE_EXAMPLE: "http://example.com/images/laptop.jpg",
  PRODUCT_CREATED_AT_TYPE: "string",
  PRODUCT_CREATED_AT_FORMAT: "date-time",
  PRODUCT_CREATED_AT_DESCRIPTION: "Timestamp when the product was created",
  PRODUCT_CREATED_AT_EXAMPLE: "2025-07-07T14:56:00.000Z",
  PRODUCT_UPDATED_AT_TYPE: "string",
  PRODUCT_UPDATED_AT_FORMAT: "date-time",
  PRODUCT_UPDATED_AT_DESCRIPTION: "Timestamp when the product was last updated",
  PRODUCT_UPDATED_AT_EXAMPLE: "2025-07-07T14:56:00.000Z",
  CART_TYPE: "object",
  CART_REQUIRED: ["userId"],
  CART_ID_TYPE: "string",
  CART_ID_DESCRIPTION: "The unique identifier for the cart",
  CART_ID_EXAMPLE: "60d0fe4f5311236168a109cc",
  CART_USER_ID_TYPE: "string",
  CART_USER_ID_DESCRIPTION: "Reference to the user who owns the cart",
  CART_USER_ID_EXAMPLE: "60d0fe4f5311236168a109ca",
  CART_ITEMS_TYPE: "array",
  CART_ITEMS_DESCRIPTION: "Array of items in the cart",
  CART_ITEM_TYPE: "object",
  CART_ITEM_PRODUCT_ID_TYPE: "string",
  CART_ITEM_PRODUCT_ID_DESCRIPTION: "Reference to the product in the cart",
  CART_ITEM_PRODUCT_ID_EXAMPLE: "60d0fe4f5311236168a109cb",
  CART_ITEM_QUANTITY_TYPE: "number",
  CART_ITEM_QUANTITY_DESCRIPTION: "Quantity of the product in the cart",
  CART_CREATED_AT_TYPE: "string",
  CART_CREATED_AT_FORMAT: "date-time",
  CART_CREATED_AT_DESCRIPTION: "Timestamp when the cart was created",
  CART_CREATED_AT_EXAMPLE: "2025-07-07T14:56:00.000Z",
  CART_UPDATED_AT_TYPE: "string",
  CART_UPDATED_AT_FORMAT: "date-time",
  CART_UPDATED_AT_DESCRIPTION: "Timestamp when the cart was last updated",
  CART_UPDATED_AT_EXAMPLE: "2025-07-07T14:56:00.000Z",
  ORDER_TYPE: "object",
  ORDER_REQUIRED: ["userId", "items", "totalAmount", "status"],
  ORDER_ID_TYPE: "string",
  ORDER_ID_DESCRIPTION: "The unique identifier for the order",
  ORDER_ID_EXAMPLE: "60d0fe4f5311236168a109cd",
  ORDER_USER_ID_TYPE: "string",
  ORDER_USER_ID_DESCRIPTION: "Reference to the user who placed the order",
  ORDER_USER_ID_EXAMPLE: "60d0fe4f5311236168a109ca",
  ORDER_ITEMS_TYPE: "array",
  ORDER_ITEMS_DESCRIPTION: "Array of items in the order",
  ORDER_ITEM_TYPE: "object",
  ORDER_ITEM_REQUIRED: ["productId", "quantity"],
  ORDER_ITEM_PRODUCT_ID_TYPE: "string",
  ORDER_ITEM_PRODUCT_ID_DESCRIPTION: "Reference to the product in the order",
  ORDER_ITEM_PRODUCT_ID_EXAMPLE: "60d0fe4f5311236168a109cb",
  ORDER_ITEM_QUANTITY_TYPE: "number",
  ORDER_ITEM_QUANTITY_DESCRIPTION: "Quantity of the product in the order",
  ORDER_TOTAL_AMOUNT_TYPE: "number",
  ORDER_TOTAL_AMOUNT_DESCRIPTION: "Total amount for the order",
  ORDER_STATUS_TYPE: "string",
  ORDER_STATUS_ENUM: ["placed", "shipped", "delivered"],
  ORDER_STATUS_DESCRIPTION: "Status of the order",
  ORDER_STATUS_EXAMPLE: "placed",
  ORDER_CREATED_AT_TYPE: "string",
  ORDER_CREATED_AT_FORMAT: "date-time",
  ORDER_CREATED_AT_DESCRIPTION: "Timestamp when the order was created",
  ORDER_CREATED_AT_EXAMPLE: "2025-07-07T14:56:00.000Z",
  ORDER_UPDATED_AT_TYPE: "string",
  ORDER_UPDATED_AT_FORMAT: "date-time",
  ORDER_UPDATED_AT_DESCRIPTION: "Timestamp when the order was last updated",
  ORDER_UPDATED_AT_EXAMPLE: "2025-07-07T14:56:00.000Z",
  API_PATHS: [
    "./src/apps/auth/routers/auth.route.mjs",
    "./src/apps/products/routers/prouduct.route.mjs",
  ],
  SWAGGER_UI_ROUTE: "/api-docs",
};;

/** 
 * @constant {Object} AUTH_CONSTANTS
 * @property {string} BEARER_PREFIX - Prefix for bearer authentication tokens.
 * @property {string} TOKEN_MISSING_ERROR - Error message when the authorization token is missing or invalid.
 * @property {string} TOKEN_INVALID_ERROR - Error message when the token is invalid or expired.
 * @description Contains constants related to authentication, including error messages and token formats.
 */


export const AUTH_CONSTANTS = {
  BEARER_PREFIX: "Bearer ",
  TOKEN_MISSING_ERROR: "Authorization token missing or invalid",
  TOKEN_INVALID_ERROR: "Invalid or expired token",
};

/**
 * @constant {Object} ERROR_CONSTANTS
 * @property {string} DEFAULT_ERROR_MESSAGE - Default error message displayed when an unexpected error occurs.
 * @description Contains constants related to error handling in the application.
 */

export const ERROR_CONSTANTS = {
  DEFAULT_ERROR_MESSAGE: "Something went wrong. Please try again later.",
};

/**
 * @constant {Object} ROLE_CONSTANTS
 * @property {string} ROLE_ADMIN - Role identifier for administrators.
 * @property {string} ROLE_CUSTOMER - Role identifier for customers.
 * @property {string} ACCESS_DENIED_ERROR - Error message displayed when access is denied due to insufficient permissions.
 * @description Contains constants related to user roles and access control in the application.
 */

export const ROLE_CONSTANTS = {
  ROLE_ADMIN: "admin",
  ROLE_CUSTOMER: "customer",
  ACCESS_DENIED_ERROR: "Access denied. Insufficient permissions.",
};

/**
 * @constant {Object} SEARCH_CONSTANTS
 * @property {string} REGEX_CASE_INSENSITIVE - Regular expression flag for case-insensitive searches.
 * @description Contains constants related to search functionality in the application.
 */

export const SEARCH_CONSTANTS = {
  REGEX_CASE_INSENSITIVE: "i",
};


/**
 * @constant {Object} APP_CONSTANTS
 * @property {string} AUTH_ROUTER_PATH - Path to the authentication router module.
 * @property {string} PRODUCT_ROUTER_PATH - Path to the product router module.
 * @property {string} ERROR_MIDDLEWARE_PATH - Path to the error handling middleware module.
 * @property {string} SWAGGER_CONFIG_PATH - Path to the Swagger configuration module.
 * @property {string} MONGO_USE_NEW_URL_PARSER - MongoDB connection option for using the new URL parser.
 * @property {string} MONGO_USE_UNIFIED_TOPOLOGY - MongoDB connection option for using the unified topology.
 * @property {string} MONGO_CONNECTION_SUCCESS - Message displayed when successfully connected to MongoDB.
 * @property {string} MONGO_CONNECTION_ERROR - Message displayed when there is an error connecting to MongoDB.
 * @property {string} AUTH_ROUTE_PREFIX - Prefix for authentication routes.
 * @property {string} PRODUCT_ROUTE_PREFIX - Prefix for product routes.
 * @property {string} SERVER_START_MESSAGE - Message displayed when the server starts successfully.
 * @property {string} SWAGGER_UI_MESSAGE - Message displayed when Swagger UI is available.
 * @property {string} SWAGGER_UI_PATH - Path to access the Swagger UI documentation
 * @description Contains various constants used throughout the application, including paths, messages, and configuration options.
 */

export const APP_CONSTANTS = {
  AUTH_ROUTER_PATH: "./apps/auth/routers/auth.route.mjs",
  PRODUCT_ROUTER_PATH: "./apps/products/routers/product.route.mjs",
  ERROR_MIDDLEWARE_PATH: "./middlewares/error.middleware.mjs",
  SWAGGER_CONFIG_PATH: "./infrasructure/config/swaggerConfig.mjs",
  MONGO_USE_NEW_URL_PARSER: "useNewUrlParser",
  MONGO_USE_UNIFIED_TOPOLOGY: "useUnifiedTopology",
  MONGO_CONNECTION_SUCCESS: "✅ Connected to MongoDB",
  MONGO_CONNECTION_ERROR: "❌ MongoDB connection error:",
  AUTH_ROUTE_PREFIX: "/api/auth",
  PRODUCT_ROUTE_PREFIX: "/api/products",
  SERVER_START_MESSAGE: "🚀 Server running on http://localhost:",
  SWAGGER_UI_MESSAGE: "📜 Swagger UI available at http://localhost:",
  SWAGGER_UI_PATH: "/api-docs",
};

/**
 * @constant {Array<string>} CORS_ORIGINS
 * @description List of allowed origins for CORS requests.
 * This array contains the URLs that are permitted to access the API resources.
 * @type {Array<string>}
 */

export const CORS_ORIGINS = [
  "http://localhost:3000",
  "https://products-api-6psx.onrender.com"
];

/**
 * @constant {string} PRODUCTION_SERVER_URL
 * @description The URL of the production server where the application is hosted.
 * This constant is used to define the base URL for API requests in production environments.
 * @type {string}
 */
export const PRODUCTION_SERVER_URL = "https://products-api-6psx.onrender.com";

/**
 * @constant {string} DEVELOPMENT_SERVER_URL
 * @description The URL of the development server where the application is hosted.
 * This constant is used to define the base URL for API requests in development environments.
 */
export const DESC = {
  EXPRESS_INIT: "Initializes and configures the Express application.",
  JSON_MIDDLEWARE: "Middleware to parse incoming JSON requests.",
  MONGO_CONNECT: "Connects to MongoDB using the provided MONGO_URI environment variable.",
  MONGO_CONNECT_ERROR: "If the connection fails, logs the error and exits the process.",
  AUTH_ROUTE: "Mounts the authentication routes under /api/auth.",
  PRODUCT_ROUTE: "Mounts the product routes under /api/products.",
  SWAGGER_CONFIG: "Configures Swagger UI for API documentation.",
  ERROR_MIDDLEWARE: "Applies the error handling middleware to catch and process errors.",
  SERVER_START: "Starts the Express server on the specified port.",
  SWAGGER_SETUP: "Configures Swagger UI for the Express application.",
  SWAGGER_SERVE: "Serves the Swagger UI at /api-docs.",
};

/** 
 * @constant {Object} FUNCTION_NAMES
 * @property {string} SETUP_SWAGGER - Name of the function that sets up Swagger UI.
 * @description Contains names of functions used in the application, primarily for Swagger setup.
 */

export const FUNCTION_NAMES = {
  SETUP_SWAGGER: "setupSwagger",
};

/**
 * @constant {Object} PARAMS
 * @property {string} APP - Parameter name for the application context.
 * @description Contains parameter names used in the application, primarily for route handlers and middleware.
 */
export const PARAMS = {
  APP: "app",
};

/**
 * @constant {Object} RETURN
 * @property {string} VOID - Represents a void return type.
 * @description Contains return types used in the application, primarily for function return values.
 */

export const RETURN = {
  VOID: "void",
};

/**
 * @constant {string} PROD_SERVER_DESCRIPTION
 * @description Description of the production server.
 * This constant is used to provide a brief description of the production server in the API documentation.
 */
export const PROD_SERVER_DESCRIPTION = "Production server";
