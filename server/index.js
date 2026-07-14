console.log("Program started");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const webSocketService = require('./services/webSocketService');
const { getConfig } =  require('./services/configService');
const {log, levels} =  require('./utils/logUtils');
const tasksService =   require('./services/tasksService');
const usersService =   require('./services/usersService');
const authenticationService =   require('./services/authenticationService');
const checkConnectionService =   require('./services/checkConnectionService');
const messagesService =   require('./services/massagesService');
const {startCheckDates} = require('./utils/massagesUtils');
const { requireAuth } = require('./middleware/authMiddleware');

app.use(
   bodyParser.urlencoded ({
      extended:true,
   })
);

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(cors({
   origin: 'http://localhost:4200',
   credentials: true
}));

// Session middleware
app.use(session({
   secret: 'task-management-secret-key-2024',
   resave: false,
   saveUninitialized: false,
   cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false // set to true in production with HTTPS
   }
}));

// Public routes (no auth required)
app.use('/checkConnection', checkConnectionService);
app.use('/auth', authenticationService);
app.use('/messages', messagesService);

// Protected routes (auth required)
app.use('/tasks', requireAuth, tasksService);
app.use('/users', usersService); // usersService has its own requireAuth + requireAdmin

app.use((req,res,next) => {
    const error = new Error("not found")
    error.status = 404;
    next(error)
})


//handler error middleware

app.use((error, req, res, next) =>{

res.status(error.status || 500).send ({
    error:{ status:error.status || 500,
          message: error.message || 'Internal Server Error'
       }
   })

})

 getConfig().then (
   (config) => {
      app.listen(config.APP_PORT, function () {
             log(`app listening on port ${config.APP_PORT }!`, levels.ALTER);
      });
      webSocketService.initWebSocket({
         port: config.WEB_SOCKET_PORT,
      });
      startCheckDates();

    }

)

