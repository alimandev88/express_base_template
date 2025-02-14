import { Prisma } from "@prisma/client";

export interface BaseResponseGet {
  statusCode: number;
  length: number;
  total: number;
  startFrom: number;
  data?: any;
}

export const SetBaseResGet = ({
  length,
  startFrom,
  statusCode,
  total,
  data,
}: BaseResponseGet): BaseResponseGet => {
  return {
    length: length,
    startFrom: startFrom,
    statusCode: statusCode,
    total: total,
    data: data,
  };
};

export interface BaseResponsePost {
  statusCode: number;
  message: string;
  data?: any;
}

export const SetBaseResPost = ({
  message,
  statusCode,
  data,
}: BaseResponsePost): BaseResponsePost => {
  return {
    message: message,
    statusCode: statusCode,
    data: data,
  };
};

export interface BaseResponseError {
  statusCode: number;
  message: string;
  exception?: string;
}

export const SetBaseResError = ({
  message,
  statusCode,
  exception,
}: BaseResponseError): BaseResponseError => {
  return {
    message: message,
    statusCode: statusCode,
    exception: exception,
  };
};

export interface RepoRepository<T> {
    response?: T,
    error?: Prisma.PrismaClientKnownRequestError
}

export interface BaseFilter {
  length?: number | 10 | undefined;
  startFrom?: number | 0 | undefined;
  order?: "desc" | "asc" | undefined;
}
