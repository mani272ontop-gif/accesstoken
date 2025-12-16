    let lastTime = 0;
    const fps = 60;
    
    function copyToken() {
        const token = "None";
        if (!token) return;
        
        navigator.clipboard.writeText(token).then(() => {
            const btn = event.currentTarget;
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>COPIED';
            btn.style.background = '#00ff88';
            btn.style.color = '#000';
            
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.style.color = '';
            }, 1500);
        });
    }
    
    // Smooth hover effects
    document.querySelectorAll('.platform-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Performance optimized background effect
    function createBackgroundDot() {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 1px;
            height: 1px;
            background: rgba(0, 212, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `;
        dot.style.left = Math.random() * 100 + 'vw';
        dot.style.top = '-10px';
        
        document.body.appendChild(dot);
        
        const duration = Math.random() * 4000 + 3000;
        const keyframes = [
            { transform: 'translateY(0) scale(1)', opacity: 0 },
            { transform: 'translateY(0) scale(1)', opacity: 0.3 },
            { transform: `translateY(${window.innerHeight + 20}px) scale(0.5)`, opacity: 0 }
        ];
        
        dot.animate(keyframes, {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => dot.remove();
    }
    
    // Reduced particle count for performance
    let dotCount = 0;
    const maxDots = 15;
    
    function manageBackgroundDots() {
        const now = Date.now();
        if (now - lastTime < 1000 / fps) return;
        
        if (dotCount < maxDots) {
            createBackgroundDot();
            dotCount++;
            setTimeout(() => dotCount--, 5000);
        }
        
        lastTime = now;
        requestAnimationFrame(manageBackgroundDots);
    }
    
    // Start background effects
    if (window.innerWidth > 768) {
        manageBackgroundDots();
    }
    
    // Prevent rapid clicking
    let lastClick = 0;
    document.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            const now = Date.now();
            if (now - lastClick < 1000) {
                e.preventDefault();
            }
            lastClick = now;
        }
    });
