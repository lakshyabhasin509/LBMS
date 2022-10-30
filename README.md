# LBMS - This is a book library

## How to contribute

### Clone the project

1. Fork the project to your repository
2. Clone the project using: `git clone url/of/your/repository.com`
3. Install dependencies using: `npm i`
4. Create a branch with this format "feature_username"
5. Start the project with: `npm run start:dev`
6. Code your contriobutions
7. Commit changes
8. Make pull request
9. Await for review & approvement

### Set up database

1. Install mongoDB
2. Create a databse
3. Create a .env file
4. Copy and paste .env.example to your .env file and change "your_database_name" string with the name of the databse you created and add your email and password and domain
   'LOCAL_DB_CONNECT="mongodb://localhost:27020/your_database_name"
   EMAIL_USERNAME = "youremail@gmail.com"
   EMAIL_PASSWORD = "yourpassword"
   DOMAIN = "https://yourdomain.com" '
