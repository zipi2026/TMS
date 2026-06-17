 

-- יצירת בסיס נתונים
CREATE DATABASE TasksDB;
GO

-- בחירת בסיס הנתונים החדש
USE TasksDB;
GO

-- יצירת לוגין לשרת (login ברמת השרת)
CREATE LOGIN project WITH  PASSWORD = '1234';
GO

-- יצירת משתמש במסד הנתונים עצמו (user ברמת הדאטהבייס)
CREATE USER project FOR LOGIN project;
GO

-- מתן הרשאות למשתמש (למשל db_owner)
EXEC sp_addrolemember N'db_owner', N'project';
GO

SELECT name FROM sys.sql_logins WHERE name = 'project';

