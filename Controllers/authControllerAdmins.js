const generateToken = require('../Config/generateToken');
const { comparePassword, hashPassword } = require('../Config/bcrypt');
const { errorResponse, successResponse, internalErrorResponse, notFoundResponse } = require('../Config/responseJson');
const { admins,  } = require('../Models');
const { feedback } = require('../Models');
const Sequelize = require('sequelize');

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        // Check if admin already exists
        const existingAdmin = await admins.findOne({ where: { email } });
        if (existingAdmin) {
            errorResponse(res, 'Admin already exists', 400);
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create new admin
        const newAdmin = await admins.create({
            name,
            email,
            password: hashedPassword
        });

        const adminResponse = {
            id: newAdmin.id,
            name: newAdmin.name,
            email: newAdmin.email,
            createdAt: newAdmin.createdAt,
            updatedAt: newAdmin.updatedAt
        };

        successResponse(res, 'Admin registered successfully', adminResponse, 201);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await admins.findOne({ where: { email } });
        if (!admin) {
            notFoundResponse(res, 'Admin not found');
        }

        // Validate password
        const validPassword = await comparePassword(password, admin.password);
        if (!validPassword) {
            errorResponse(res, 'Invalid password', 401);
        }

        const adminResponse = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
        };

        const token = generateToken(admin);
        successResponse(res, 'Logged in successfully', {
            admin: adminResponse,
            token
        }, 200);
    } catch (error) {
        console.error('Error logging in admin:', error);
        internalErrorResponse(res, error);
    }
};

async function me(req, res) {
    try {
        const admin = await admins.findByPk(req.admin.id, {
            attributes: ['id', 'name', 'email']
        });
        if (!admin) {
            errorResponse(res, 'Admin not found', 404);
        }
        successResponse(res, 'Admin fetched successfully', admin, 200);
    } catch (error) {
        console.error('Error fetching admin:', error);
        internalErrorResponse(res, error);
    }
};

async function logout(req, res) {
    try {
        successResponse(res, 'Logged out successfully', null, 200);
    } catch (error) {
        console.error('Error logging out admin:', error);
        internalErrorResponse(res, error);
    }
};

const average = async (req, res) => {
    try {
        const avg = await feedback.findAll({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating']
            ],
        });

        if (!avg) {
            errorResponse(res, 'Average not calculated', 500);
        } else {
            successResponse(res, 'Average calculated successfully', avg, 201);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const statistics = async (req, res) => {
    try {
        const stats = await feedback.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('rating')), 'total_feedback'],
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating']
            ]
        });

        if (!stats) {
            errorResponse(res, 'Statistics not found', 404);
        } else {
            successResponse(res, 'Statistics found successfully', stats, 201);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

module.exports = {
    register,
    login,
    me,
    logout,
    average,
    statistics
}