window.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const progress = document.getElementById('progress');
    const loadingText = document.getElementById('loading-text');
    const loaderWrapper = document.getElementById('loader-wrapper');
    const contentDiv = document.querySelector('.content');
    const typingTextElement = document.getElementById('typing-text');
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    const successScreen = document.getElementById('success-screen');
    const folderContainer = document.getElementById('folder-container');
    const backBtn = document.getElementById('back-to-menu');
    
    // Elementos para el camino del NO
    const noScreen = document.getElementById('no-screen');
    const dontWorryText = document.getElementById('dont-worry-text');
    const bouncingCard = document.getElementById('bouncing-card');

    let porcentaje = 0;
    const pregunta = "Goal: 15,000 dollars... did you make it?";

    // 1. Barra de Carga
    const intervaloCarga = setInterval(() => {
        porcentaje += 1;
        if (progress) progress.style.width = porcentaje + '%';
        if (loadingText) loadingText.innerText = porcentaje + '%';
        if (porcentaje >= 100) {
            clearInterval(intervaloCarga);
            setTimeout(() => {
                loaderWrapper.classList.add('fade-out');
                contentDiv.style.display = 'flex'; 
                setTimeout(startTypingAnimation, 700); 
            }, 500);
        }
    }, 30);

    // 2. Animación de Escritura
    function startTypingAnimation() {
        let charIndex = 0;
        typingTextElement.textContent = "";
        const typingInterval = setInterval(() => {
            if (charIndex < pregunta.length) {
                typingTextElement.textContent += pregunta.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                showButtons();
            }
        }, 80);
    }

    function showButtons() {
        button1.classList.remove('hidden');
        button1.classList.add('visible');
        setTimeout(() => {
            button2.classList.remove('hidden');
            button2.classList.add('visible');
        }, 300);
    }

    // 3. Lógica Botón YES
    button1.addEventListener('click', () => {
        contentDiv.style.opacity = "0";
        setTimeout(() => {
            contentDiv.style.display = "none";
            successScreen.style.display = "flex";
            successScreen.style.opacity = "1";
            setTimeout(() => {
                folderContainer.style.display = "block";
                folderContainer.style.opacity = "1";
                folderContainer.style.zIndex = "10000";
            }, 1000);
        }, 500);
    });

    // 4. Lógica Botón NO (CORREGIDA)
    button2.addEventListener('click', () => {
        contentDiv.style.opacity = "0";
        setTimeout(() => {
            contentDiv.style.display = "none";
            noScreen.style.display = "flex";
            setTimeout(() => {
                dontWorryText.style.opacity = "1";
            }, 100);
            setTimeout(() => {
                bouncingCard.style.display = "flex";
            }, 2000);
        }, 500);
    });

    // 5. Lógica Botón Back to Menu
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            location.reload(); // La forma más limpia de reiniciar todo el flujo
        });
    }
});
// --- Lógica del Dark Veil (CORREGIDA) ---
    const canvas = document.getElementById('veil-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 50; // Aumentamos un poco la cantidad

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 200 + 100; 
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                // Color un poco más brillante para que se note el efecto "nebulosa"
                this.opacity = Math.random() * 0.15; 
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width + 100 || this.x < -100 || this.y > canvas.height + 100 || this.y < -100) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                // Usamos un tono azul/violeta muy sutil
                gradient.addColorStop(0, `rgba(70, 70, 120, ${this.opacity})`); 
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateVeil() {
            // Fondo negro sólido base
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateVeil);
        }

        animateVeil();
    }
function resizeCanvas() {
    // Usamos innerWidth y innerHeight para captar el tamaño real del móvil
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Si tienes muchas partículas, en móvil podrías reducirlas para mejorar rendimiento
    if(window.innerWidth < 768) {
        particleCount = 20; 
    }
}
