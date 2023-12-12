import { RequestHandler } from 'express';
import { NOT_FOUND } from 'http-status';

// eslint-disable-next-line arrow-body-style
const notFound: RequestHandler = (_req, res) => {
  return res.status(NOT_FOUND).json({
    success: false,
    message: 'Requested Url Not Found!!',
  });
};

export default notFound;
