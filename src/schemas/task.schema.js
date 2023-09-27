const z = require('zod');

const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    description: z.string({
        required_error: 'Description is required'
    }),
    priority: z.number({
        required_error: 'Priority es required'
    }),
    date: z.string().datetime().optional(),
});

module.exports = createTaskSchema;