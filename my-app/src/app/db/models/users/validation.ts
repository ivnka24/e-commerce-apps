import { z } from "zod";

export const userValidation = z.object({
  username: z.string({message : 'username is required'}),
  email: z.string({message : 'email is required'}).email({message: "Email invalid format"}),
  password: z.string({message: 'password is required'}).min(5,{message: 'password must be 5 characters'}),
});

export const loginValidation = userValidation.pick({email: true, password: true})
