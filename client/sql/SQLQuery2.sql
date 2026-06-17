CREATE DATABASE TasksDB;
GO


USE TasksDB;
GO

-- יצירת Login (ברמת השרת)
CREATE LOGIN project WITH PASSWORD = '1234';
GO

-- יצירת User (ברמת ה-DB)
CREATE USER project FOR LOGIN project;
GO

-- מתן הרשאות מלאות
EXEC sp_addrolemember N'db_owner', N'project';
GO

SELECT name 
FROM sys.sql_logins 
WHERE name = 'project'

USE [master]
GO
/****** Object:  Database [TasksDB]    Script Date: 09/02/2026 14:38:29 ******/

USE [TasksDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [TasksDB]
GO
/****** Object:  User [project]    Script Date: 09/02/2026 14:38:29 ******/
CREATE USER [project] FOR LOGIN [project] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [project]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 09/02/2026 14:38:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[roleId] [int] IDENTITY(1,1) NOT NULL,
	[role] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tasks]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[taskId] [int] IDENTITY(1000,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[description] [nvarchar](max) NULL,
	[price] [float] NOT NULL,
	[scheduling] [date] NOT NULL,
	[status] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TasksArchive]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TasksArchive](
	[taskId] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_TasksArchive] PRIMARY KEY CLUSTERED 
(
	[taskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[userId] [int] IDENTITY(1,1) NOT NULL,
	[userName] [nvarchar](20) NOT NULL,
	[password] [nvarchar](10) NOT NULL,
	[phone] [nvarchar](15) NULL,
	[email] [nvarchar](50) NULL,
	[roleId] [int] NOT NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([roleId], [role]) VALUES (1, N'standatd')
INSERT [dbo].[Roles] ([roleId], [role]) VALUES (2, N'manager')
SET IDENTITY_INSERT [dbo].[Roles] OFF
SET IDENTITY_INSERT [dbo].[Tasks] ON 

INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1001, N'TODO', N'בדחיפות ממש', 105, CAST(N'2025-10-05' AS Date), 2)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1002, N'משימה סודית', N'חייב סיווג בטחוני', 300, CAST(N'2025-12-06' AS Date), 1)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1003, N'עיצוב אתר', N'כולל UX & UI', 400, CAST(N'2025-11-09' AS Date), 0)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1004, N'בדיקות QA', N'בדיקות תוכנה מקיפות וקפדניות', 300, CAST(N'2025-11-12' AS Date), 3)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1005, N'פיתוח API', N'Node.js, Rest API', 600, CAST(N'2026-09-09' AS Date), 2)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1006, N'להכין יום גיבוש לצוות', N'מיקום, אוכל, תוכנית', 100, CAST(N'2025-12-10' AS Date), 1)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1009, N'לתקן את המחשב', N'המקלדת הרוסה', 450, CAST(N'2025-11-13' AS Date), 0)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1012, N'הכנות לשבת', N'אפיית חלות', 200, CAST(N'2025-11-13' AS Date), 0)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1014, N'להנות מהחופש', N'לנוח', 50, CAST(N'2025-11-15' AS Date), 0)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1013, N'להנות מהחופש', N'לנוח', 50, CAST(N'2025-11-15' AS Date), 0)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1016, N'לרקוד', N'לרקוד בחתונה', 50, CAST(N'2025-11-16' AS Date), 0)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1011, N'משימה מעצבנת', N'לא רוצה לפרט', 50, CAST(N'2025-11-13' AS Date), 0)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1015, N'靴屋の手伝い', N'
注文する', 50, CAST(N'2025-11-15' AS Date), 0)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1017, N'לתרגם את הספר', N'לרוסית', 50, CAST(N'2025-11-15' AS Date), 0)
INSERT [dbo].[Tasks] ([taskId], [name], [description], [price], [scheduling], [status]) VALUES (1018, N'ללכת לישון', N'חייביםם', 50, CAST(N'2025-11-16' AS Date), 0)
SET IDENTITY_INSERT [dbo].[Tasks] OFF
SET IDENTITY_INSERT [dbo].[TasksArchive] ON 

INSERT [dbo].[TasksArchive] ([taskId], [name], [description]) VALUES (1, N'נקיון יסודי', N'בכל המשרד')
INSERT [dbo].[TasksArchive] ([taskId], [name], [description]) VALUES (2, N'משימה מעצבנת', N'לא רוצה לפרט')
SET IDENTITY_INSERT [dbo].[TasksArchive] OFF
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([userId], [userName], [password], [phone], [email], [roleId]) VALUES (1, N'שיר', N'1234', N'050-4000001', N'shir@gmail.com', 1)
INSERT [dbo].[users] ([userId], [userName], [password], [phone], [email], [roleId]) VALUES (2, N'מנשי', N'4321', N'055-0000000', N'menashi@gmail.com', 1)
INSERT [dbo].[users] ([userId], [userName], [password], [phone], [email], [roleId]) VALUES (3, N'חני-רוזן', N'4545', N'052-0000000', N'chani@gmail.com', 2)
INSERT [dbo].[users] ([userId], [userName], [password], [phone], [email], [roleId]) VALUES (4, N'שימי', N'6565', N'04-39393939', N'shim@gmail.com', 2)
SET IDENTITY_INSERT [dbo].[users] OFF
/****** Object:  StoredProcedure [dbo].[spAddOrUpdateTask]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spAddOrUpdateTask] 
	-- Add the parameters for the stored procedure here
	(
		@taskId int,
		@name nvarchar(50),
		@description nvarchar(max) = '',
		@price float,
		@scheduling Date,
		@status int
	)
	 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    IF (@taskId < 1000)
		BEGIN
			INSERT INTO Tasks ( name, description, price, scheduling, status)
			VALUES ( @name, @description, @price, @scheduling, @status);
		END
		ELSE
		BEGIN
			UPDATE Tasks
			SET 
				name = @name,
				description = @description,
				price = @price,
				scheduling = @scheduling,
				status = @status
			WHERE taskId = @taskId;
		END

END
GO
/****** Object:  StoredProcedure [dbo].[spAddUser]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spAddUser] 
	-- Add the parameters for the stored procedure here
	(
		
		@userName nvarchar(50),
		@password nvarchar(10),
		@phone nvarchar(15),
		@email nvarchar(50),
		@roleId int
	)
	 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   
		BEGIN
			INSERT INTO users ( userName, password, phone, email, roleId)
			VALUES ( @userName, @password, @phone, @email, @roleId);
		END
		 

END

GO
/****** Object:  StoredProcedure [dbo].[spCheckScheduling]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE  PROCEDURE [dbo].[spCheckScheduling]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT taskId, name
	FROM Tasks
	WHERE CAST(scheduling AS DATE) = CAST(GETDATE() AS DATE)
END
GO
/****** Object:  StoredProcedure [dbo].[spCheckUserLogin]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spCheckUserLogin]
	-- Add the parameters for the stored procedure here
	
	  @userName nvarchar(20), 
	  @password nvarchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	 
    SELECT *
    FROM Users
    WHERE username = @username AND password = @password
 
 END   
GO
/****** Object:  StoredProcedure [dbo].[spDeleteTask]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spDeleteTask] 
(
		  @taskId int 
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE FROM Tasks
	WHERE taskId =  @taskId 
END
GO
/****** Object:  StoredProcedure [dbo].[spDeleteUser]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spDeleteUser] 
(
		  @userId int 
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE FROM users
	WHERE userId =  @userId
END
GO
/****** Object:  StoredProcedure [dbo].[spGetRules]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spGetRules]

 AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM rules
END
GO
/****** Object:  StoredProcedure [dbo].[spGetTasks]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================


CREATE PROCEDURE [dbo].[spGetTasks]

 AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM Tasks
END
GO
/****** Object:  StoredProcedure [dbo].[spGetUsers]    Script Date: 09/02/2026 14:38:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================


CREATE PROCEDURE [dbo].[spGetUsers]

 AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM Users
END
GO
USE [master]
GO
ALTER DATABASE [TasksDB] SET  READ_WRITE 
GO
