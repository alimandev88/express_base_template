import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { SetBaseResError } from "../interfaces/base_interface";

const tokenVerify: RequestHandler = (req, res, next) => {
  try {
    let auth = req.headers.authorization;
    if (!auth)
      return res.status(401).json(
        SetBaseResError({
          message: "Un-authorized!",
          statusCode: 401,
          exception: "",
        })
      );
    if (
      verify(auth, process.env.JWT_KEY == undefined ? "" : process.env.JWT_KEY)
    ) {
      next();
    } else {
      return res.status(401).json(
        SetBaseResError({
          message: "Un-authorized!",
          statusCode: 401,
          exception: "",
        })
      );
    }
  } catch (error) {
    return res.status(500).json(
      SetBaseResError({
        message: "Error from server!",
        statusCode: 500,
        exception: error as string,
      })
    );
  }
};

export default { tokenVerify };
