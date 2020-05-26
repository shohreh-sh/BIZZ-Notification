let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let bodyParser = require('body-parser');
const cors = require("cors");

let EVENT_TYPES = {
  NOTIFICATION: "notification"
};

let port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.on("connection", function(socket) {
  console.log("A user connected");
});

app.post("/create-event", (req, res) => {
  res.send(req.body);
  io.sockets.emit(EVENT_TYPES.NOTIFICATION, req.body);
});

server.listen(port, () => {
  console.log("on port 8080");
});
