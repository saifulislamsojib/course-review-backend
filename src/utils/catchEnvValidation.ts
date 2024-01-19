import { ZodError, z } from 'zod';

const envValidationSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z
    .string()
    .optional()
    .refine((port) => (port ? parseInt(port, 10) > 0 : true), {
      message: 'PORT must be a positive integer.',
    }),
  DB_URI: z.string(),
});

const catchEnvValidation = async () => {
  try {
    await envValidationSchema.parseAsync(process.env);
  } catch (error) {
    console.log('Env validation error =', (error as ZodError).errors);
    process.exit(1);
  }
};

export default catchEnvValidation;
