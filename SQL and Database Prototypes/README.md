12.18.24: I added some extra schema in this prototype with additional variables such as GradeLevel, SkillLevel, and SubjectsEnrolled

Use this code to install the packages: npm install express mssql bcrypt jsonwebtoken dotenv





Implementing this code into Azure:
Step 1: Create an App Service
Log in to the Azure Portal.
Navigate to the BoomerangLearning-MAIN resource group.
Click on Create a Resource > App Service.
Select:
Runtime: Node.js 16 LTS.
Operating System: Windows (to avoid Linux-based systems).

tep 2: Connect to the Azure SQL Database
In the Azure Portal, open your SQL Database.
Copy the connection string (with username and password).
Add the connection string details to your .env file:
plaintext
Copy code
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_SERVER=your-db-server.database.windows.net
DB_NAME=your-db-name
JWT_SECRET=your-jwt-secret

^^^^
I have an env file in this folder



(From Azure): 
The .env file is not included in your version control system (e.g., Git) because it is listed in .gitignore. This prevents sensitive information from being exposed publicly.

Create a new file called .env in the root directory of your project.
Add the above content with your credentials.
In Azure:

Navigate to your App Service in the Azure Portal.
Go to Configuration > Application Settings.
Add the variables from your .env file as Application Settings keys, for example:
Key: DB_USER, Value: your-db-username
Key: JWT_SECRET, Value: your-jwt-secret
Save the changes and restart your App Service.

Never Upload the .env File: Add .env to your .gitignore file to ensure it isn’t uploaded to version control.