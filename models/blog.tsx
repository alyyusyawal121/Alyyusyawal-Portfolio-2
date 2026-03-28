
import mongoose, {Schema, models} from 'mongoose'




const BlogScheme = new Schema(
    {

        title:{
            type:String,
            required: true 
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true, 
        },
        date: {
            type: String,
            required: true, 
        },
        readTime: {
            type: String,
            required: true, 
        },
        tags: {
            type: [String], 
            required: true,
        },

    },
    { timestamps: true }
)

const Blog = models.Blog || mongoose.model('Blog', BlogScheme);

export default Blog