import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // В режиме разработки выводим подробную информацию
  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).json({
      status: 'error',
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // В продакшн-режиме отправляем общее сообщение
  // Логируем ошибку для последующего анализа
  console.error('ERROR 💥', err);

  return res.status(err.statusCode).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

export default errorHandler;
