import { Prisma, PrismaClient, Users } from "@prisma/client";
import c from "../utilities/crypto";
import {
  UserFilter,
  UserRequest,
  UserRequestUpdate,
} from "../interfaces/user_interface";
import { RepoRepository } from "../interfaces/base_interface";

const prisma = new PrismaClient();

async function add({
  email,
  phone,
  fullname,
  password,
}: UserRequest): Promise<RepoRepository<Users>> {
  try {
    const res = await prisma.users.create({
      data: {
        email: String(email),
        phone: String(phone),
        fullname: String(fullname),
        password: String(c.encrypt(password)),
      },
    });

    return { response: res as Users };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e);
      if (e.code === "P2002") {
        e.message = `${
          e.meta ? (e.meta?.target as string[]).toString() : ""
        } already exist!`;
        return {
          error: e,
        };
      }

      return { error: e };
    }

    throw e;
  }
}

async function readMany({
  email,
  fullname,
  phone,
  order = "desc",
  startFrom = 0,
  length = 10,
}: UserFilter): Promise<RepoRepository<Users[]>> {
  try {
    const res = await prisma.users.findMany({
      orderBy: {
        id: order,
      },
      skip: startFrom,
      take: length,
      where: {
        email: email,
        fullname: fullname,
        phone: phone,
      },
    });

    return { response: res as Users[] };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e);
      return { error: e };
    }

    throw e;
  }
}

async function readOne(id: number): Promise<RepoRepository<Users>> {
  try {
    const res = await prisma.users.findUniqueOrThrow({
      where: {
        id: id,
      }
    });

    return { response: res as Users };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e);
      return { error: e };
    }

    throw e;
  }
}

async function update(
  id: number,
  { email, fullname, password, phone }: UserRequestUpdate
): Promise<RepoRepository<Users>> {
  try {
    const res = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        email: email ? String(email) : undefined,
        phone: phone ? String(phone) : undefined,
        fullname: fullname ? String(fullname) : undefined,
        password: password ? String(c.encrypt(password)) : undefined,
      },
    });

    return { response: res as Users };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e);

      if (e.code === "P2002") {
        e.message = `${
          e.meta ? (e.meta?.target as string[]).toString() : ""
        } already exist!`;
        return {
          error: e,
        };
      }

      return { error: e };
    }

    throw e;
  }
}

async function destroy(idList: number[]): Promise<RepoRepository<string>> {
  try {
    const res = await prisma.users.deleteMany({
      where: {
        id: {
          in: idList
        },
      },
    });

    return {
      response:
        res.count > 0 ? `${res.count} items has deleted!` : "Delete failed!",
    };
  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      
      return { error: e };
    }

    throw e;
  }
}

async function readCount(): Promise<number> {
  try {
    const res = await prisma.users.count();

    return res;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e);
      return 0;
    }

    throw e;
  }
}

export default { add, destroy, readMany, readOne, update, readCount };
