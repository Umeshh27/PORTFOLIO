// Typing effect for hero section
function setupTypingEffect() {
	const el = document.getElementById('typing-text');
	if (!el) return;
	const words = [
		'Learner',
		'Developer',
		'Problem Solver',
		'Student',
		'Collaborator',
		'Innovator',
		'Tech Enthusiast',
		'Team Player',
		'Dreamer',
		'Coder',
		'Explorer'
	];
	let wordIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
		let typingSpeed = 300;
	let pauseTime = 900;

	// Prevent layout shift by setting min-width
	el.style.display = 'inline-block';
	el.style.minWidth = '160px';

	function getTypingColor() {
		return document.body.classList.contains('dark-mode')
			? '#6ee7b7'
			: '#4f46e5';
	}

	function type() {
		const current = words[wordIndex];
		let displayText = 'A ';
		if (isDeleting) {
			displayText += current.substring(0, charIndex--);
		} else {
			displayText += current.substring(0, charIndex++);
		}
		el.innerHTML = `<span style="color:${getTypingColor()};font-weight:600;">${displayText}</span>`;
		if (!isDeleting && charIndex === current.length + 1) {
			isDeleting = true;
			setTimeout(type, pauseTime);
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			wordIndex = (wordIndex + 1) % words.length;
			setTimeout(type, 350);
		} else {
			setTimeout(type, isDeleting ? 80 : typingSpeed);
		}
	}
	type();

	// Listen for theme changes
	const themeBtn = document.getElementById('theme-toggle');
	if (themeBtn) {
		themeBtn.addEventListener('click', () => {
			setTimeout(() => type(), 100);
		});
	}
}

// Theme toggle logic for #theme-toggle
function setupThemeToggle() {
	const themeBtn = document.getElementById('theme-toggle');
	if (!themeBtn) return;
	const body = document.body;
	// Initial state
	let darkMode = false;
	if (localStorage.getItem('theme') === 'dark') {
		body.classList.add('dark-mode');
		darkMode = true;
	} else {
		body.classList.remove('dark-mode');
		darkMode = false;
	}
	themeBtn.addEventListener('click', function() {
		darkMode = !darkMode;
		if (darkMode) {
			body.classList.add('dark-mode');
			localStorage.setItem('theme', 'dark');
		} else {
			body.classList.remove('dark-mode');
			localStorage.setItem('theme', 'light');
		}
	});
}

function animateNeuralBackground() {
  const canvas = document.getElementById('background-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  // Neural network points
  let points = [];
	let numPoints = 30;
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7
    });
  }

  function drawNeural() {
    ctx.clearRect(0, 0, w, h);
    // Draw connections
    for (let i = 0; i < numPoints; i++) {
      for (let j = i + 1; j < numPoints; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.strokeStyle = 'rgba(79,70,229,0.18)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }
    // Draw nodes
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(110,231,183,0.7)';
      ctx.shadowColor = 'rgba(110,231,183,0.7)';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });
    requestAnimationFrame(drawNeural);
  }
  drawNeural();

  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  });
}

window.addEventListener('DOMContentLoaded', function() {
    animateNeuralBackground();
    setupThemeToggle();
    setupTypingEffect();
    // Mouse follower
    const follower = document.querySelector('.mouse-follower');
    if (follower) {
        window.addEventListener('mousemove', e => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });
    }
});
