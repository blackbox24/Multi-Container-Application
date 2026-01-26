import { z, ZodError} from "zod";

export const todoInput = z.object({
    body: z.object({
        title: z.string().max(20).min(10), 
        is_complete: z.boolean().optional()
    })
})


export const handleControllerError = (
  error,
  res,
  context,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });
  }
  console.error(`${context} Controller Error:`, error);
  return res.status(500).json({
    message: "An internal server error occurred",
    ...(process.env.NODE_ENV === "development" && { debug: error.message }),
  });
};
