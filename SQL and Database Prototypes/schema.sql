CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    FullName NVARCHAR(100),
    GradeLevel NVARCHAR(10) NOT NULL,
    SkillLevel INT CHECK (SkillLevel BETWEEN 1 AND 100) DEFAULT 1,
    SubjectsEnrolled NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE()
);
