
import express from "express";
import { getMe, login, register , forgotPassword,
  resetPassword } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Vijay
 *               email:
 *                 type: string
 *                 example: vijay@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: customer
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", register);

// router.post("/register", register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get Logged In User
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User profile
 */
router.get("/me" ,authMiddleware,  getMe);


/**
 * @swagger
 * /api/auth/admin-test:
 *   get:
 *     summary: Admin Test Route
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Welcome Admin
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access only
 */
router.get(
  "/admin-test",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: vijay@gmail.com
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Password reset link sent to your email
 *       404:
 *         description: User not found
 */
router.post(
  "/forgot-password",
  forgotPassword
);

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post(
  "/reset-password/:token",
  resetPassword
);  

export default router;