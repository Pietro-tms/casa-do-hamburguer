import * as z from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(1, { error: "O nome é obrigatório" }),
  email: z.email({ error: "O email é inválido" }),
  password: z
    .string()
    .min(3, { error: "A senha deve ter pelo menos 3 caracteres" }),
  cep: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/, {
      error: "O CEP deve ter 8 dígitos, com ou sem hífen",
    }),
});

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});
