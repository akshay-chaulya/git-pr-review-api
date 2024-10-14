import { Response } from "express";
import { CustomError, ResponsStatus } from "../types"; // Typo fix in ResponseStatus

// Throw error as a CustomError
const throwError = ({ message, statusCode }: CustomError): never => {
    throw { message, statusCode };
};

// Type guard to check if the error is a CustomError
const isCustomError = (error: any): error is CustomError => {
    return (
        error &&
        typeof error === 'object' &&
        'statusCode' in error &&
        'message' in error
    );
};

// Global error handler
const errorHandler = (res: Response, error: unknown, optional?: string): Response => {
    if (isCustomError(error)) {
        // Handle known CustomError
        return res.status(error.statusCode).json({ message: error.message, success: false });
    } else {
        // Handle unknown errors (checking if response exists to avoid runtime errors)
        const status = (error as any)?.response?.data?.status || ResponsStatus.InternalServerError;
        const message = (error as any)?.response?.data?.message || optional || "Server Error. Try again later.";

        return res.status(status).json({
            message,
            success: false,
        });
    }
};

export { errorHandler, throwError };
