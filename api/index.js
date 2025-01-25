import express, { response } from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import categoryRouter from "./route/category.route.js";
import userRouter from "./route/user.route.js";
import uploadRouter from "./route/upload.route.js";
// import subCategoryRouter from "./route/subcategory.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
// import addressRouter from "./route/address.route.js";
// import orderRouter from "./route/order.route.js";

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false
}))

// app.use(express.json());
const PORT = 8080 || process.env.PORT

app.get('/', (request, response) => {
    response.json({
        message: `Server is running on port: ${PORT}`
    })
});
 

//  routes
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
// app.use('/api/subcategory', subCategoryRouter)
app.use('/api/product', productRouter)
app.use('/api/file', uploadRouter)
app.use('/api/cart', cartRouter)
// app.use('/api/address', addressRouter)
// app.use('/api/order', orderRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    })
});

