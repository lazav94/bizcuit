import { Request, Response, Router } from "express";

const router = Router();

/**
 * Function for sending a error
 */
export const errorResponse = (
  res: Response,
  error: any,
  statusCode = 400
): void => {
  res.status(statusCode).json({
    success: false,
    message: error?.message as string,
    error: {
      statusCode,
      message: error?.message as string,
      ...error,
    },
  });
};

// TODO improve error handling - message was not send correctly
router.use("*", (_req: Request, res: Response) => {
  errorResponse(res, new Error("Not found"), 404);
});

export default router;
