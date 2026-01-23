const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

// Schemas
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
});

const TeacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teacherId: { type: String, required: true, unique: true },
    subjects: [String],
    qualifications: [{ degree: String, institution: String, year: Number }],
    experience: Number,
    salary: Number,
    isActive: { type: Boolean, default: true },
});

const CourseSchema = new mongoose.Schema({
    courseId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    subject: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: Number, required: true },
    fee: { type: Number, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    batches: [{
        batchName: String,
        startDate: Date,
        schedule: [{ day: String, startTime: String, endTime: String }],
        capacity: Number,
        enrolled: { type: Number, default: 0 },
        room: String
    }],
    syllabus: [String],
    status: { type: String, default: 'ACTIVE' },
    thumbnail: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

const sampleCourses = [
    {
        title: "HSC 2026 Academic Care - Physics",
        description: "Comprehensive Physics course for HSC 1st year students covering all chapters with detailed explanations.",
        subject: "Physics",
        level: "HSC",
        fee: 15000,
        thumbnail: "https://images.unsplash.com/photo-1632571401005-458e9d244591?q=80&w=2942&auto=format&fit=crop"
    },
    {
        title: "Engineering Admission Math",
        description: "Advanced Mathematics preparation for BUET, RUET, CUET, KUET aspirants.",
        subject: "Math",
        level: "Admission",
        fee: 18000,
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop"
    },
    {
        title: "SSC 2025 Crash Course",
        description: "Intensive 3-month crash course for SSC candidates including model tests and solve classes.",
        subject: "General Science",
        level: "SSC",
        fee: 8000,
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2940&auto=format&fit=crop"
    },
    {
        title: "Medical Biology Masterclass",
        description: "Complete Biology preparation for Medical Admission Tests with shortcut techniques.",
        subject: "Biology",
        level: "Admission",
        fee: 14000,
        thumbnail: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2800&auto=format&fit=crop"
    },
    {
        title: "IELTS Preparation Premium",
        description: "Comprehensive IELTS preparation covering Reading, Writing, Listening, and Speaking.",
        subject: "English",
        level: "Job Preparation",
        fee: 12000,
        thumbnail: "https://images.unsplash.com/photo-1549721345-5cb95d122295?q=80&w=2910&auto=format&fit=crop"
    },
    {
        title: "Organic Chemistry Deep Dive",
        description: "Master Organic Chemistry mechanisms and reactions for HSC and Admission.",
        subject: "Chemistry",
        level: "HSC",
        fee: 6000,
        thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2940&auto=format&fit=crop"
    },
    {
        title: "Higher Math 2nd Paper Full Course",
        description: "Detailed coverage of Higher Math 2nd paper including Calculus and Probability.",
        subject: "Math",
        level: "HSC",
        fee: 7500,
        thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2942&auto=format&fit=crop"
    },
    {
        title: "Varsity 'Ka' Unit Prep",
        description: "Focused preparation for Dhaka University A Unit admission test.",
        subject: "Science",
        level: "Admission",
        fee: 16500,
        thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2940&auto=format&fit=crop"
    },
    {
        title: "SSC English Grammar",
        description: "Build strong foundations in English Grammar for SSC exams.",
        subject: "English",
        level: "SSC",
        fee: 5000,
        thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2873&auto=format&fit=crop"
    },
    {
        title: "ICT Full Course for HSC",
        description: "Complete ICT syllabus coverage with C programming and HTML.",
        subject: "ICT",
        level: "HSC",
        fee: 5500,
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop"
    },
    {
        title: "Basic Mathematics for Job Exams",
        description: "Shortcuts and mental math techniques for BCS and Bank Job exams.",
        subject: "Math",
        level: "Job Preparation",
        fee: 4000,
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop"
    },
    {
        title: "Physics 1st Paper Visualized",
        description: "Learn physics with animations and real-life examples.",
        subject: "Physics",
        level: "HSC",
        fee: 7000,
        thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=2874&auto=format&fit=crop"
    },
    {
        title: "Botany Masterclass",
        description: "In-depth study of Botany for HSC and Medical Admission.",
        subject: "Biology",
        level: "HSC",
        fee: 6500,
        thumbnail: "https://images.unsplash.com/photo-1518531933037-9a847e0f390d?q=80&w=2940&auto=format&fit=crop"
    },
    {
        title: "Accounting for Business Studies",
        description: "Principles of Accounting for HSC Business Studies students.",
        subject: "Accounting",
        level: "HSC",
        fee: 6000,
        thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2826&auto=format&fit=crop"
    },
    {
        title: "English Spoken Course",
        description: "Improve your fluency and confidence in English speaking.",
        subject: "English",
        level: "Other",
        fee: 3500,
        thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop"
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Find or Create a User (Teacher)
        let user = await User.findOne({ email: 'teacher@demo.com' });
        if (!user) {
            user = await User.create({
                name: 'Demo Teacher',
                email: 'teacher@demo.com',
                password: 'password123', // In real app, hash this
                role: 'teacher'
            });
            console.log('Created demo user');
        }

        // 2. Find or Create Teacher Profile
        let teacher = await Teacher.findOne({ userId: user._id });
        if (!teacher) {
            teacher = await Teacher.create({
                userId: user._id,
                teacherId: 'TCH-2026-0001',
                subjects: ['Physics', 'Math'],
                qualifications: [{ degree: 'M.Sc', institution: 'BUET', year: 2020 }],
                experience: 5,
                salary: 50000
            });
            console.log('Created demo teacher profile');
        }

        // 3. Create Courses
        console.log('Seeding courses...');
        await Course.deleteMany({}); // Optional: clear existing courses to avoid dupes/mess

        const courses = await Promise.all(sampleCourses.map(async (data, index) => {
            return Course.create({
                courseId: `CRS-2026-${String(index + 1).padStart(4, '0')}`,
                ...data,
                duration: Math.floor(Math.random() * 6) + 3, // 3-9 months
                teacher: teacher._id,
                status: 'ACTIVE',
                batches: [{
                    batchName: 'Batch A',
                    startDate: new Date(),
                    schedule: [
                        { day: 'Sunday', startTime: '18:00', endTime: '20:00' },
                        { day: 'Tuesday', startTime: '18:00', endTime: '20:00' }
                    ],
                    capacity: 50,
                    enrolled: Math.floor(Math.random() * 40),
                    room: 'Room 101'
                }],
                syllabus: ['Introduction', 'Core Concepts', 'Advanced Topics', 'Final Review']
            });
        }));

        console.log(`Successfully created ${courses.length} courses!`);
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
