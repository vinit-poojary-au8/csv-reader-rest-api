# CSV Reader Rest Api
##### Hiring Problem Statement 1

###### Write a REST API using Node.js (any framework) which does the following:
* Takes a large CSV file as an input,
* Parses it and saves each row as a record in the database on a predefined data model and table
* API needs to have proper validation in place
* Use of any open-source module is allowed
* PostgresSQL needs to be used as the database
* Sample data set to be used for testing and model creation -> http://eforexcel.com/wp/wp-content/uploads/2020/09/5m-Sales-Records.zip


## Features
- Import a CSV file and upload to Postgress
- Get Data in Postgress

## Installation

Install the dependencies 
```sh
npm i
npm run dev
```
## Usage
- To uplaod csv file use - http://localhost:5000/upload
- To get data use - http://localhost:5000/data