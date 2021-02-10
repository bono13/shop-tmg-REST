# SHOP-TMG-REST-API

## Initial Setup

- Open your preferred REST Client in this case we'll be using [Insomnia](https://insomnia.rest/)

- All **POST, GET, PATCH , DELETE** requests must be sent to the following domain:
- https://tmg-rest-api.herokuapp.com

- **Note**: The Insomnia *_.url* environment workspace variable shown in the screenshots 
   is set to "https://tmg-rest-api.herokuapp.com"

##  How to use 

### Creating an Account
- Create an account by making a **POST** request to */register* with a "username" and "password" field as shown here:

[![create-user.png](https://i.postimg.cc/nc3FjmMT/create-user.png)](https://postimg.cc/vc6FCcr6)

- Then login by making a **POST** request to */login* with the username and password you created:

[![user-login.png](https://i.postimg.cc/7ZcqXy32/user-login.png)](https://postimg.cc/Mn7kKNr6)

- In order to Logout send a **GET** request to */logout*


### Creating, Reading, Updating and Deleting a Product Instance

- **Note:** Allowed input and update fields are *Title, Price* and *Description* only.

- **Create** a product by sending a **POST** request to */products* and by filling out the allowed fields as below:

[![add-product.png](https://i.postimg.cc/BndGHB35/add-product.png)](https://postimg.cc/4YbMTtmn)

- A Product Instance will be created in the DB with the following fields: _id, title, price, description, createdAt, updatedAt, SKU


- **Update** products by sending a **PATCH** request to */products/(id)* where "(id)" should be substituted by the Mongo _id of the product as shown below:
  
[![edit-product.png](https://i.postimg.cc/jST1b3RF/edit-product.png)](https://postimg.cc/D8C6QgJr)
  
- **Delete** products by sending a **DELETE** request to */products/(id)* where "(id)" should be substituted by the Mongo _id of the product to delete
  
- **Fetch** All Product collections by sending a **GET** request to */products*:

[![fetch-all.png](https://i.postimg.cc/dDPxD4rD/fetch-all.png)](https://postimg.cc/N2D4z8Nw)
 
 
### Advanced Querying: Filtering, Sorting and Pagination  

- **Query fields**:  _id, title, price, description, createdAt, updatedAt, SKU

- **Filter** Products using:  */products?(field)=(value)* where "(field)" is substituted for any one of the fields specified above
  
 - For example below we use */products?title=Adidas TrackSuit Black Ice* and get back the following Document: 
 
[![fetch-with-param.png](https://i.postimg.cc/7641CdQF/fetch-with-param.png)](https://postimg.cc/v1Pxkqyh)
  
- **Sort** Products using:  */products?sortBy=(field):asc* or */products?sortBy=(field):desc* 
  where *asc* sorts in ascending fashion and *desc* in a descending fashion e.g:
  
*products?sortBy=createdAt:desc* brings back the collections by date of creation in a descending manner, notice the SKU numeration:
  
[![sort-created-At-desc.png](https://i.postimg.cc/MG2V4gxn/sort-created-At-desc.png)](https://postimg.cc/yDjD3QDK)
  
- For **Pagination** use:  */products?limit=(num_value)* or */products?limit=(num_value)&skip=(num_value)*

- Where *limit* is equivalent to total number of collections you want to display per page and *skip* is equal to the 
  number of collections to skip through. **Note**: the value of "(num_value)" as implies must be substituted with that of a number and not a string
  
- Examples of Pagination:


- using */products?limit=2* will give us:

[![pagination-limit.png](https://i.postimg.cc/vTtGYg6R/pagination-limit.png)](https://postimg.cc/PvJgKq4K)


- using */products?limit=2&skip=2* will give us:

[![pagination-limit-skip.png](https://i.postimg.cc/3R6KfQ56/pagination-limit-skip.png)](https://postimg.cc/0MYRr3Nd)


Notice how the SKU field of the documents displayed using */products?limit=2* and */products?limit=2&skip=2* are different.

### Uploading , Rendering and Deleting Images

- **Supported image formats**: jpeg,jpg and png

- **Upload** image: send a **POST** request to */upload/(id)* where "(id)" should be substituted by the mongo _id of the product to which the image will be 
  uploaded to 
  
Example: 
  
[![upload-image.png](https://i.postimg.cc/TP5GyHWJ/upload-image.png)](https://postimg.cc/B83Rkppj)
  
- **Render** Image: send a **GET** request to */upload/(id)/image* where "(id)" should be substituted by the mongo _id of the product you want to render the        image from.
  
Example:
  
[![get-image.png](https://i.postimg.cc/2yGfpsPr/get-image.png)](https://postimg.cc/CnR2kQhQ)
  
- **Delete** an image by sending a **DELETE** request to */upload/(id)/image* where "(id)" should be substituted by the mongo _id 
  of the product you want to delete the image from






  
  






