## Placement Cell (Coding Ninjas API Assignment)

------------------------------------------------------------------------------------------

#### Create Product

<details>
 <summary><code>POST</code> <code><b>/products/create</b></code> <code>Creates a product with `name` and `quantity`.</code></summary>

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

------------------------------------------------------------------------------------------

#### Get product(s)

<details>
 <summary><code>GET</code> <code><b>/{:productId}</b></code> <code>Get a product by id.</code></summary>

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
 <summary><code>GET</code> <code><b>/products/</b></code> <code>Gets all products</code></summary>

##### Example cURL

> ```javascript
>  https://products-api-ux8g.onrender.com/products/
> ```

</details>

------------------------------------------------------------------------------------------


#### Updates quantity of existing product

<details>
  <summary><code>PATCH</code> <code><b>products/{productId}/update_quantity?number={number}</b></code> <code>Updates quantity of product with productId.</code></summary>

##### Path Params

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `productId` |  required | MongoDB.OjecttId   | MongoDB unique Id of product        |
> | `number` |  required | number   | Number to add or substract to updated quantity, which should be in range [0,10_000].        |

##### Example URL

> ```javascript
>  http://localhost:8001/products/640e382a014d5341380a599a/update_quantity?number=20
> ```

</details>

------------------------------------------------------------------------------------------

#### Deleting existing product by ID:

<details>
  <summary><code>DELETE</code> <code><b>/products/:productId</b></code> <code>Deletes a specific product by ID</code></summary>

##### Path Parameters: /products/:productId

> | path-param      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | productId      |  required | mongoDb.ObjectId   | id of product  |

##### Example URL

> ```javascript
>  http://localhost:8001/products/640e382a014d5341380a599a
> ```

</details>

------------------------------------------------------------------------------------------