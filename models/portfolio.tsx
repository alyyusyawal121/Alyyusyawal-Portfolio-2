
import mongoose, {Schema, models} from 'mongoose'



const PortfolioScheme = new Schema(
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
        category: {
            type: String,
            required: true, 
        },
        technologies: {
            type: [String], 
            required: true,
        },
        projectUrl: {
            type: String,
            required: false, 
        },
    },
    { timestamps: true }
)

const Portfolio = models.Portfolio || mongoose.model('Portfolio', PortfolioScheme);

export default Portfolio