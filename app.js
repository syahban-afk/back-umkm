const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./Routes/index');
const usersRouter = require('./Routes/users');
const productsRouter = require('./Routes/ProductsRoutes');
const productReviewsRouter = require('./Routes/Product_ReviewsRoutes');
const customersRouter = require('./Routes/CustomersRoutes');
const ordersRouter = require('./Routes/OrdersRoutes');
const orderDetailsRouter = require('./Routes/Order_DetailsRoutes');
const wishlistsRouter = require('./Routes/WishlistsRoutes');
const productCategoriesRouter = require('./Routes/Product_CategoriesRoutes');
const discountsRouter = require('./Routes/DiscountsRoutes');
const discountCategoriesRouter = require('./Routes/Discount_CategoriesRoutes');
const deliveriesRouter = require('./Routes/DeliveriesRoutes');
const paymentsRouter = require('./Routes/PaymentsRoutes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use("/uploads", express.static("uploads"));
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/product-reviews', productReviewsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/order-details', orderDetailsRouter);
app.use('/api/wishlists', wishlistsRouter);
app.use('/api/product-categories', productCategoriesRouter);
app.use('/api/discounts', discountsRouter);
app.use('/api/discount-categories', discountCategoriesRouter);
app.use('/api/deliveries', deliveriesRouter);
app.use('/api/payments', paymentsRouter);

module.exports = app;

const DB_PORT = process.env.DB_PORT;
app.listen(DB_PORT, () => {
    console.log(`Server is running on port ${DB_PORT}`);
    console.log(`http://localhost:${DB_PORT}`);
});
