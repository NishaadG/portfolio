const projectsData = [
    {
        id: 'tasknest',
        title: 'TaskNest',
        image: 'tasknest.png',
        description: 'Full-stack task management platform with React/Vite frontend and Express/MongoDB backend to track tasks and manage users.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
        links: {
            github: 'https://github.com/NishaadG/TaskNest',
            website: 'https://tasknest-frontend-qymd.onrender.com/login'
        },
        metrics: [
            'Architected to manage 50+ tasks and 20+ users.',
            '80% of API responses under 700ms on Render.',
            'Secured 20+ API endpoints with JWT, cutting auth errors by 50%.',
            'Enabled one-click Excel downloads, reducing reporting time by 60%.'
        ]
    },
    {
        id: 'dashcam',
        title: 'AI Dashcam Risk Assessment',
        image: 'aidashcam.png',
        description: 'AI-powered system that analyzes dashcam footage in real-time to detect and alert drivers to potential collision risks.',
        tags: ['Python', 'OpenCV', 'YOLOv8', 'Scikit-Learn'],
        links: {
            github: 'https://github.com/NishaadG/AI-Dashcam-Risk-Assessment',
            video: 'https://drive.google.com/file/d/1J_pZ8F02plvzLY1uUgJW8U-Mj6DrGZkk/view'
        },
        metrics: [
            'Achieved 85% precision in detecting collision risks at 20FPS.',
            'Sliding window logic triggered alerts based on 10+ high-risk frames.',
            'Annotated 50+ bounding boxes per minute in real-time using OpenCV.'
        ]
    },
    {
        id: 'blogspot',
        title: 'BlogSpot',
        image: 'photo.png',
        description: 'A modular and responsive React blog platform designed for seamless content management across all devices.',
        tags: ['React', 'JavaScript', 'HTML', 'CSS', 'React Router'],
        links: {
            github: 'https://github.com/NishaadG/React-Blog-Website'
        },
        metrics: [
            'Designed with a mobile-first, responsive UI for seamless UX.',
            'Streamlined content management for creating, editing, and deleting posts.',
            'Integrated React Router for navigation with state preservation.'
        ]
    }
];

function populateProjects() {
    const grid = document.getElementById('project-grid-container');
    if (!grid) return;

    grid.innerHTML = '';
    
    for (const project of projectsData) {
        const tagsHTML = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        const linksHTML = `
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" class="project-link">GitHub</a>` : ''}
            ${project.links.website ? `<a href="${project.links.website}" target="_blank" class="project-link">Live Site</a>` : ''}
            ${project.links.video ? `<a href="${project.links.video}" target="_blank" class="project-link">Demo Video</a>` : ''}
        `;

        const metricsHTML = project.metrics.map(metric => `<li>${metric}</li>`).join('');

        const card = document.createElement('div');
        card.className = 'project-card hidden';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title} Screenshot" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <ul class="project-metrics">
                    ${metricsHTML}
                </ul>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <footer class="project-links">
                    ${linksHTML}
                </footer>
            </div>
        `;
        grid.appendChild(card);
    }
}

function initScrollAnimations() {
    const hiddenElements = document.querySelectorAll('.hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15
    });

    hiddenElements.forEach(el => observer.observe(el));
}

let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThreeJS() {
    const canvas = document.getElementById('three-bg');
    if (!canvas) return;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    const particleCount = 20000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--primary-color'));

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000;
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.7
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('touchstart', onDocumentTouchStart, { passive: false });
    document.addEventListener('touchmove', onDocumentTouchMove, { passive: false });
    window.addEventListener('resize', onWindowResize);
    
    window.addEventListener('scroll', onScroll);
}

function animate() {
    requestAnimationFrame(animate);

    const targetRotationX = (mouseY - windowHalfY) * 0.0001;
    const targetRotationY = (mouseX - windowHalfX) * 0.0001;
    
    particles.rotation.x += (targetRotationX - particles.rotation.x) * 0.02;
    particles.rotation.y += (targetRotationY - particles.rotation.y) * 0.02;

    particles.rotation.z += 0.0001;

    renderer.render(scene, camera);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX;
        mouseY = event.touches[0].pageY;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX;
        mouseY = event.touches[0].pageY;
    }
}

function onScroll() {
    if (window.scrollY > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        populateProjects();
        initThreeJS();
        animate();
        setTimeout(initScrollAnimations, 100); 
    } catch (e) {
        console.error("Failed to initialize portfolio:", e);
        const canvas = document.getElementById('three-bg');
        if(canvas) canvas.style.display = 'none';
        document.body.style.background = '#0a0a0a';
    }
});

