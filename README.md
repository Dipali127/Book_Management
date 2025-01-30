
# Book Management

Book Management is a backend application designed for users to manage their published books. It allows users to publish their books using a unique ISBN (International Standard Book Number) and perform CRUD (Create, Read, Update, Delete) operations on their published books. Additionally, reviewers can engage with the application by providing ratings and comments on the books.

## Features

* Users publish their books using a unique ISBN.
* Users can create, read, update, and delete their published books.
* Reviewers can add ratings and comments to the published books.
* The reviewCount field on the book model is incremented when a reviewer adds a review and decremented when a review is removed.

## Description

* Built a RESTful API in Node.js using the MVC approach with MongoDB as the database.
* Implemented JWT (JSON Web Tokens) for authentication and authorization.

## Technology Stack
* Backend: Node.js with Express.js
* Database: MongoDB for storing book and review data
* Authentication: JWT (JSON Web Tokens) for user authentication and authorization

## Running Book Management application

To run the `book management` application, follow these steps:

1. Ensure that you have Node.js and npm installed on your system.

2. Clone the repository to your local machine:

    ```bash
    https://github.com/Dipali127/Book_Management.git
    ```
3. Navigate to the root directory of the project:

    ```bash
     cd Book_Management
    ```

4. Install dependencies:


    ```bash
         npm install 
    ```

5. Start the application (run it on development mode):

    ```bash
    npm start
    ```

- **Database Setup**: 

    - Install Mongoose, the MongoDB object modeling tool for Node.js, by running the following command in your terminal:

    ```bash
    npm install mongoose
    ```        

## For Testing (Postman)
* Postman extension can be used for testing !

## Dependencies
* For dependencies refer Package.json

## Available API Routes
### User Routes

| Routes                      | Description                                |
| --------------------------- | ------------------------------------------ |
| `POST /register`      | Register a new user.                       |
| `POST /login`       | Log in an existing user.                           |

### Book Routes

| Routes                      | Description                                |
| --------------------------- | ------------------------------------------ |
| `POST /books`      | User publish their own book.      |
| `GET /books`       | User fetches all the published books.     |
| `GET /books/:bookId`    | User fetches a book by its object ID.    |
| `PUT /books/:bookId`    | User updates a published book.   |
| `DELETE /books/:bookId`    | User deletes a published book.  |

### Review Routes

| Routes                      | Description                                |
| --------------------------- | ------------------------------------------ |
| `POST /books/:bookId/review`      | A user adds a review for a published book.      |
| `PUT /books/:bookId/review/:reviewId`       | A user updates their review on a published book.           |
| `DELETE /books/:bookId/review/:reviewId`       | A user deletes their review on a published book.         |

#### Note:
Reviewers can be any logged-in user, including the user who published the book. All logged-in users have the ability to leave a review on a published book.

##  User Routes
**1) Sign up a new User**

Send a POST request to create a new user account.

````
Method: POST 
URL: /register
Content-Type: application/json
````

**EXAMPLE**
* **Request:** POST /register
* **Response:**
```json
    {
    "status": true,
    "message": "New User created successfully",
    "data": {
        "title": "Mr",
        "fullName": "Ram Sharma",
        "phoneNumber": "9856543229",
        "email": "ramSharma111@example.com",
        "password": "Password123@!",
        "address": {
            "street": "123 Main Street",
            "city": "New York",
            "pincode": "808586"
        },
        "_id": "679a16df29b102d98053998f",
        "createdAt": "2025-01-29T11:54:07.261Z",
        "updatedAt": "2025-01-29T11:54:07.261Z",
        "__v": 0
    }
}
```

**2) Login User**

Send a POST request to log in an existing user.

````
Method: POST 
URL: /login
Content-Type: application/json
````
**EXAMPLE**
* **Request:** POST /login
* **Response:**
```json
 {
    "status": true,
    "message": "User Login Successfully",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzlhMTZkZjI5YjEwMmQ5ODA1Mzk5OGYiLCJpYXQiOjE3MzgxNTE3OTgsImV4cCI6MTczODE1NTM5OH0.o4BThjZyNi4ZCUTVKN8k56tD4Am2meTZLkIB1euRSXg"
}
```

## Book Routes
**1) Publish Book**

Send a POST request to publish a new book.

````
Method: POST 
URL: /books
Authorization: x-api-key {token}
Content-Type: application/json
````
**EXAMPLE**
* **Request:** POST /books
* **Response:**
```json
 {
    "status": true,
    "message": "book is successfully published ",
    "data": {
        "title": "The Great Gatsby",
        "preview": "A story of love, wealth, and the American Dream set in the Jazz Age of the 1920s.",
        "userId": "679a16df29b102d98053998f",
        "ISBN": "978-0-7432-7356-5",
        "category": "Fiction",
        "reviewCount": 0,
        "isDeleted": false,
        "releasedAt": "1925-04-10T00:00:00.000Z",
        "_id": "679a192f29b102d980539997",
        "createdAt": "2025-01-29T12:03:59.838Z",
        "updatedAt": "2025-01-29T12:03:59.838Z",
        "__v": 0
    }
}
```

**2) Get Published Books**

**(i)** Send a GET request without filter query to Fetch a book details.

````
Method: GET
URL: /books
Authorization: x-api-key {token}
Content-Type: application/json
Purpose: This request is used to fetch a list of all published books, without any filters applied.
````
**EXAMPLE**
* **Request:** GET /books
* **Response:**
```json
{
    "status": true,
    "message": [
        {
            "_id": "679742e03bdee67fe2e7f8fc",
            "title": " Kill a Mockingbird",
            "preview": "A powerful tale of racial injustice and childhood innocence in the American South.",
            "userId": "67938b8c6f44fb6a09c8e074",
            "category": "Classic Literature",
            "releasedAt": "1960-07-11T00:00:00.000Z"
        },
        {
            "_id": "6794c0f0403aed3c6de54b55",
            "title": "1984",
            "preview": "A dystopian novel by George Orwell that explores the consequences of a totalitarian regime, mass surveillance, and perpetual war, all set within a society that values control over freedom.",
            "userId": "67938b8c6f44fb6a09c8e074",
            "category": "Dystopian",
            "releasedAt": "1949-06-07T18:30:00.000Z"
        },
        {
            "_id": "6794c05c403aed3c6de54b4b",
            "title": "Great Gatb",
            "preview": "This is a classic novel set in the Jazz Age, exploring themes of wealth, society, and the American Dream. The story is narrated by Nick Carraway, who observes the life of his mysterious neighbor, Jay Gatsby, and his obsession with Daisy Buchanan.",
            "userId": "67938b8c6f44fb6a09c8e074",
            "category": "Fiction",
            "releasedAt": "2001-04-09T18:30:00.000Z"
        },
        {
            "_id": "6794c1bd403aed3c6de54b67",
            "title": "Pride and Prejudice",
            "preview": "This timeless novel by Jane Austen follows the headstrong Elizabeth Bennet and her developing relationship with the aloof Mr. Darcy, highlighting themes of class, marriage, and personal growth.",
            "userId": "67938fe4fcc4edcdf2c1951b",
            "category": "Romance",
            "releasedAt": "2004-10-04T00:00:00.000Z"
        },
        {
            "_id": "679a192f29b102d980539997",
            "title": "The Great Gatsby",
            "preview": "A story of love, wealth, and the American Dream set in the Jazz Age of the 1920s.",
            "userId": "679a16df29b102d98053998f",
            "category": "Fiction",
            "releasedAt": "1925-04-10T00:00:00.000Z"
        },
        {
            "_id": "6794c0d4403aed3c6de54b50",
            "title": "To Kill a Mockingbird",
            "preview": "Set in the Depression-era South, this novel focuses on the Finch family, particularly Scout Finch, and her father, lawyer Atticus Finch, as they navigate racism and injustice during a controversial trial.",
            "userId": "67938b8c6f44fb6a09c8e074",
            "category": "Classic",
            "releasedAt": "1960-11-06T18:30:00.000Z"
        }
    ]
}
```

**(ii)** Send a GET request with filter query to Fetch a book details.

````
Method: GET
URL: /books
Authorization: x-api-key {token}
Content-Type: application/json
Purpose: This request allows users to filter books based on userId and category values. The filter query can be used to narrow down the list of books that meet certain criteria.
````
**EXAMPLE**
* **Request:** GET /books
* **Response:**
```json
{
    "status": true,
    "message": [
        {
            "_id": "679742e03bdee67fe2e7f8fc",
            "title": " Kill a Mockingbird",
            "preview": "A powerful tale of racial injustice and childhood innocence in the American South.",
            "userId": "67938b8c6f44fb6a09c8e074",
            "category": "Classic Literature",
            "releasedAt": "1960-07-11T00:00:00.000Z"
        },
        {
            "_id": "6794c0f0403aed3c6de54b55",
            "title": "1984",
            "preview": "A dystopian novel by George Orwell that explores the consequences of a totalitarian regime, mass surveillance, and perpetual war, all set within a society that values control over freedom.",
            "userId": "67938b8c6f44fb6a09c8e074",
            "category": "Dystopian",
            "releasedAt": "1949-06-07T18:30:00.000Z"
        },
        {
            "_id": "6794c05c403aed3c6de54b4b",
            "title": "Great Gatb",
            "preview": "This is a classic novel set in the Jazz Age, exploring themes of wealth, society, and the American Dream. The story is narrated by Nick Carraway, who observes the life of his mysterious neighbor, Jay Gatsby, and his obsession with Daisy Buchanan.",
            "userId": "67938b8c6f44fb6a09c8e074",
            "category": "Fiction",
            "releasedAt": "2001-04-09T18:30:00.000Z"
        }
    ]
}
```


**3) Get Published Books By its ObjectId**

````
Method: GET
URL: /books/:bookId
Authorization: x-api-key {token}
Content-Type: application/json
````
**EXAMPLE**
* **Request:** GET /books/6794c0d4403aed3c6de54b50
* **Response:**
```json
{
    "status": true,
    "message": "Books list",
    "data": {
        "bookDocument": {
            "_id": "6794c0d4403aed3c6de54b50",
            "title": "To Kill the Mockingbird",
            "preview": "This is a classic novel set in the Jazz Age, exploring themes of wealt",
            "userId": "67938b8c6f44fb6a09c8e074",
            "category": "Classic",
            "reviewCount": 5,
            "isDeleted": false,
            "releasedAt": "1960-11-06T18:30:00.000Z",
            "createdAt": "2025-01-25T10:45:40.208Z",
            "updatedAt": "2025-01-30T10:18:23.631Z",
            "__v": 0
        },
        "reviewsData": [
            {
                "_id": "679b471c95120b19e9edeb4b",
                "reviewedBy": "679b45736d7b63726d1a8171",
                "reviewedAt": "2025-01-25T18:30:00.000Z",
                "rating": 5,
                "comment": "An excellent read! The author goes deep into the topic with clear examples. I couldn't put the book down and learned a lot from it. Highly recommended for beginners!"
            }
        ]
    }
}
```

**4) Update Published Books By its ObjectId**

````
Method: PUT
URL: /books/:bookId
Authorization: x-api-key {token}
Content-Type: application/json
````
**EXAMPLE**
* **Request:** PUT /books/6794c0d4403aed3c6de54b50
* **Response:**
```json
{
    "status": true,
    "message": "Success",
    "data": {
        "_id": "6794c0d4403aed3c6de54b50",
        "title": "To Kill the Mockingbird",
        "preview": "This is a classic novel set in the Jazz Age, exploring themes of wealt",
        "userId": "67938b8c6f44fb6a09c8e074",
        "ISBN": "978-0-06-112008-4",
        "category": "Classic",
        "reviewCount": 5,
        "isDeleted": false,
        "releasedAt": "1960-11-06T18:30:00.000Z",
        "createdAt": "2025-01-25T10:45:40.208Z",
        "updatedAt": "2025-01-30T10:50:32.026Z",
        "__v": 0
    }
}
```


**5) Delete Published Books By its ObjectId**

````
Method: DELETE
URL: /books/:bookId
Authorization: x-api-key {token}
Content-Type: application/json
````
**EXAMPLE**
* **Request:** DELETE /books/6794c0d4403aed3c6de54b50
* **Response:**
```json
{
    "message": "Deleted"
}
```

## Review Routes
**1) Create a review on Published book by its ObjectId**

Send a POST request to leave a review on a published book.

````
Method: POST 
URL: /books/:bookId/review
Authorization: x-api-key {token}
Content-Type: application/json
````
**EXAMPLE**
* **Request:** POST /books/6794c0f0403aed3c6de54b55/review
* **Response:**
```json
 {
    "status": true,
    "msg": "Reviewes Added Succesfully",
    "data": {
        "book": "6794c0f0403aed3c6de54b55",
        "reviewedBy": "679b49b6adf6b4d29f04ea21",
        "reviewedAt": "2025-01-26T18:30:00.000Z",
        "rating": 4,
        "comment": "A chilling and insightful portrayal of a dystopian world where freedom is suppressed. A thought-provoking read that feels eerily relevant today",
        "isDeleted": false,
        "_id": "679b5e80648ab0ac98bc3f5e",
        "createdAt": "2025-01-30T11:12:00.908Z",
        "updatedAt": "2025-01-30T11:12:00.908Z",
        "__v": 0
    }
}
```

**2) Update a Review on Published Book by its ObjectId**

````
Method: PUT 
URL: /books/:bookId/review/:reviewId
Authorization: x-api-key {token}
Content-Type: application/json
````
**EXAMPLE**
* **Request:** PUT /books/6794c0f0403aed3c6de54b55/review/679b5e80648ab0ac98bc3f5e
* **Response:**
```json
 {
    "status": true,
    "message": "successfully updated",
    "data": {
        "bookData": {
            "_id": "6794c0f0403aed3c6de54b55",
            "title": "1984",
            "preview": "A dystopian novel by George Orwell that explores the consequences of a totalitarian regime, mass surveillance, and perpetual war, all set within a society that values control over freedom.",
            "userId": "67938b8c6f44fb6a09c8e074",
            "category": "Dystopian",
            "reviewCount": 1,
            "isDeleted": false,
            "releasedAt": "1949-06-07T18:30:00.000Z",
            "createdAt": "2025-01-25T10:46:08.656Z",
            "updatedAt": "2025-01-30T11:12:00.973Z",
            "__v": 0
        },
        "reviewsData": {
            "_id": "679b5e80648ab0ac98bc3f5e",
            "book": "6794c0f0403aed3c6de54b55",
            "reviewedBy": "679b49b6adf6b4d29f04ea21",
            "reviewedAt": "2025-01-26T18:30:00.000Z",
            "rating": 5,
            "comment": "A chilling and insightful portrayal of a dystopian world where freedom is suppressed. A thought-provoking read that feels eerily relevant today",
            "isDeleted": false,
            "createdAt": "2025-01-30T11:12:00.908Z",
            "updatedAt": "2025-01-30T11:18:52.470Z",
            "__v": 0
        }
    }
}
```

**3) Delete a Review on Published Book by its ObjectId**

````
Method: DELETE 
URL: DELETE /books/6794c0f0403aed3c6de54b55/review/679b5e80648ab0ac98bc3f5e
Authorization: x-api-key {token}
Content-Type: application/json
````
**EXAMPLE**
* **Request:** PUT /books/:bookId/review/:reviewId
* **Response:**
```json
{
    "status": true,
    "message": "review has been deleted successfully"
}
```
