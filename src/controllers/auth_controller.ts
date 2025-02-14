import { RequestHandler } from "express";
import { SetBaseResError, SetBaseResPost } from "../interfaces/base_interface";
import c from "../repositories/users_repository";
import cr from "../utilities/crypto";
import jwt from "jsonwebtoken";

const auth: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json(
        SetBaseResError({
          message: "Email not found!",
          statusCode: 400,
          exception: "",
        })
      );

    if (!password)
      return res.status(400).json(
        SetBaseResError({
          message: "Password not found!",
          statusCode: 400,
          exception: "",
        })
      );

    const getUser = await c.readMany({ email: email });

    if (getUser.error != null) {
      return res.status(400).json(
        SetBaseResError({
          message: getUser.error.message,
          statusCode: 400,
          exception: getUser.error.stack,
        })
      );
    }

    if (getUser.response?.length != 1) {
      return res.status(400).json(
        SetBaseResError({
          message: "Email or password is wrong!",
          statusCode: 400,
          exception: "",
        })
      );
    }

    const checkPw = cr.verify(password, getUser.response[0].password);

    if (!checkPw) {
      return res.status(401).json(
        SetBaseResError({
          message: "Email or password is wrong!",
          statusCode: 401,
          exception: "",
        })
      );
    }

    const token = jwt.sign(
      {
        token: cr.encrypt(
          `${getUser.response[0].email}&${getUser.response[0].phone}`
        ),
      },
      `${process.env.JWT_KEY}`
    );

    return res.status(200).json(
      SetBaseResPost({
        message: "Login Success!",
        statusCode: 200,
        data: {
          token: token,
          detail: getUser.response[0],
        },
      })
    );
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

export default { auth }
