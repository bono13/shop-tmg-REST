# SHOP-TMG-REST-API

## Initial Setup

- Open your preferred REST Client Application in this case we'll be using Insomnia

- All POST, GET, PATCH , DELETE requests must be made to https://tmg-rest-api.herokuapp.com

##  How to use 

### Creating an Account
- Create an account by making a POST request to /register with a "username" and "password" field as shown here:
(create_user.png)

- Then login by making a POST request to /login with the username and password you created:
(user_login.png)

- In order to Logout send a GET request to /logout


### Creating, Reading, Updating and Deleting a Product Instance

- Note: Allowed input and update fields are Title, Price , Description only.

- Create a product by sending a POST request to /products and by filling out the allowed fields as below:
(add_product)

- A Product Instance will be created in the DB with the following fields: _id, title, price, description, createdAt, updatedAt, SKU


- Update products by sending a POST request to /products/<value> where <value> should be substituted by the mongo _id of the product as shown below:
  (edit product)
  
- Delete products by sending a DELETE request to /products/<value> where <value> should be substituted by the mongo _id of the product to delete
  
- Fetch All Product collections by sending a GET request to /products
(all products png)
 
 
### Advanced Querying: Filtering, Sorting and Pagination  

- Query fields:  _id, title, price, description, createdAt, updatedAt, SKU

- Filter Products: use  /products?<field>=<value> where <field> is substituted for any one of the fields specified above
  - For example below we used "/products?title=Adidas TrackSuit Black Ice" and got back the following Document
  (fetch with params.png)
  
- Sort Products: use /products?sortBy=<field>:asc or /products?sortBy=<field>:desc 
  where asc sorts in ascending fashion and desc in a descending fashion e.g:
  
  products?sortBy=createdAt:desc  brings back the collections by date of creation in a descending manner
  
  (sort_createdAt_desc.png)
  
- Pagination: use /products?limit=<num_value> or /products?limit=<num_value>&skip=<num_value>
- Where the limit is equivalent to total number of collections you want to display per page and skip is equal to the 
  number of collections to skip through. Note: the value of <num_value> as implies must be substituted with that of a number and not a string
  
  Examples of Pagination:

- using /products?limit=2 will give us:

(pagination_limit)

- using /products?limit=2&skip=2 will give us:
(pagination_limit_skip)

Notice how the SKU field of the documents displayed using /products?limit=2 and /products?limit=2&skip=2 are different.

### Uploading , Rendering and Deleting Images

- Supported image formats: jpeg,jpg and png

- Upload image: send a POST request to /upload/<value> where <value> should be substituted by the mongo _id of the product to which the image will be 
  uploaded to 
  
  Example: 
  
  (upload image)
  
  - Render Image: send a GET request to /upload/<value>/image where <value> should be substituted by the mongo _id of the product you want to render the image       from
  
  Example:
  (swedish_sweater)
  
  -Delete an image by sending a DELETE request to /upload/<value>/image where <value> should be substituted by the mongo _id of the product you want to delete the    image from






  
  






