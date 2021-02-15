import express from "express";
import 'express-async-errors';
import { json } from "body-parser";

import { authRouter } from "./routes";
import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";
import mongoose from "mongoose";

const app = express();
app.use(json());

// routes
app.use(authRouter);
app.all('*', async() => {
  throw new NotFoundError();
})
app.use(errorHandler);

(async function() {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  } catch (error) {
      console.error(error);
  }

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

}());
