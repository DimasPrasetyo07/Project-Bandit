# Movie API Documentation

## Endpoints :

List of available endpoints:

# 1. `GET /products`

# 2. `POST /products`

# 3. `GET /products/:id`

# 4. `DELETE /products/:id`

# 5. `GET /categories`

# 6. `POST /categories/`

# 7. `DELETE /categories/:id`

# 8. `POST /users`

# 9. `POST /users/login`

# 10. `POST /users/google-sign-in`

## 11. `GET /histories`

## 12. `PUT /products/:id`

## 13. `PATCH /products/:id`

## 14. `POST /pub/customers`

## 15. `POST /pub/login`

## 16. `POST /pub/google-login`

## 17. `GET /pub/products`

## 18. `GET /pub/products/:id`

## 19. `GET /pub/wishlist`

## 20. `POST /pub/wishlist/:id`

&nbsp;

## 1. GET /products

Description :

- Get all the products data

\*\*Request

- headers:

```json
{
  "access_token": "string"
}
```

\*\*Response (200 - OK)

- body:

```json
[
  {
  "id": Integer,
  "name": String,
  "description": String,
  "price": Integer,
  "stock": Integer,
  "imgUrl": String,
  "categoryId": Integer,
  "authorId": Integer,
  "status": String,
  "createdAt": Date,
  "updatedAt": Date,
  "userId": {
      "id": Integer,
      "username": String,
      "email": String,
      "password": String,
      "role": String,
      "phoneNumber": String,
      "address": String,
      "createdAt": Date,
      "updatedAt": Date
    },
  "Category": {
    "id": String,
    "name": String,
    "createdAt": Date,
    "updatedAt": Date
    }
  }
  .....
]
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

## 2. POST /products

Description:

- Create a new product data

\*\*REQUEST

- headers:

```json
{
  "access_token": "string"
}
```

- body :

```json
  {
  "name": String,
  "description": String,
  "price": Integer,
  "stock": Integer,
  "imgUrl": String,
  "categoryId": Integer,
  }

```

\*\*RESPONSE (201 - Created)

- body :

```json
{
  "status": String,
  "id": Integer,
  "name": String,
  "description": String,
  "price": Integer,
  "stock": Integer,
  "imgUrl": String,
  "categoryId": Integer,
  "authorId": Integer,
  "createdAt": Date,
  "updatedAt": Date
}
```

\*\*RESPONSE (400 - Bad Request)

- body

```json
{
  "msg": "product name is required"
}
OR
{
  "description": "description is required"
}
OR
{
  "price": "product price is required"
}
OR
{
  "price": "minimum price for a product is 1000"
}
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

## 3. GET /products/:id

Description:

- Get one product data by id

\*\*REQUEST

- headers

```json
{
  "access_token": "string"
}
```

\*\*RESPONSE (200 - OK)

-body

```json
{
  "id": Integer,
  "name": String,
  "description": String,
  "price": Integer,
  "stock": Integer,
  "imgUrl": String,
  "categoryId": Integer,
  "status": String,
  "authorId": Integer,
  "createdAt": Date,
  "updatedAt": Date
}
```

\*\*RESPONSE (404 - Not Found)

-body

```json
{
  "msg": "Data Not Found"
}
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

## 4. DELETE /products/:id

Description:

- Delete one product data by id

\*\*REQUEST

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer(required)"
}
```

\*\*RESPONSE (200 - OK)

```json
{
  "msg": "(Product name) success to delete"
}
```

\*\*RESPONSE (404 - Not Found)

```json
{
  "msg": "Data Not Found"
}
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

## 5. GET /categories

Description :

- Get all the categories data

\*\*Request

- headers:

```json
{
  "access_token": "string"
}
```

\*\*Response (200 - OK)

- body:

```json
[ 
  {
        "id": Integer,
        "name": String,
        "createdAt": Date,
        "updatedAt": Date
  },
  {
        "id": Integer,
        "name": String,
        "createdAt": Date,
        "updatedAt": Date
  },
  .....
]
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

## 6. POST /categories

Description:

- Create a new category data

\*\*REQUEST

- headers:

```json
{
  "access_token": "string"
}
```

- body :

```json
  {
  "name": String
  }

```

\*\*RESPONSE (201 - Created)

- body :

```json
{
  "id": Integer,
  "name": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

\*\*RESPONSE (400 - Bad Request)

- body

```json
{
  "msg": "category is required"
}
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

## 7. DELETE /categories/:id

Description:

- Delete one category data by id

\*\*REQUEST

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer(required)"
}
```

\*\*RESPONSE (200 - OK)

```json
{
  "msg": "(Category name) success to delete"
}
```

\*\*RESPONSE (404 - Not Found)

```json
{
  "msg": "Data Not Found"
}
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

## 8. POST /users

Description:

- Create a new user data

\*\*REQUEST

- body :

```json
  {
  "username": String,
  "email": String,
  "password": Integer,
  "phoneNumber": String,
  "address": Integer,
  }

```

\*\*RESPONSE (201 - Created)

- body :

```json
{
  "id": Integer,
  "email": String
}
```

\*\*RESPONSE (400 - Bad Request)

- body

```json
{
  "msg": "format email is required"
}
OR
{
  "msg": "Your email already used"
}
OR
{
  "msg": "password is required"
}
OR
{
  "price": "minimum password is 5 characters"
}
```

## 9. POST /users/login

Description:

- Generate access token required to hit endpoint /products and /categories

\*\*REQUEST

- body :

```json
  {
  "email": String,
  "password": Integer,
  }

```

\*\*RESPONSE (200 - OK)

- body :

```json
{
    "access_token": String,
    "id": Integer,
    "role": String,
    "username": String
}
```

\*\*RESPONSE (401 - Unauthorized)

- body

```json
{
  "msg": "Email/Password Incorrect"
}
```

## 10. POST /users/google-sign-in

Description:

- Generate access token by using Google Oauth required to hit endpoint /products and /categories

\*\*REQUEST

- headers :

```js
{
  "google_token": "string"
}
```

\*\*RESPONSE (200 - OK)

- body :

```json
{
    "access_token": String,
    "id": Integer,
    "role": String,
    "username": String
}
```

\*\*RESPONSE (401 - Unauthorized)

- body

```json
{
  "msg": "Email/Password Incorrect"
}
```

## 11. GET /histories

Description :

- Get all the histories data

\*\*Request

- headers:

```json
{
  "access_token": "string"
}
```

\*\*Response (200 - OK)

- body:

```json
[ 
  {
        "id": Integer,
        "name": String,
        "description": String,
        "updatedBy": String,
        "createdAt": Date,
        "updatedAt": Date
  },
  {
        "id": Integer,
        "name": String,
        "description": String,
        "updatedBy": String,
        "createdAt": Date,
        "updatedAt": Date
  },
  .....
]
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

## 12. PUT /products/:id

Description:

- Edit one product data by id

\*\*REQUEST

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer(required)"
}
```

- body :

```json
  {
  "name": String,
  "description": String,
  "price": Integer,
  "stock": Integer,
  "imgUrl": String,
  "categoryId": Integer,
  }

```


\*\*RESPONSE (201 - OK)

-body

```json

[
    1,
    [
        {
            "id": Integer,
            "name": String,
            "description": String,
            "price": Integer,
            "stock": Integer,
            "imgUrl": String,
            "categoryId": Integer,
            "authorId": Integer,
            "status": String,
            "createdAt": Date,
            "updatedAt": Date
        }
    ]
]

```

\*\*RESPONSE (404 - Not Found)

-body

```json
{
  "msg": "Data Not Found"
}
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

## 13. PATCH /products/:id

Description:

- Edit single product status 

\*\*REQUEST

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer(required)"
}
```

- body :

```json
  {
    "status": String
  }

```


\*\*RESPONSE (201 - OK)

-body

```json

"Entity with id ${entityId} has been updated from ${statusBeforeUpdated} into ${statusAfterUpdated}"

```

\*\*RESPONSE (404 - Not Found)

-body

```json
{
  "msg": "Data Not Found"
}
```

\*\*Response (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```



## 14. POST /pub/customers

Description:

- Create a new customer data

\*\*REQUEST

- body :

```json
  {
  "username": String,
  "email": String,
  "password": Integer,
  "phoneNumber": String,
  "address": Integer,
  }

```

\*\*RESPONSE (201 - Created)

- body :

```json
{
  "id": Integer,
  "email": String
}
```

\*\*RESPONSE (400 - Bad Request)

- body

```json
{
  "msg": "format email is required"
}
OR
{
  "msg": "Your email already used"
}
OR
{
  "msg": "password is required"
}
OR
{
  "price": "minimum password is 5 characters"
}
```

## 15. POST /pub/login

Description:

- Generate access token required to hit endpoint /pub/wishlist

\*\*REQUEST

- body :

```json
  {
  "email": String,
  "password": Integer,
  }

```

\*\*RESPONSE (200 - OK)

- body :

```json
{
    "access_token": String,
    "id": Integer,
    "role": String,
    "username": String
}
```

\*\*RESPONSE (401 - Unauthorized)

- body

```json
{
  "msg": "Email/Password Incorrect"
}
```

## 16. POST /pub/google-login
- Generate access token by using Google Oauth required to hit endpoint /pub/wishlist

\*\*REQUEST

- headers :

```js
{
  "google_token": "string"
}
```

\*\*RESPONSE (200 - OK)

- body :

```json
{
    "access_token": String,
    "id": Integer,
    "role": String,
    "username": String
}
```

\*\*RESPONSE (401 - Unauthorized)

- body

```json
{
  "msg": "Email/Password Incorrect"
}
```

## 17. GET /pub/products
Description :

- Get all the products data 


\*\*Response (200 - OK)

- body:

```json

{
  "count": Integer,
  "rows": [
  {
  "id": Integer,
  "name": String,
  "description": String,
  "price": Integer,
  "stock": Integer,
  "imgUrl": String,
  "categoryId": Integer,
  "authorId": Integer,
  "status": String,
  "createdAt": Date,
  "updatedAt": Date,
  },
  {.....}
  ]
}

```

## 18. GET /pub/products/:id
Description:

- Get one product data by id


\*\*RESPONSE (200 - OK)

-body

```json
{
  "id": Integer,
  "name": String,
  "description": String,
  "price": Integer,
  "stock": Integer,
  "imgUrl": String,
  "categoryId": Integer,
  "status": String,
  "authorId": Integer,
  "createdAt": Date,
  "updatedAt": Date
}
```

\*\*RESPONSE (404 - Not Found)

-body

```json
{
  "msg": "Data Not Found"
}
```

## 19. GET /pub/wishlist
Description :

- Get all the wishlist data 

\*\*Request

- headers:

```json
{
  "access_token": "string"
}
```

\*\*Response (200 - OK)

- body:

```json
[
  {
    "UserId": Integer,
    "ProductId": Integer,
    "createdAt": Date,
    "updatedAt": Date,
    "Product" : {
      "id": Integer,
      "name": String,
      "description": String,
      "price": Integer,
      "stock": Integer,
      "imgUrl": String,
      "categoryId": Integer,
      "authorId": Integer,
      "status": String,
      "createdAt": Date,
      "updatedAt": Date,
      "Category": {
        "id": Integer,
        "name": String
      }
    }
  },
  {
    .....
  }
]

```

\*\*RESPONSE (401  Unauthorized)

-body

```json
{
  "msg": "Please Login First"
}

```

\*\*RESPONSE (403 - Forbidden)

-body

```json
{
  "msg": "You do not have permission"
}

```

## 20. POST /pub/wishlist/:id
Description:

- Add a product by id to wishlist

\*\*REQUEST

- headers:

```json
{
  "access_token": "string"
}
```

\*\*RESPONSE (201 - Created)

- body :

```json
{
  "UserId": Integer,
  "ProductId": Integer,
  "createdAt": Date,
  "updatedAt": Date
}
```

\*\*RESPONSE (404 - Not Found)

- body

```json
{
  "msg": "Data Not Found"
}
```

\*\*RESPONSE (401 - Unauthorized)

```json
{
  "msg": "Please Login First"
}
```

\*\*RESPONSE (403 - Forbidden)

```json
{
  "msg": "You do not have permission"
}
```

## 21. GLOBAL ERROR

\*\*RESPONSE (500 - Internal Server Error)

```json
{
  "msg": "Internal Server Error"
}
```
