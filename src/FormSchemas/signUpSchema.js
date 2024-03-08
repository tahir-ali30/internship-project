import { z } from "zod";

const signUpSchema = z.object({
    first_name: z.string().min(1, 'First Name cannot be empty'),
    last_name: z.string().min(1, 'Last Name cannot be empty'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    phone: z.string().min(1, 'Phone Number cannot be empty'),
});

export default signUpSchema;