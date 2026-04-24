// Advanced simulation features for Fourier Series

class FourierSimulation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        this.isAnimating = false;
        this.time = 0;
    }

    // Draw coordinate axes
    drawAxes() {
        const { ctx, canvas } = this;
        const { width, height } = canvas;

        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 2;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(50, height/2);
        ctx.lineTo(width - 50, height/2);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(width/2, 50);
        ctx.lineTo(width/2, height - 50);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#5C4033';
        ctx.font = '14px Arial';
        ctx.fillText('x', width - 30, height/2 - 10);
        ctx.fillText('y', width/2 + 10, 30);
    }

    // Draw grid
    drawGrid() {
        const { ctx, canvas } = this;
        const { width, height } = canvas;

        ctx.strokeStyle = '#D2B48C';
        ctx.lineWidth = 0.5;
        
        for (let x = 100; x < width; x += 100) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        for (let y = 100; y < height; y += 100) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    // Calculate Fourier series for different wave types
    calculateFourier(x, harmonics, waveType) {
        let sum = 0;
        
        switch(waveType) {
            case 'square':
                for (let n = 1; n <= harmonics; n += 2) {
                    sum += (4 / (n * Math.PI)) * Math.sin(n * x);
                }
                break;
            case 'sawtooth':
                for (let n = 1; n <= harmonics; n++) {
                    sum += (2 / (n * Math.PI)) * Math.pow(-1, n + 1) * Math.sin(n * x);
                }
                break;
            case 'triangle':
                for (let n = 1; n <= harmonics; n += 2) {
                    sum += (8 / (Math.PI * Math.PI * n * n)) * Math.cos(n * x);
                }
                break;
            case 'custom':
                sum = Math.sin(x) + 0.5 * Math.sin(2*x) + 0.33 * Math.sin(3*x);
                break;
        }
        
        return sum;
    }

    // Animate the Fourier series
    animate(harmonics, waveType) {
        if (this.isAnimating) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.isAnimating = true;
        const animate = () => {
            this.time += 0.02;
            this.draw(harmonics, waveType, this.time);
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    // Stop animation
    stopAnimation() {
        this.isAnimating = false;
        cancelAnimationFrame(this.animationId);
    }

    // Draw the complete visualization
    draw(harmonics, waveType, time = 0) {
        const { ctx, canvas } = this;
        const { width, height } = canvas;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw background elements
        this.drawGrid();
        this.drawAxes();

        // Draw Fourier approximation
        ctx.beginPath();
        ctx.strokeStyle = '#A0522D';
        ctx.lineWidth = 3;
        
        for (let pixelX = 0; pixelX < width; pixelX++) {
            const x = (pixelX / width) * 4 * Math.PI - 2 * Math.PI;
            const y = this.calculateFourier(x + time, harmonics, waveType);
            const canvasY = height/2 - y * 100;
            
            if (pixelX === 0) {
                ctx.moveTo(pixelX, canvasY);
            } else {
                ctx.lineTo(pixelX, canvasY);
            }
        }
        
        ctx.stroke();
    }
}

// Export for use in main.js
window.FourierSimulation = FourierSimulation;
