const z = require('zod');

const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    description: z.string({
        required_error: 'Description is required'
    }),
    date: z.string().datetime().optional(),
    priority: z.string().refine(value => ['Low', 'Medium', 'High'].includes(value), {
        message: 'Priority must be "Low", "Medium", or "High"',
    }).optional(),
});

module.exports = createTaskSchema;