CSV Upload & Background Processing API
This project allows authenticated users to upload a CSV file which is then validated and processed asynchronously using a Bull.js queue. Valid records are inserted into MongoDB, and job status can be tracked.

Tech Stack
Node.js + Express.js
MongoDB (Mongoose)
Redis (Bull.js for background jobs)
Multer (file uploads)
csv-parser (CSV parsing)
JWT for auth
WSL for running Redis on Windows

WSL on Windows for redis server start
redis-server

Create a .env file:
PORT=3000
MONGO_URI=mongodb://localhost:27017/csv_upload
REDIS_URL=redis://127.0.0.1:6379
JWT_SECRET=your_secret_key

npm install

node server start
npm start

//POST
1: http://localhost:3000/auth/register   
{
    "name":"gautam",
    "email":"gm1@gmail.com",
    "password":"123456"
}

//POST
2: http://localhost:3000/auth/login
{
    "email":"gm1@gmail.com",
    "password":"123456"
}

output:-
{
  "token": "Bearer <token>"
}

//POST
3 http://localhost:3000/upload

headers 
key :- Authorization
value:- Bearer <your_token>

Body 
form-data
Key: file (type: file)
Value: Your .csv file (max size: 5MB)

validate row will stored in database record table

output:
{
    "message": "CSV uploaded successfully and job added to queue.",
    "jobId": "43"
}

//GET
4: http://localhost:3000/jobs/43/status


if not valid data than get this response
output:
{
    "status": "completed",
    "totalRows": 7,
    "success": 3,
    "failed": 4,
    "errors": [
        {
            "row": 2,
            "reason": "Name is required and must be alphabetic"
        },
        {
            "row": 3,
            "reason": "Invalid or missing email"
        },
        {
            "row": 4,
            "reason": "Invalid phone format"
        },
        {
            "row": 5,
            "reason": "Age must be a number"
        }
    ]
}


optional

download template

//GET
5:-http://localhost:3000/upload/template
output:
name,email,phone,age,city
John Doe,john@example.com,9876543210,30,Mumbai
Jane Smith,jane@example.com,9123456789,25,Delhi

cancel job

//DELETE
6: http://localhost:3000/jobs/42

output:
{
    "message": "Job cancelled successfully."
}
