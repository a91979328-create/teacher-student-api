const User = require ('../models/User.js')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken');

const teacherRegister = async (req, res) => {
    try {
        const { name, email, password, subject } = req.body;
        
    if(!name || !email || !password) {
        return res.status(400).json({ message: "All fields required"})
    }

    const existingUser = await User.findOne({  email });

    if(existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await User.create({ 
        name,
        email,
        password: hashedPassword,
        role: "teacher",
        subject: subject || "Not assigned"
    });

    const token = jwt.sign(
        { id: teacher._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    res.status(201).json({
        success: true,
        message: "Teacher registered successfully",
        token,
        teacher: {
            id: teacher._id,
            name: teacher.name,
            email: teacher.email,
            role: teacher.role,
            subject: teacher.subject 
        }
    })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const teacherLogin = async (req , res) => {
    try{
        const { email, password } = req.body;

        const teacher = await User.findOne({ email, role: "teacher" })
    
        if(!teacher) return res.status(401).json({ message: "Invalid ccredentials"})
   
        const isMatch = await bcrypt.compare(password, teacher.password)
        if(!isMatch) return res.status(401).json({ message: "Passowrd does not match"})

        const token = jwt.sign(
            { id: teacher._id },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.json({
            success: true,
            message: "Teacher logged in successfully",
            token, 
            teacher: {
                id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                role: teacher.role,
                subject: teacher.subject
            }
        });
   
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}

// STUDENT REGISTER
const studentRegister = async (req, res) => {
    try {
        const { name, email, password, className, rollNumber } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "student",
            className: className || "Not assigned",
            rollNumber: rollNumber || 0
        });

        const token = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                role: student.role,
                className: student.className,
                rollNumber: student.rollNumber
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ message: "Only teachers can view all students" });
        }

        const students = await User.find({ role: 'student' }).select('-password');
        res.json({ success: true, students });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getStudentProfile = async (req, res) => {
    try {
        const studentId = req.params.id;
        
        if (req.user.role === 'student' && req.user.id !== studentId) {
            return res.status(403).json({ message: "You can only view your own profile" });
        }

        const student = await User.findById(studentId).select('-password');
        if (!student || student.role !== 'student') {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ success: true, student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { teacherRegister, teacherLogin, studentRegister, getAllStudents, getStudentProfile }