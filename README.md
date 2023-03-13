# Products API (Coding Ninjas API Assignment):

Coding Ninjas Backend assignemnt, of Products related eCommerce api. Uses Node (Express), MongoDB and Redis.

Features:
- Use of middlewares (for validation of request fields, and caching).
- Write-through caching using Redis.
- CRUD for products with REST-APIs (see API description below).

Backend hosted at: https://products-api-ux8g.onrender.com/
### **Code Walkthrough:** 

[![Code Walkthrough](https://img.youtube.com/vi/CN4HpTUrV2E/maxresdefault.jpg)](https://youtu.be/CN4HpTUrV2E)


------------------------------------------------------------------------------------------
## APIs
### Create Product
<p>
<details>
 <summary><code>POST</code> <code><b>/products/create</b></code> <i>Creates a product with `name` and `quantity`.</i></summary>

##### Body Parameters

> | param      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  required | string   | non empty name of product  |
> | quantity      |  required | number   | number in range [0,10,000]  |

##### Example URL

> ```javascript
>  https://products-api-ux8g.onrender.com/products/create
> ```

</details>
</p></br>

### Get product(s)
<p>
<details>
 <summary><code>GET</code> <code><b>/{:productId}</b></code> <i>Get a product by id.</i></summary>

##### Path Parameters: /products/:productId

> | path-param      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | productId      |  required | mongoDb.ObjectId   | id of product  |

##### Example URL

> ```javascript
>  https://products-api-ux8g.onrender.com/products/640e382a014d5341380a599a
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/products/</b></code> <i>Gets all products</i></summary>

##### Example cURL

> ```javascript
>  https://products-api-ux8g.onrender.com/products/
> ```

</details>
</p></br>

### Updates quantity of existing product

<p><details>
  <summary><code>PATCH</code> <code><b>products/{productId}/update_quantity?number={number}</b></code> <i>Updates quantity of product with productId. Final quantity only allowed in [0,10,000]</i></summary>

##### Path Params

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `productId` |  required | MongoDB.OjecttId   | MongoDB unique Id of product        |
> | `number` |  required | number   | Number to add or substract to updated quantity. In range [-10_000,10_000].        |

##### Example URL

> ```javascript
>  http://localhost:8001/products/640e382a014d5341380a599a/update_quantity?number=20
> ```

</details></p></br>

### Deleting existing product by ID:

<p><details>
  <summary><code>DELETE</code> <code><b>/products/:productId</b></code> <code>Deletes a specific product by ID</code></summary>

##### Path Parameters: /products/:productId

> | path-param      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | productId      |  required | mongoDb.ObjectId   | id of product  |

##### Example URL

> ```javascript
>  http://localhost:8001/products/640e382a014d5341380a599a
> ```

</details></p></br>

------------------------------------------------------------------------------------------

## Caching flow:

### **Write through Cache**: 
#### **Read-request flow:**:
```mermaid
flowchart LR
subgraph "READ: When Cached Results"
  n[node] -->|2. requests cache| r[Redis]
  r[Redis] -->|3. results present in cache| n
  n -->|4. Respond to client| u[User]
  u-->|1. Get-Request|n
end
```
```mermaid
flowchart LR
subgraph "READ: When Un-Cached Results"
  n1 -->|2. requests\n cache| r1[Redis]  
  r1[Redis] -->|3. results not\n present in cache| n1
  n1 -->|4. requests\n DB| p1[(MongoDB)]
  p1 -->|5. responds| n1
  n1 -->|6. update\n cache| r1
  u1-->|1. Get-Request| n1[node]
  r1 -->|7. caching\n response| n1
  n1 -->|8. respond\n to User| u1[User]
end
```
#### **Write-request flow:**:
```mermaid
flowchart LR
subgraph "WRITE: When Cached Results"  
  n1 -->|4. fill or \n delete Cache| r1[Redis]
  n1 -->|2. updates\n DB| p1[(MongoDB)]
  p1 -->|3. DB update\n response| n1
  r1 -->|5. caching\n response| n1
  u1-->|1. Update\n or Delete\n request| n1[node]
  n1 -->|6. respond\n to User| u1[User]
end
```
---

## Folder structure:

```
.
├── README.md
└── backend
    ├── config
    │   ├── dev.js (secret dev keys)
    │   ├── keys.js (depending upon envt, populates keys)
    │   └── prod.js (getting prod keys from process.env)
    ├── controllers
    │   └── products-controller.js (product controller)
    ├── index.js (start point of code)
    ├── middlewares (reusable and extensible middlewares)
    │   ├── useCacheIfStored.js (customisable HOC, as per KEYs)
    │   └── validationFactory.js (customisable HOC, as per Joi Schema)
    ├── models
    │   ├── product.js (mongoose schema)
    │   └── validationSchemas.js (collection of Joi schemas).
    ├── package-lock.json
    ├── package.json
    ├── redis
    │   ├── redis.js (promisified wrappers on redis client).
    │   └── redisHelper.js (getting keys, and list of keys in app).
    ├── routes
    │   └── product-routes.js (product related routes of app).
    └── utils
        ├── DTO.js (Data transformation object from MongoDB to API).
        └── ErrorObject.js (Customisable error thrown usually by async code).
```