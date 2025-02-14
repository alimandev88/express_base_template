import { RequestHandler } from "express";
import c from "../repositories/users_repository";
import {
  SetBaseResError,
  SetBaseResGet,
  SetBaseResPost,
} from "../interfaces/base_interface";

const post: RequestHandler = async (req, res) => {
  try {
    const { email, password, fullname, phone } = req.body;

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

    if (!fullname)
      return res.status(400).json(
        SetBaseResError({
          message: "Fullname not found!",
          statusCode: 400,
          exception: "",
        })
      );

    if (!phone)
      return res.status(400).json(
        SetBaseResError({
          message: "Phone not found!",
          statusCode: 400,
          exception: "",
        })
      );

    const result = await c.add({
      email: email,
      fullname: fullname,
      password: password,
      phone: phone,
    });

    if (result.error != null) {
      return res.status(400).json(
        SetBaseResError({
          message: result.error.message,
          statusCode: 400,
          exception: result.error.stack,
        })
      );
    }

    return res.status(200).json(
      SetBaseResPost({
        message: "User success added!",
        statusCode: 200,
        data: result.response,
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

const update: RequestHandler = async (req, res) => {
  try {
    const { email, password, fullname, phone } = req.body;

    if (!req.params.id)
      return res.status(400).json(
        SetBaseResError({
          message: "ID not found on your endpoint!",
          statusCode: 400,
          exception: "",
        })
      );

    const result = await c.update(Number.parseInt(req.params.id), {
      email: email,
      fullname: fullname,
      password: password,
      phone: phone,
    });

    if (result.error != null) {
      return res.status(400).json(
        SetBaseResError({
          message: result.error.message,
          statusCode: 400,
          exception: result.error.stack,
        })
      );
    }

    return res.status(200).json(
      SetBaseResPost({
        message: "User success update!",
        statusCode: 200,
        data: result.response,
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

const getMany: RequestHandler = async (req, res) => {
  try {
    const { email, fullname, phone, length, order, startFrom } = req.query;
    const lengthQuery = length ? Number.parseInt(length.toString()) : 10;
    const orderQuery = order == "asc" ? "asc" : "desc";
    const startFromQuery = startFrom
      ? Number.parseInt(startFrom.toString())
      : 0;

    const result = await c.readMany({
      email: email ? email.toString() : undefined,
      fullname: fullname ? fullname.toString() : undefined,
      phone: phone ? phone.toString() : undefined,
      length: lengthQuery,
      order: orderQuery,
      startFrom: startFromQuery,
    });

    if (result.error != null) {
      return res.status(400).json(
        SetBaseResError({
          message: result.error.message,
          statusCode: 400,
          exception: result.error.stack,
        })
      );
    }

    return res.status(200).json(
      SetBaseResGet({
        data: result.response,
        length: lengthQuery,
        statusCode: 200,
        startFrom: startFromQuery,
        total: await c.readCount(),
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

const getOne: RequestHandler = async (req, res) => {
  try {
    const idParam = req.params.id;

    if (!idParam)
      return res.status(400).json(
        SetBaseResError({
          message: "ID not found on your endpoint!",
          statusCode: 400,
          exception: "",
        })
      );

    const result = await c.readOne(Number.parseInt(idParam));

    if (result.error != null) {
      return res.status(400).json(
        SetBaseResError({
          message: result.error.message,
          statusCode: 400,
          exception: result.error.stack,
        })
      );
    }

    return res.status(200).json(
      SetBaseResGet({
        data: result.response,
        length: 1,
        statusCode: 200,
        startFrom: 0,
        total: 1,
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

const drop: RequestHandler = async (req, res) => {
  try {
    const { idList } = req.body;

    const result = await c.destroy(idList);

    if (result.error != null) {
      return res.status(400).json(
        SetBaseResError({
          message: result.error.message,
          statusCode: 400,
          exception: result.error.stack,
        })
      );
    }

    return res
      .status(200)
      .json(
        SetBaseResPost({ statusCode: 200, message: result.response as string })
      );
  } catch (error) {
    console.log(error)
    return res.status(500).json(
      SetBaseResError({
        message: "Error from server!",
        statusCode: 500,
        exception: error as string,
      })
    );
  }
};

export default { post, update, getMany, getOne, drop };
