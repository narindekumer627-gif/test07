// --- GLOBAL DATA MAPPING ---
const programsData = {
    'contract-staffing': {
        title: 'Contract & Gig Staffing Solutions',
        desc: 'Prarambh Skills provides verified, compliant on-site industrial and general contractors. We coordinate local talent identification, verify identity cards, handle minimum-wage regulatory audits, and ensure transparent, on-time payroll delivery to maintain shift continuity.'
    },
    'permanent-placement': {
        title: 'Permanent Direct Hiring',
        desc: 'We assist enterprises in identifying skilled supervisors, specialized mechanics, corporate office managers, and sales specialists. Our recruitment desk performs reference reviews and verified background screens prior to placement.'
    },
    'payroll-hrms': {
        title: 'Payroll & HR Compliance',
        desc: 'Reducing your internal company overheads. We process employee hours, direct bank disbursements, Provident Fund (EPF), healthcare deposits (ESIC), professional tax submissions, and handle official compliance audits.'
    },
    'apprenticeship-naps': {
        title: 'Apprenticeships (NAPS/NATS)',
        desc: 'Optimize your operational training setups. We align with central government apprenticeship guidelines (NAPS/NATS) to source, deploy, and verify stipend allocations for structured learner cohorts.'
    },
    'facility-management': {
        title: 'Facility Support Staff',
        desc: 'Supply of vetted on-site crews for commercial layouts, storage spaces, assembly plants, and administrative buildings. All personnel are fully verified and trained in basic environmental safety protocols.'
    },
    'rpl-certification': {
        title: 'RPL Assessment Matching',
        desc: 'We map previously uncertified workers with formal National Skill Qualification Framework (NSQF) levels, recognizing their prior real-world field experience to upgrade their hiring standards.'
    }
};

const syllabusData = {
    'AIU': {
        title: 'Asian International University Sourcing Pipeline',
        details: `
            <strong>Fresher Placement Program:</strong> Directly sourcing fresh vocational stream graduates for entry-level corporate deployments.<br><br>
            <strong>Functional Batches Available:</strong><br>
            • Retail Services & Warehousing Operations<br>
            • Automotive Line Production Specialists<br>
            • Technical Customer Service & Support<br><br>
            We handle immediate interview scheduling, background checks, and on-site integration loops.
        `
    },
    'Orchid': {
        title: 'Orchid University Sourcing Collaboration',
        details: `
            <strong>Industrial Training Partnerships:</strong> Connecting qualified apprentices and practical diploma holders to manufacturing locations.<br><br>
            <strong>Functional Batches Available:</strong><br>
            • Production Management Assistants<br>
            • Clean Energy Assembly Handlers<br>
            • Front Desk Office Operations<br><br>
            All pools are ready for direct apprenticeship loops or seasonal contract roles.
        `
    }
};

const sectorData = {
    'BFSI': 'Sourcing verified backend KYC processors, physical address verifiers, retail loan coordinators, and field sales teams.',
    'Auto': 'Certified plant assembly assistants, CNC machine coordinators, mechanical helpers, and general shop floor staff.',
    'FMCG': 'Sourcing localized product delivery drivers, FMCG warehouse assistants, billing operators, and display coordinators.',
    'Hospitality': 'Sourcing banquet crew, food layout preparation staff, lobby helpers, and hospitality custodians.',
    'Telecom': 'Sourcing fiber deployment crews, physical site supervisors, and tele-sales agents.',
    'Agri': 'Sourcing cold-storage helpers, crop sorters, automated plant packaging crews, and logistics supervisors.',
    'IT': 'Desktop help desk support, local network troubleshooting assistants, and customer service teams.',
    'Logistics': 'Sourcing high-volume warehouse pickers, product packers, vehicle loading teams, and dispatch coordinators.',
    'Retail': 'Sourcing store service representatives, billing checkouts, retail inventory helpers, and local sales staff.',
    'Education': 'Technical trainers, educational facility helpers, student counselors, and administrative staff.',
    'Energy': 'Deploying physical solar installation crews, smart utility systems operators, and plant safety checkers.'
};

// --- 1. PARTICLE CANVAS SIMULATION (If Canvas exists) ---
const canvas = document.getElementById('interactive-particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function initCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        createParticles();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 2 + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(46, 204, 113, 0.6)';
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                this.x -= dx / dist * force * 2;
                this.y -= dy / dist * force * 2;
            }
        }
    }

    function createParticles() {
        particles = [];
        const count = Math.min(Math.floor(canvas.width / 15), 100);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist/120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    initCanvas();
    animateParticles();
}

// --- 2. 3D TILT PHYSICS ---
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const rx = ((yc - y) / yc) * 10;
        const ry = ((x - xc) / xc) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// --- 3. COUNT-UP ANIMATION ---
const counterSection = document.querySelector('.animated-counters-grid');
if (counterSection) {
    const counters = document.querySelectorAll('.counter-card');
    let counterStarted = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const numberEl = counter.querySelector('.counter-number');
            let count = 0;
            const increment = Math.ceil(target / 60);

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    numberEl.innerText = count + "+";
                    requestAnimationFrame(updateCount);
                } else {
                    numberEl.innerText = target + "+";
                }
            };
            updateCount();
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                runCounters();
                counterStarted = true;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterSection);
}

// --- 4. INTERACTIVE MAP CONTROL (For Contact page) ---
function switchLocation(locationKey) {
    document.querySelectorAll('.hub-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.location-view-pane').forEach(pane => pane.classList.remove('active'));

    const activeTab = event.currentTarget;
    activeTab.classList.add('active');

    const targetPane = document.getElementById(`pane-${locationKey}`);
    if (targetPane) targetPane.classList.add('active');
}

// --- 5. LIGHTBOX OVERLAYS ---
function toggleLightbox(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.toggle('active');
}

function closeLightboxOnOutsideClick(event) {
    if (event.target === event.currentTarget) {
        event.currentTarget.classList.remove('active');
    }
}

function openProgramDetails(key) {
    const data = programsData[key];
    if (data) {
        document.getElementById('program-title').innerText = data.title;
        document.getElementById('program-desc').innerText = data.desc;
        toggleLightbox('program-lightbox');
    }
}

function showSyllabusModal(key) {
    const data = syllabusData[key];
    if (data) {
        document.getElementById('syllabus-title').innerText = data.title;
        document.getElementById('syllabus-details').innerHTML = data.details;
        toggleLightbox('syllabus-lightbox');
    }
}

function showSectorInfo(key) {
    const detail = sectorData[key];
    if (detail) {
        document.getElementById('program-title').innerText = `${key} Sector Staffing Capabilities`;
        document.getElementById('program-desc').innerHTML = detail;
        toggleLightbox('program-lightbox');
    }
}

// --- 6. SLIDE-OUT QUICK INQUIRY PANEL ---
function toggleQuickInquiryPanel() {
    const panel = document.getElementById('quickInquiryPanel');
    if (panel) panel.classList.toggle('active');
}

// --- 7. DYNAMIC FORM SUBMISSIONS (WhatsApp routing) ---
function adaptFormFields() {
    const selectRole = document.getElementById('form-role-type');
    if (!selectRole) return;
    const role = selectRole.value;
    const heading = document.getElementById('form-heading');
    const grpCompany = document.getElementById('grp-company');
    const lblName = document.getElementById('lbl-name');
    const lblService = document.getElementById('lbl-service');
    const formService = document.getElementById('form-service');

    if (role === 'Candidate') {
        heading.innerText = 'Apply for Placements';
        grpCompany.style.display = 'none';
        lblName.innerText = 'Your Full Name';
        lblService.innerText = 'Preferred Job Field';
        formService.innerHTML = `
            <option value="" disabled selected>Choose your area of expertise</option>
            <option value="Industrial / Production Worker">Industrial &amp; Production</option>
            <option value="Logistics Picker / Delivery">Logistics Picker &amp; Delivery</option>
            <option value="Hospitality or Retail Executive">Hospitality or Retail</option>
            <option value="IT Helpdesk support / Desktop Repair">IT &amp; Technical Support</option>
        `;
    } else {
        heading.innerText = 'Connect With Our Hiring Team';
        grpCompany.style.display = 'block';
        lblName.innerText = 'Contact Person Name';
        lblService.innerText = 'Required Hiring Category';
        formService.innerHTML = `
            <option value="" disabled selected>Choose a workforce class</option>
            <option value="Contract & Gig Staffing">Contract &amp; Gig Staffing</option>
            <option value="Permanent Placement Sourcing">Permanent Direct Hiring</option>
            <option value="NAPS/NATS Apprentices">NAPS/NATS Apprentices</option>
            <option value="Payroll & Compliance Management">Payroll &amp; HR Compliance</option>
        `;
    }
}

function handleFormSubmission(event, formType) {
    event.preventDefault();
    const form = event.currentTarget;
    
    const nameEl = form.querySelector('[id*="name"]') || form.querySelector('input[type="text"]');
    const companyEl = form.querySelector('[id*="company"]') || form.querySelectorAll('input[type="text"]')[1];
    const serviceEl = form.querySelector('[id*="service"]') || form.querySelector('select');
    const phoneEl = form.querySelector('[id*="phone"]') || form.querySelector('input[type="tel"]');
    const roleEl = document.getElementById('form-role-type');

    const nameVal = nameEl ? nameEl.value : 'Inquirer';
    const roleVal = roleEl ? roleEl.value : 'Employer';
    const companyVal = (companyEl && companyEl.offsetParent !== null) ? companyEl.value : 'Not Applicable (Candidate)';
    const serviceVal = serviceEl ? serviceEl.value : 'General Sourcing Request';
    const phoneVal = phoneEl ? phoneEl.value : '';

    const message = `Hello Prarambh Skills Solutions,%0A%0AI am reaching out to submit an inquiry.%0A%0A*Inquiry Category:* ${formType}%0A*User Class:* ${roleVal}%0A*Name:* ${nameVal}%0A*Company:* ${companyVal}%0A*Hiring Requirement:* ${serviceVal}%0A*Contact:* ${phoneVal}%0A%0APlease contact me to discuss the next deployment steps.`;

    window.open(`https://wa.me/916230509372?text=${message}`, '_blank');
    form.reset();
    if (typeof adaptFormFields === 'function') adaptFormFields();
}

function toggleMobileMenu() {
    const nav = document.querySelector('.nav-bar');
    if (nav) {
        nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%'; nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = 'var(--color-navy)';
        nav.style.padding = '20px';
    }
}