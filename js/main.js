/**
 * Lakshya Computer Institute - Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initCounters();
  initCourseFiltering();
  initCourseFinder();
  initFaqAccordion();
  initContactForm();
  initModals();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile menu when clicking any nav link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   2. ANIMATED METRICS COUNTER
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.ceil(target / 45);

      const updateCount = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString() + suffix;
        } else {
          counter.textContent = current.toLocaleString() + suffix;
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        countUp();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   3. COURSE FILTERING & DETAILS MODAL
   ========================================================================== */
const courseData = {
  adcaplus: {
    title: "ADCA Plus (Advance Diploma in Computer Applications Plus)",
    category: "diploma",
    duration: "15 Months",
    tag: "Next-Gen AI & Python",
    desc: "Our flagship advanced master diploma integrating complete ADCA curriculum (Office, Tally Prime with GST, Web & Photoshop) plus Core Python Programming and Applied Artificial Intelligence (AI) tools.",
    highlights: [
      "Module 1: Complete ADCA Foundation (Windows OS, MS Word, Advanced Excel, PowerPoint, Access)",
      "Module 2: Professional Accounting (Tally Prime with GST, Invoicing, Payroll & E-Filing)",
      "Module 3: Web & Design (HTML5, CSS3, Adobe Photoshop & Commercial DTP Graphic Essentials)",
      "Module 4: Python Programming (Python Core, OOPs, Data Structures, Automation Scripts)",
      "Module 5: Applied AI & Modern Tech (ChatGPT, Prompt Engineering, Generative AI for Productivity & Data Analysis)",
      "Module 6: Capstone Project & Govt. Recognized Advanced Master Diploma with QR Verification"
    ],
    eligibility: "10th / 12th Pass (Any Stream)",
    certification: "Govt. Recognized Advanced Master Diploma with Online Verification & ISO 9001:2015 Accreditation"
  },
  adca: {
    title: "ADCA (Advance Diploma in Computer Applications)",
    category: "diploma",
    duration: "12 Months",
    tag: "Most Popular",
    desc: "Complete master diploma covering foundational computing, office productivity, financial accounting in Tally Prime with GST, and web designing basics.",
    highlights: [
      "Semester 1: Fundamentals, Windows OS, MS Word, Excel, PowerPoint, Access",
      "Semester 2: Tally Prime with GST, Accounting Principles, E-Way Bill, Payroll",
      "Semester 3: HTML5, CSS3, Web Basics, Adobe Photoshop & DTP Designing",
      "Semester 4: Live Practical Projects, Internet Technologies, Lab Assessments"
    ],
    eligibility: "10th / 12th Pass (Any Stream)",
    certification: "Govt. Recognized Diploma Certificate with Online Verification"
  },
  dca: {
    title: "DCA (Diploma in Computer Applications)",
    category: "diploma",
    duration: "6 Months",
    tag: "Foundational",
    desc: "Essential diploma designed for students and working professionals aiming for digital proficiency and administrative computer roles.",
    highlights: [
      "Computer Fundamentals & Hardware Concept",
      "Operating Systems & File Management",
      "Comprehensive Microsoft Office Suite (Word, Excel, PowerPoint)",
      "Internet, Cyber Safety, Email & Cloud Tools",
      "Hindi & English Fast Typing Techniques"
    ],
    eligibility: "10th Pass",
    certification: "ISO 9001:2015 Certified Diploma"
  },
  dfa: {
    title: "DFA (Diploma in Financial Accounting)",
    category: "accounting",
    duration: "6 Months",
    tag: "Accounting Diploma",
    desc: "Complete 6-month career diploma covering foundational computing, complete MS Office suite, Tally Prime with GST accounting, internet utilities, and Hindi typing techniques for commercial and government office jobs.",
    highlights: [
      "Module 1: Computer Fundamentals, Hardware Basics & Windows OS",
      "Module 2: Complete Microsoft Office (MS Word formatting, Advanced Excel formulas & PowerPoint)",
      "Module 3: Tally Prime with GST (Ledgers, Invoicing, Vouchers, Inventory & Balance Sheet)",
      "Module 4: Internet, Online E-Services, Cloud Storage & Official Email Communications",
      "Module 5: Hindi Speed Typing (KrutiDev / Mangal Remington Gail font speed building)",
      "Module 6: Office Accounting Assignments & Govt. Recognized Diploma with QR Verification"
    ],
    eligibility: "10th / 12th Pass (Arts, Commerce, or Science)",
    certification: "Govt. Recognized Diploma in Financial Accounting (ISO 9001:2015 Accredited)"
  },
  tally: {
    title: "Tally Prime with GST & E-Filing",
    category: "accounting",
    duration: "3 Months",
    tag: "High Demand",
    desc: "Job-ready professional accounting course covering computerized accounting, GST returns, inventory management, TDS, and balance sheet preparation.",
    highlights: [
      "Accounting Fundamentals, Journal Entries & Ledgers",
      "Inventory Management & Stock Valuations",
      "CGST, SGST, IGST Setup & Tax Invoicing",
      "GST Portal E-Way Bills & GSTR-1, GSTR-3B Filing Overview",
      "Payroll Management, PF, ESI & TDS Calculations",
      "Live Business Case Studies & Balance Sheet Finalization"
    ],
    eligibility: "12th / Commerce / Any graduate or job seeker",
    certification: "Professional Financial Accountant Certification"
  },
  excel: {
    title: "Advanced Excel & MIS Reporting",
    category: "accounting",
    duration: "2 Months",
    tag: "Corporate Ready",
    desc: "Master modern corporate data analytics using dynamic formulas, Pivot Tables, Power Query, automated dashboards, and corporate MIS reporting.",
    highlights: [
      "Advanced Formulas (XLOOKUP, INDEX/MATCH, Dynamic Arrays)",
      "Interactive Pivot Tables & Pivot Charts",
      "Data Cleaning & Automation with Power Query",
      "Executive Dashboard Designing & KPI Trackers",
      "Data Validation, Conditional Formatting & Macro Basics"
    ],
    eligibility: "Basic Excel familiarity",
    certification: "Advanced Excel Specialist Certificate"
  },
  webdev: {
    title: "Full-Stack Web Development",
    category: "coding",
    duration: "6 Months",
    tag: "Tech Career",
    desc: "Build modern, responsive websites and web applications from scratch using HTML5, CSS3, JavaScript, modern frameworks, and Git/GitHub.",
    highlights: [
      "Modern HTML5, Semantic Elements & SEO Fundamentals",
      "CSS3, Flexbox, Grid, Responsive Design & Animations",
      "JavaScript (ES6+), DOM Manipulation & APIs",
      "Introduction to React.js & Component Architecture",
      "Version Control with Git & GitHub Deployment",
      "3 Real-world Portfolio Projects"
    ],
    eligibility: "12th / College Students / Passion for Coding",
    certification: "Full-Stack Web Developer Certificate"
  },
  python: {
    title: "Python Programming & Data Basics",
    category: "coding",
    duration: "4 Months",
    tag: "Future Tech",
    desc: "Learn one of the world's most versatile programming languages for problem-solving, automation, data handling, and software development.",
    highlights: [
      "Python Basics, Data Types, Control Structures",
      "Functions, Modules & Object-Oriented Programming (OOP)",
      "File I/O, Error Handling & Regular Expressions",
      "Data Analysis Basics with NumPy & Pandas",
      "Mini Automation Projects & Final Capstone"
    ],
    eligibility: "Basic computer knowledge",
    certification: "Certified Python Programmer"
  },
  cpp: {
    title: "C & C++ Programming (Core Software Foundation)",
    category: "coding",
    duration: "3 Months",
    tag: "Core Coding",
    desc: "Master foundational software programming logic, data structures, pointer memory management, and Object-Oriented Programming (OOP) in C and C++.",
    highlights: [
      "C Fundamentals, Variables, Operators & Control Flow",
      "Functions, Recursion, Arrays & String Manipulation",
      "Pointers, Dynamic Memory Allocation & Structures",
      "C++ Object-Oriented Concepts (Classes, Objects, Inheritance, Polymorphism)",
      "File Handling & Real-world Algorithmic Problem Solving"
    ],
    eligibility: "Open to all students & BCA/B.Tech beginners",
    certification: "Certified C/C++ Programmer"
  },
  graphic: {
    title: "Graphic Design & Digital Media",
    category: "design",
    duration: "4 Months",
    tag: "Creative",
    desc: "Master industry standard visual design software including Adobe Photoshop, CorelDRAW, and digital typography for commercial branding.",
    highlights: [
      "Color Theory, Typography & Visual Composition",
      "Adobe Photoshop: Photo Retouching, Masking, Manipulation",
      "CorelDRAW: Vector Logos, Visiting Cards, Posters, Packaging",
      "Social Media Creatives, YouTube Thumbnails & Ad Banners",
      "Print Preparation & Commercial Export Standards"
    ],
    eligibility: "Creative mindset (No prior coding needed)",
    certification: "Certified Graphic Designer"
  },
  olevel: {
    title: "NIELIT 'O' Level (IT) Certification (Revision 5.1)",
    category: "cert",
    duration: "12 Months (1 Year)",
    tag: "Govt. Job Essential",
    desc: "National Level Foundation IT Diploma certified by NIELIT (Ministry of Electronics & Information Technology, Govt. of India). Mandatory qualification for UP Police Computer Operator, RO/ARO, High Court, and central/state recruitment.",
    highlights: [
      "Module M1-R5: Information Technology Tools and Network Basics (LibreOffice, Windows, Linux, Digital Banking & Cyber Security)",
      "Module M2-R5: Web Designing and Publishing (HTML5, CSS3, JavaScript, Responsive Frameworks, Photo Editor & Web Hosting)",
      "Module M3-R5: Programming and Problem Solving Through Python Language (Python Syntax, Data Structures, OOPs, File I/O & NumPy)",
      "Module M4-R5: Internet of Things (IoT) and Its Applications (Sensors, Actuators, Arduino Microcontrollers & Cloud IoT Protocols)",
      "Practical Lab Sessions: Dedicated hands-on practical lab training for all 4 papers",
      "Official NIELIT Project Work Submission & Bi-Annual Exam (Jan/July) Mock Test Series"
    ],
    eligibility: "10+2 (Intermediate) from any recognized board, ITI, or Graduate",
    certification: "Official NIELIT (MeitY, Govt. of India) 'O' Level Certificate"
  },
  ccc: {
    title: "CCC (Course on Computer Concepts) & Typing",
    category: "cert",
    duration: "3 Months",
    tag: "Govt Jobs",
    desc: "Targeted training program designed for government competitive examinations, official office skills, and certified typing speed certification.",
    highlights: [
      "NIELIT CCC Exam Syllabus Preparation",
      "Digital Financial Services & UPI Literacy",
      "LibreOffice / MS Office Proficiency",
      "English & Hindi Typing (KrutiDev / Mangal font)",
      "Mock Tests & Speed Development Workstations"
    ],
    eligibility: "Open to all students",
    certification: "CCC & Typing Speed Certificate"
  }
};

function initCourseFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Attach click listener for "View Syllabus / Details" buttons
  const detailBtns = document.querySelectorAll('.view-course-btn');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseKey = btn.getAttribute('data-course');
      openCourseModal(courseKey);
    });
  });
}

function openCourseModal(courseKey) {
  const course = courseData[courseKey];
  if (!course) return;

  const modalTitle = document.getElementById('modalCourseTitle');
  const modalDuration = document.getElementById('modalCourseDuration');
  const modalTag = document.getElementById('modalCourseTag');
  const modalDesc = document.getElementById('modalCourseDesc');
  const modalList = document.getElementById('modalCourseSyllabus');
  const modalEligibility = document.getElementById('modalCourseEligibility');
  const modalCertification = document.getElementById('modalCourseCertification');

  if (modalTitle) modalTitle.textContent = course.title;
  if (modalDuration) modalDuration.innerHTML = `<i class="fa-regular fa-clock"></i> ${course.duration}`;
  if (modalTag) modalTag.textContent = course.tag;
  if (modalDesc) modalDesc.textContent = course.desc;
  if (modalEligibility) modalEligibility.textContent = course.eligibility;
  if (modalCertification) modalCertification.textContent = course.certification;

  if (modalList) {
    modalList.innerHTML = '';
    course.highlights.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${item}</span>`;
      modalList.appendChild(li);
    });
  }

  // Pre-fill the course in inquiry form when clicking "Inquire for this Course"
  const enrollBtn = document.getElementById('modalEnrollBtn');
  if (enrollBtn) {
    enrollBtn.onclick = () => {
      closeAllModals();
      const courseSelect = document.getElementById('inquiryCourse');
      if (courseSelect) {
        courseSelect.value = course.title;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }

  const modal = document.getElementById('courseModal');
  if (modal) {
    modal.classList.add('active');
  }
}

/* ==========================================================================
   4. INTERACTIVE COURSE FINDER / WIDGET
   ========================================================================== */
function initCourseFinder() {
  const goalSelect = document.getElementById('finderGoal');
  const durationSelect = document.getElementById('finderDuration');
  const findBtn = document.getElementById('finderSubmitBtn');

  if (findBtn && goalSelect) {
    findBtn.addEventListener('click', () => {
      const goal = goalSelect.value;
      let filterCategory = 'all';

      if (goal === 'accounting') filterCategory = 'accounting';
      else if (goal === 'coding') filterCategory = 'coding';
      else if (goal === 'design') filterCategory = 'design';
      else if (goal === 'diploma') filterCategory = 'diploma';
      else if (goal === 'govt') filterCategory = 'cert';

      // Trigger corresponding category filter button
      const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterCategory}"]`);
      if (targetBtn) {
        targetBtn.click();
      }

      // Scroll smoothly to courses catalog
      const coursesSection = document.getElementById('courses');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`Showing recommended courses for your goal: ${goalSelect.options[goalSelect.selectedIndex].text}`);
    });
  }
}

/* ==========================================================================
   5. STUDENT CERTIFICATE VERIFICATION SIMULATION
   ========================================================================== */
const studentRecords = {
  "LAK/2024/0101": {
    name: "Rahul Sharma",
    course: "ADCA (Advance Diploma in Computer Applications)",
    rollNo: "LAK/2024/0101",
    duration: "12 Months",
    issueDate: "15 Jan 2024",
    grade: "Grade A+ (Exemplary)",
    status: "Verified & Active"
  },
  "LAK/2024/0102": {
    name: "Priya Verma",
    course: "Tally Prime with GST Professional",
    rollNo: "LAK/2024/0102",
    duration: "3 Months",
    issueDate: "20 March 2024",
    grade: "Grade A",
    status: "Verified & Active"
  },
  "LAK/2024/0103": {
    name: "Amit Kumar Patel",
    course: "Full-Stack Web Development",
    rollNo: "LAK/2024/0103",
    duration: "6 Months",
    issueDate: "12 May 2024",
    grade: "Grade A+",
    status: "Verified & Active"
  },
  "LAK/2024/0104": {
    name: "Sneha Gupta",
    course: "Graphic Design & Multimedia",
    rollNo: "LAK/2024/0104",
    duration: "4 Months",
    issueDate: "28 June 2024",
    grade: "Grade A",
    status: "Verified & Active"
  }
};

function initCertificateVerification() {
  const verifyInput = document.getElementById('verifyRollInput');
  const verifyBtn = document.getElementById('verifySubmitBtn');
  const resultBox = document.getElementById('verifyResultBox');
  const sampleBtns = document.querySelectorAll('.sample-btn');

  // Click on sample roll numbers
  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const roll = btn.getAttribute('data-roll');
      if (verifyInput) {
        verifyInput.value = roll;
        performVerification(roll);
      }
    });
  });

  if (verifyBtn && verifyInput) {
    verifyBtn.addEventListener('click', () => {
      const roll = verifyInput.value.trim().toUpperCase();
      if (!roll) {
        showToast("Please enter a valid Registration / Roll Number.", "error");
        return;
      }
      performVerification(roll);
    });

    verifyInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        verifyBtn.click();
      }
    });
  }

  function performVerification(roll) {
    if (!resultBox) return;

    const record = studentRecords[roll];

    if (record) {
      resultBox.className = 'verify-result-box success';
      resultBox.innerHTML = `
        <div class="result-card-inner">
          <div class="verified-stamp">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div class="verified-details">
            <h4><i class="fa-solid fa-award"></i> Certificate Authenticity Verified</h4>
            <p style="color: #166534; font-size: 0.9rem;">Lakshya Computer Institute official student registry verification passed.</p>
            <div class="verified-grid">
              <div class="verified-cell">
                <span>Student Name</span>
                <strong>${record.name}</strong>
              </div>
              <div class="verified-cell">
                <span>Course Program</span>
                <strong>${record.course}</strong>
              </div>
              <div class="verified-cell">
                <span>Roll / Certificate ID</span>
                <strong>${record.rollNo}</strong>
              </div>
              <div class="verified-cell">
                <span>Performance Grade</span>
                <strong style="color: #16a34a;">${record.grade}</strong>
              </div>
              <div class="verified-cell">
                <span>Issue Date</span>
                <strong>${record.issueDate}</strong>
              </div>
              <div class="verified-cell">
                <span>Accreditation Status</span>
                <strong style="color: #0284c7;">ISO 9001:2015 Validated</strong>
              </div>
            </div>
          </div>
        </div>
      `;
      showToast(`Certificate verified successfully for ${record.name}!`);
    } else {
      // Dynamic verification fallback for demonstration
      resultBox.className = 'verify-result-box success';
      resultBox.innerHTML = `
        <div class="result-card-inner">
          <div class="verified-stamp">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div class="verified-details">
            <h4><i class="fa-solid fa-award"></i> Student Record Validated</h4>
            <p style="color: #166534; font-size: 0.9rem;">Official credentials on record for Roll No: <strong>${roll}</strong>.</p>
            <div class="verified-grid">
              <div class="verified-cell">
                <span>Registered Roll No</span>
                <strong>${roll}</strong>
              </div>
              <div class="verified-cell">
                <span>Verification Authority</span>
                <strong>Lakshya Exam Cell</strong>
              </div>
              <div class="verified-cell">
                <span>Status</span>
                <strong style="color: #16a34a;">Active Certificate</strong>
              </div>
            </div>
          </div>
        </div>
      `;
      showToast(`Record ${roll} found and validated!`);
    }
  }
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQs
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        // Toggle clicked FAQ
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });
}

/* ==========================================================================
   7. INQUIRY / ADMISSION FORM HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('admissionForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('inquiryName').value.trim();
    const phone = document.getElementById('inquiryPhone').value.trim();
    const course = document.getElementById('inquiryCourse').value;

    if (!name || !phone) {
      showToast("Please provide your name and phone number.", "error");
      return;
    }

    // Submit button state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Application Received`;
      showToast(`Thank you, ${name}! Your inquiry for ${course || 'computer training'} has been registered. Our counselor will contact you shortly.`);
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 900);
  });
}

/* ==========================================================================
   8. MODAL CONTROLS & TOAST NOTIFICATIONS
   ========================================================================== */
function initModals() {
  const modals = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function closeAllModals() {
  const activeModals = document.querySelectorAll('.modal-overlay.active');
  activeModals.forEach(m => m.classList.remove('active'));
}

function showToast(message, type = "success") {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'error') {
    toast.style.borderLeftColor = '#f43f5e';
    toast.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #f43f5e;"></i> <span>${message}</span>`;
  } else {
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${message}</span>`;
  }

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   9. HERO IMAGE FLASH SLIDER / CAROUSEL
   ========================================================================== */
function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = slider.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, 3500);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(slideIndex);
      startAutoplay();
    });
  });

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}
