const express = require('express');
const { authMiddleware } = require("../middlewares/authMiddleware")
const router = express.Router();
const { teacherRegister, teacherLogin, studentRegister, getAllStudents, getStudentProfile  } = require('../controllers/authController');

/**
 * @swagger
 * /teacher/register:
 *   post:
 *     summary: Register a new teacher
 *     tags: [Teacher]
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - name
 *               - email
 *               - password
 *             properties: 
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               subject:
 *                 type: string
 *     responses:
 *       201:
 *         description: Teacher registered successfuly
 */

router.post('/teacher/register', teacherRegister);


/**
 * @swagger
 * /teacher/login:
 *   post:
 *     summary: Login teacher
 *     tags: [Teacher]
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
 *               password:
 *                 type: string 
 * 
 *     responses:
 *       200:
 *         description: Teacher logged in successfuly
 *       401:
 *         description: Invalid credentials
 */

router.post('/teacher/login', teacherLogin);


/**
 * @swagger
 * /student/register:
 *   post:
 *     summary: Register a new student
 *     tags: [Student]
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - name
 *               - email
 *               - password
 *             properties: 
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               className:
 *                 type: string
 *               rollNumber:
 *                 type: number
 * 
 *     responses:
 *       201:
 *         description: Student registered successfuly
 *       400:
 *         description: All fields required or email already exists
 */

router.post('/student/register', studentRegister);


/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students (Teacher only) 
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all students
 *       403:
 *         description: Only teachers can view all students
 *       401:
 *         description: No token provided or invalid token
 */

router.get('/students', authMiddleware, getAllStudents);


/**
 * @swagger
 * /student/profile/{id}:
 *   get:
 *     summary: Get studnet profile by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student profile
 *       403:
 *         description: You can only view your own profile
 *       404:
 *         description: Student not found 
 
 */

router.get('/student/profile/:id', authMiddleware, getStudentProfile);

module.exports = router;