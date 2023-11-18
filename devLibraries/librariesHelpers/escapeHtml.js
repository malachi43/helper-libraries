//ESCAPE HTML
const BaseJoi = require('joi')
const sanitizeHTML = require('sanitize-html')


//An extension that sanitizes against HTML tags
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const sanitizedOutput = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
                if (sanitizedOutput !== value) return helpers.error('string.escapeHTML', { value })
                return sanitizedOutput
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        price: Joi.number().min(0).required(),
    }).required(),
    deleteImages: Joi.array()
})


//USING THE JOI TO VALIDATE
const { error } = campgroundSchema.validate(req.body)

if (error) {
    const errorMsg = error.details.map(item => item.message).join(',')
    throw new CustomError.BadRequest(errorMsg)
}