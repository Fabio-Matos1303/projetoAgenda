require("dotenv").config();
const express = require("express");
const app = express();
// Modela o banco de dados
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.emit("pronto");
  })
  .catch((e) => console.log(e));
// Salva a sessão do utilizador por determinado tempo
const session = require("express-session");
// Salva a sessão na base de dados para que a sessão não seja salva na memória
const MongoStore = require("connect-mongo");
// Flash messages (mensagens autodestrutivas -> mensagem de erros/feedbacks) -> Salvas na sessão
const flash = require("connect-flash");
// Rotas da aplicação (home, contato etc)
const routes = require("./routes");
// Trabalhar com caminhos
const path = require("path");
// const helmet = require("helmet");
// Tokens que criamos para o formulário, faz com que nenhum aplicativo externo poste coisas na aplicação
const csrf = require("csurf");
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");

// app.use(helmet());

// Habilita a utilização de formulários na aplicação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Acessar diretamente os arquivos que estão dentro da pasta public
app.use(express.static(path.resolve(__dirname, "public")));

// Configurações de sessão
const sessionOptions = session({
  secret: "kasjdkajsd kajsdkajs kjsdakjs",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

// Arquivos que a gente renderiza na tela
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
//  Meus middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

// Pega o sinal emitido ao conectar no banco de dados e diz o que deve ser feito ao final da conexão
app.on("pronto", () => {
  app.listen(3000, () => {
    console.log("Acessar http://localhost:3000/");
    console.log("Servidor executando na porta 3000");
  });
});
