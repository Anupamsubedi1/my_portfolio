// Portfolio Data - Single source of truth

export const personalInfo = {
  name: "Anupam Subedi",
  title: "ML Enthusiast & Full Stack Developer",
  location: "Baniyatar, Kathmandu, Nepal",
  email: "anupamsubedi542@gmail.com",
  contactEmail: "anupamking444@gmail.com",
  phone: "+977 9843012542",
  linkedin: "https://www.linkedin.com/in/anupam-subedi-773719346/",
  github: "https://github.com/Anupamsubedi1",
  facebook: "https://www.facebook.com/anupam.subedi",
  tagline: "Building intelligent systems with code and data",
}

export const profile = "Machine Learning enthusiast and Full Stack Developer specializing in real-world, data-driven projects. Passionate about building intelligent systems that solve practical problems including spam detection, sentiment analysis, and predictive modeling. Proficient in full-stack development with the MERN stack, combining ML expertise with web technologies to create end-to-end solutions. Dedicated to exploring cutting-edge machine learning techniques and transforming complex data into actionable insights and deployable applications."

export const education = [
  {
    institution: "Amrit Science Campus, Lainchaur, Nepal",
    period: "Feb 2022 – Feb 2026",
    degree: "Bachelor of Science in Computer Science and Information Technology (BSc CSIT)",
    grade: "Predicted Grade: First Class",
    modules: "Data Structures and Algorithms, Database Management Systems, Computer Networks, Machine Learning, Software Engineering",
    dissertation: "Spam Message Detection in Real-Time Chat Systems Using Machine Learning",
  },
  {
    institution: "Fluorescent Secondary School, Kathmandu, Nepal",
    period: "Aug 2019 – Jun 2021",
    degree: "National Education Board",
    subjects: "Physics, Chemistry, Biology, Mathematics, English",
  },
]

export const technicalSkills = {
  "Programming Languages": ["Python", "JavaScript", "Java", "C++"],
  "Machine Learning & Data Analysis": ["Data preprocessing", "Classification", "Regression", "Model evaluation"],
  "Libraries": ["TensorFlow", "Keras", "Scikit-learn", "PyTorch", "NumPy", "Pandas", "Matplotlib"],
  "Web Development": ["React.js", "Next.js", "Node.js", "Express.js"],
  "Databases": ["MySQL", "PostgreSQL", "MongoDB"],
}

export const academicProjects = [
  {
    title: "Connectify – Real-Time Chat Application with Spam Detection",
    description: "MERN stack chat application with real-time spam detection",
    tags: ["React", "Node.js", "Machine Learning", "MongoDB"],
    links: [
      { label: "Live Demo", url: "https://chatapp-connectify.netlify.app", type: "demo" },
      { label: "Thesis", url: "https://drive.google.com/file/d/18wi-a7D4pXJmlp4w_raG8klNbRF9-P83/view", type: "document" },
    ],
  },
  {
    title: "Video Sentiment Analysis System",
    description: "Sentiment classification from video content using deep learning",
    tags: ["Python", "Deep Learning", "Computer Vision"],
    links: [
      { label: "GitHub", url: "https://github.com/Anupamsubedi1/Video_sentiment_project", type: "github" },
    ],
  },
  {
    title: "Quick Stay – Hotel Booking Application",
    description: "Full-stack hotel booking web application",
    tags: ["Next.js", "React", "Full Stack"],
    links: [
      { label: "Live Demo", url: "https://quick-stay-hotel-booking-website-fr.vercel.app/", type: "demo" },
    ],
  },
  {
    title: "Machine Learning Prediction Projects",
    description: "Collection of ML models for real-world predictions",
    tags: ["Python", "TensorFlow", "Scikit-learn"],
    items: [
      "ANN regression model for predicting electrical energy output of a Combined Cycle Power Plant",
      "Breast cancer prediction",
      "Heart disease prediction",
    ],
  },
]

export const participation = [
  "Member, Code for Change Nepal (2024–2025)",
  "Robotics Workshop – Genius Robotics Olympiad (2017)",
  "Hult Prize Campus Participation (2024)",
]

export const academicRecords = [
  "Higher Secondary GPA: 3.36 – Nepal Mega College",
  "Secondary School GPA: 3.75 – REHDON Secondary School",
  "Student of the Year – 2017",
  "100% tuition fee waiver during secondary education",
]

export const additionalSkills = {
  languages: "Nepali (Native), English (Fluent), Hindi (Fluent)",
  other: "Strong teamwork, academic writing, communication, active listening, growth mindset",
}

export const interests = "Machine learning research, problem solving, reading, endurance running, football, cricket"

export const researchInterests = {
  title: "Real-World Machine Learning Applications",
  description: "Passionate about leveraging machine learning to solve real-world problems through predictive analytics and data-driven decision making.",
  areas: [
    {
      title: "Healthcare Predictions",
      description: "Developing ML models for disease prediction including breast cancer detection and heart disease risk assessment, enabling early diagnosis and preventive healthcare.",
      icon: "heart"
    },
    {
      title: "Energy Optimization",
      description: "Building ANN regression models to predict electrical energy output in Combined Cycle Power Plants, optimizing energy production and reducing waste.",
      icon: "zap"
    },
    {
      title: "Natural Language Processing",
      description: "Creating spam detection systems for real-time chat applications and sentiment analysis from video content to understand user emotions and improve communication.",
      icon: "message"
    },
    {
      title: "Predictive Analytics",
      description: "Applying classification and regression techniques to diverse datasets, transforming raw data into actionable insights for informed decision-making.",
      icon: "trending"
    }
  ]
}
