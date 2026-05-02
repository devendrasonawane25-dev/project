// ============================================
// Virtual Lab - Fourier Series
// Main JavaScript File
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageName = this.getAttribute('data-page');
            loadPage(pageName);
        });
    });
    
    // Initialize feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your valuable feedback! We appreciate your time.');
            closeFeedbackModal();
            this.reset();
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeFeedbackModal();
            }
        });
    }
    
    // Load default page (Aim) IMMEDIATELY
    loadPage('aim');
});

// ============================================
// Page Content Templates
// ============================================
function getAimContent() {
    return `
        <div class="aim-sections">
            <div class="section-card active" onclick="loadPage('aim')">
                <i class="fas fa-bullseye"></i>
                <h3>Aim</h3>
                <p>Objective of the experiment</p>
            </div>
            <div class="section-card" onclick="loadPage('theory')">
                <i class="fas fa-book"></i>
                <h3>Theory</h3>
                <p>Background concepts</p>
            </div>
            <div class="section-card" onclick="loadPage('pretest')">
                <i class="fas fa-question-circle"></i>
                <h3>Pretest</h3>
                <p>Pre-experiment assessment</p>
            </div>
            <div class="section-card" onclick="loadPage('simulation')">
                <i class="fas fa-desktop"></i>
                <h3>Simulation</h3>
                <p>Interactive simulation</p>
            </div>
            <div class="section-card" onclick="loadPage('posttest')">
                <i class="fas fa-clipboard-check"></i>
                <h3>Posttest</h3>
                <p>Post-experiment assessment</p>
            </div>
            <div class="section-card" onclick="loadPage('references')">
                <i class="fas fa-book-open"></i>
                <h3>References</h3>
                <p>Further reading materials</p>
            </div>
            <div class="section-card" onclick="loadPage('contributors')">
                <i class="fas fa-users"></i>
                <h3>Contributors</h3>
                <p>People involved</p>
            </div>
            <div class="section-card" onclick="loadPage('feedback')">
                <i class="fas fa-comment-alt"></i>
                <h3>Feedback</h3>
                <p>Share your experience</p>
            </div>
        </div>
        <div class="question-section">
            <h3>Objective</h3>
            <div class="question-text">
                <p>The objective of this virtual lab experiment on Fourier Series is to:</p>
                <ul style="list-style-position: inside; padding-left: 20px; margin-top: 15px;">
                    <li style="margin-bottom: 10px;">Understand the fundamentals of Fourier Series expansion for periodic functions</li>
                    <li style="margin-bottom: 10px;">Learn to calculate Fourier coefficients (A₀, Aₙ, Bₙ) for various functions</li>
                    <li style="margin-bottom: 10px;">Visualize the step-by-step calculation process</li>
                    <li style="margin-bottom: 10px;">Generate the complete harmonic series equation</li>
                    <li style="margin-bottom: 10px;">Apply Fourier Series concepts to solve engineering problems</li>
                </ul>
            </div>
        </div>
    `;
}

function getTheoryContent() {
    return `
        <div class="theory-section">
            <div class="theory-block">
                <h3>Introduction to Fourier Series</h3>
                <p>A Fourier series is an expansion of a periodic function f(x) in terms of an infinite sum of sines and cosines. Fourier series make use of the orthogonality relationships of the sine and cosine functions.</p>
                <div class="formula-box">
                    f(x) = A₀/2 + Σ[Aₙcos(nπx/L) + Bₙsin(nπx/L)]
                </div>
                <p>where n = 1, 2, 3, ... ∞ and L is the half-period</p>
            </div>
            
            <div class="theory-block">
                <h3>Fourier Coefficients (Euler Formulas)</h3>
                <p>The Fourier coefficients are calculated using the following formulas:</p>
                <div class="formula-box">
                    <strong>A₀ = (1/L) ∫</strong><sub>-L</sub><sup>L</sup><strong> f(x) dx</strong><br><br>
                    <strong>Aₙ = (1/L) ∫</strong><sub>-L</sub><sup>L</sup><strong> f(x)cos(nπx/L) dx</strong><br><br>
                    <strong>Bₙ = (1/L) ∫</strong><sub>-L</sub><sup>L</sup><strong> f(x)sin(nπx/L) dx</strong>
                </div>
            </div>
            
            <div class="theory-block">
                <h3>Dirichlet Conditions</h3>
                <p>For a Fourier series to converge, the function must satisfy:</p>
                <ul>
                    <li>f(x) must be periodic with period 2L</li>
                    <li>f(x) must be single-valued and continuous, except possibly at a finite number of finite discontinuities</li>
                    <li>f(x) must have a finite number of maxima and minima in one period</li>
                    <li>The integral of |f(x)| over one period must converge</li>
                </ul>
            </div>

            <div class="theory-block">
                <h3>Half-Range Series</h3>
                <p>For functions defined on [0, L]:</p>
                <ul>
                    <li><strong>Half-range cosine series:</strong> Even extension, Bₙ = 0</li>
                    <li><strong>Half-range sine series:</strong> Odd extension, A₀ = 0, Aₙ = 0</li>
                </ul>
            </div>
        </div>
    `;
}

function getPretestContent() {
    return `
        <div class="question-section">
            <h3>Pretest - Fourier Series</h3>
            <form id="pretestForm">
                <div class="quiz-block">
                    <h4>1. What is the general form of a Fourier series?</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="q1" value="a"> A₀/2 + Σ(Aₙcos(nπx/L) + Bₙsin(nπx/L))
                        </label>
                        <label class="option">
                            <input type="radio" name="q1" value="b"> A₀ + Σ(Aₙcos(nx))
                        </label>
                        <label class="option">
                            <input type="radio" name="q1" value="c"> Σ(Bₙsin(nx))
                        </label>
                        <label class="option">
                            <input type="radio" name="q1" value="d"> A₀/2 + Σ(Bₙcos(nx))
                        </label>
                    </div>
                </div>
                
                <div class="quiz-block">
                    <h4>2. What does A₀ represent in Fourier series?</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="q2" value="a"> The frequency
                        </label>
                        <label class="option">
                            <input type="radio" name="q2" value="b"> The average value (DC component)
                        </label>
                        <label class="option">
                            <input type="radio" name="q2" value="c"> The amplitude
                        </label>
                        <label class="option">
                            <input type="radio" name="q2" value="d"> The phase angle
                        </label>
                    </div>
                </div>
                
                <div class="quiz-block">
                    <h4>3. For an odd function f(x), what can we say about Fourier coefficients?</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="q3" value="a"> A₀ = 0, Aₙ = 0 (only sine terms)
                        </label>
                        <label class="option">
                            <input type="radio" name="q3" value="b"> Bₙ = 0 (only cosine terms)
                        </label>
                        <label class="option">
                            <input type="radio" name="q3" value="c"> All coefficients are zero
                        </label>
                        <label class="option">
                            <input type="radio" name="q3" value="d"> A₀ = 0 only
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="calculate-btn">Submit Pretest</button>
            </form>
            <div id="pretestResult" style="margin-top: 20px;"></div>
        </div>
    `;
}

function getSimulationContent() {
    return `
        <div class="simulation-section">
            <div class="theory-block">
                <h3>Fourier Series Calculator with Step-by-Step Solution</h3>
                <p>Enter the parameters below to calculate Fourier coefficients A₀, Aₙ, Bₙ and generate the complete harmonic series equation with detailed steps.</p>
            </div>
            
            <div class="quiz-block">
                <h4>Input Parameters</h4>
                <div class="input-group">
                    <label>Half-Period (L):</label>
                    <input type="text" id="inputL" placeholder="e.g., π or 3.14159" required>
                    <small style="color: #8B7355;">Examples: Math.PI, 2, 3.14</small>
                </div>
                <div class="input-group">
                    <label>Lower Limit (-L):</label>
                    <input type="text" id="inputLowerLimit" placeholder="e.g., -Math.PI or -3.14159" required>
                    <small style="color: #8B7355;">Usually equals -L</small>
                </div>
                <div class="input-group">
                    <label>Upper Limit (L):</label>
                    <input type="text" id="inputUpperLimit" placeholder="e.g., Math.PI or 3.14159" required>
                    <small style="color: #8B7355;">Usually equals L</small>
                </div>
                <div class="input-group">
                    <label>Function f(x):</label>
                    <input type="text" id="inputFunction" placeholder="e.g., x, x*x, Math.sin(x), x*x*x" required>
                    <small style="color: #8B7355;">Use JavaScript syntax: Math.sin(x), Math.pow(x,2), x*x</small>
                </div>
                <div class="input-group">
                    <label>Number of Harmonics (n):</label>
                    <input type="number" id="inputHarmonics" placeholder="e.g., 5" min="1" max="20" value="5" required>
                    <small style="color: #8B7355;">Recommended: 1-10 for clear output</small>
                </div>
                
                <button class="calculate-btn" onclick="calculateFourierCoefficients()">
                    <i class="fas fa-calculator"></i> Calculate with Steps
                </button>
            </div>
            
            <div id="fourierResults"></div>
            <div id="fourierSteps"></div>
            <div id="fourierEquation"></div>
        </div>
    `;
}

function getPosttestContent() {
    return `
        <div class="question-section">
            <h3>Posttest - Fourier Series</h3>
            <form id="posttestForm">
                <div class="quiz-block">
                    <h4>1. What is the Fourier series of an odd function?</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="pq1" value="a"> Only cosine terms
                        </label>
                        <label class="option">
                            <input type="radio" name="pq1" value="b"> Only sine terms (Bₙ terms)
                        </label>
                        <label class="option">
                            <input type="radio" name="pq1" value="c"> Both sine and cosine terms
                        </label>
                        <label class="option">
                            <input type="radio" name="pq1" value="d"> Only constant term
                        </label>
                    </div>
                </div>
                
                <div class="quiz-block">
                    <h4>2. What is Gibbs phenomenon?</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="pq2" value="a"> Smooth convergence of series
                        </label>
                        <label class="option">
                            <input type="radio" name="pq2" value="b"> Overshoot near discontinuities (~9%)
                        </label>
                        <label class="option">
                            <input type="radio" name="pq2" value="c"> Complete divergence of series
                        </label>
                        <label class="option">
                            <input type="radio" name="pq2" value="d"> Linear approximation
                        </label>
                    </div>
                </div>
                
                <div class="quiz-block">
                    <h4>3. For half-range sine series on [0, L], Bₙ equals:</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="pq3" value="a"> (2/L)∫₀<sup>L</sup> f(x)cos(nπx/L)dx
                        </label>
                        <label class="option">
                            <input type="radio" name="pq3" value="b"> (2/L)∫₀<sup>L</sup> f(x)sin(nπx/L)dx
                        </label>
                        <label class="option">
                            <input type="radio" name="pq3" value="c"> (1/L)∫₀<sup>L</sup> f(x)dx
                        </label>
                        <label class="option">
                            <input type="radio" name="pq3" value="d"> 0
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="calculate-btn">Submit Posttest</button>
            </form>
            <div id="posttestResult" style="margin-top: 20px;"></div>
        </div>
    `;
}

function getReferencesContent() {
    return `
        <div class="references-section">
            <div class="reference-item">
                <h4>Textbooks</h4>
                <p>1. Kreyszig, E. (2011). "Advanced Engineering Mathematics" (10th ed.). Wiley.</p>
                <p>2. Greenberg, M.D. (1998). "Advanced Engineering Mathematics" (2nd ed.). Prentice Hall.</p>
                <p>3. O'Neil, P.V. (2017). "Advanced Engineering Mathematics" (8th ed.). Cengage Learning.</p>
            </div>
            
            <div class="reference-item">
                <h4>Online Resources</h4>
                <p>1. MIT OpenCourseWare - Differential Equations (18.03)</p>
                <p>2. Khan Academy - Fourier Series Tutorials</p>
                <p>3. Wolfram MathWorld - Fourier Series</p>
                <p>4. NPTEL - Engineering Mathematics Courses</p>
            </div>
            
            <div class="reference-item">
                <h4>Research Papers</h4>
                <p>1. Cooley, J.W., & Tukey, J.W. (1965). "An algorithm for the machine calculation of complex Fourier series."</p>
                <p>2. Gibbs, J.W. (1899). "Fourier's Series." Nature, 59, 200-606.</p>
            </div>
        </div>
    `;
}

function getContributorsContent() {
    return `
        <div class="contributors-section">
            <div class="contributor-grid">
                <div class="contributor-card">
                    <i class="fas fa-user-tie"></i>
                    <h4>Dr. Govind N. Kulkarni</h4>
                    <p>Principal</p>
                    <p>Pimpri Chinchwad College of Engineering</p>
                </div>
                
                <div class="contributor-card">
                    <i class="fas fa-user-graduate"></i>
                    <h4>Dr. HOD Name</h4>
                    <p>Head of Department</p>
                    <p>Applied Sciences & Humanities</p>
                </div>
                
                <div class="contributor-card">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <h4>Prof. Mathematics Faculty</h4>
                    <p>Subject Expert</p>
                    <p>Engineering Mathematics</p>
                </div>
                
                <div class="contributor-card">
                    <i class="fas fa-laptop-code"></i>
                    <h4>Development Team</h4>
                    <p>Virtual Lab Development</p>
                    <p>Content & Technical Support</p>
                </div>
            </div>
        </div>
    `;
}

function getFeedbackContent() {
    return `
        <div class="feedback-section">
            <div class="feedback-header">
                <i class="fas fa-star"></i>
                <h3>We Value Your Feedback!</h3>
            </div>
            <div class="feedback-content">
                <p>Help us improve our virtual lab experience. Your suggestions and feedback are important to us.</p>
                <p>Please share your thoughts about the simulation, content quality, and user experience.</p>
                <button class="feedback-button" onclick="showFeedbackModal()">
                    <i class="fas fa-comment-alt"></i> Share Feedback
                </button>
            </div>
        </div>
    `;
}

// ============================================
// Navigation and Page Loading
// ============================================
function loadPage(pageName) {
    const dynamicContent = document.getElementById('dynamicContent');
    const currentPageTitle = document.getElementById('currentPageTitle');
    
    if (!dynamicContent) {
        console.error('dynamicContent element not found!');
        return;
    }
    
    // Map page names to content functions
    const contentMap = {
        'aim': getAimContent,
        'theory': getTheoryContent,
        'pretest': getPretestContent,
        'simulation': getSimulationContent,
        'posttest': getPosttestContent,
        'references': getReferencesContent,
        'contributors': getContributorsContent,
        'feedback': getFeedbackContent
    };
    
    if (contentMap[pageName]) {
        dynamicContent.innerHTML = contentMap[pageName]();
        if (currentPageTitle) {
            currentPageTitle.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        }
        
        // Update active state in sidebar
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === pageName) {
                item.classList.add('active');
            }
        });
        
        // Initialize page-specific features
        if (pageName === 'pretest') {
            initializePretest();
        } else if (pageName === 'posttest') {
            initializePosttest();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ============================================
// Quiz Functions
// ============================================
function initializePretest() {
    setTimeout(() => {
        const form = document.getElementById('pretestForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const answers = { q1: 'a', q2: 'b', q3: 'a' };
                const score = calculateScore(this, answers, 3);
                displayResult('pretestResult', score, 3);
            });
        }
    }, 100);
}

function initializePosttest() {
    setTimeout(() => {
        const form = document.getElementById('posttestForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const answers = { pq1: 'b', pq2: 'b', pq3: 'b' };
                const score = calculateScore(this, answers, 3);
                displayResult('posttestResult', score, 3);
            });
        }
    }, 100);
}

function calculateScore(form, answers, total) {
    let score = 0;
    for (let question in answers) {
        const selected = form.querySelector(`input[name="${question}"]:checked`);
        if (selected && selected.value === answers[question]) {
            score++;
        }
    }
    return score;
}

function displayResult(elementId, score, total) {
    const resultDiv = document.getElementById(elementId);
    if (resultDiv) {
        const percentage = (score / total) * 100;
        const color = percentage >= 70 ? '#4CAF50' : '#f44336';
        const message = percentage >= 70 
            ? 'Excellent! You have a good understanding of Fourier Series.' 
            : 'Keep learning! Review the theory section for better understanding.';
        
        resultDiv.innerHTML = `
            <div class="results-box">
                <h4>Your Score: ${score}/${total} (${percentage}%)</h4>
                <p style="color: ${color}; font-weight: bold; text-align: center;">${message}</p>
            </div>
        `;
    }
}

// ============================================
// Fourier Series Simulation
// ============================================
function calculateFourierCoefficients() {
    const Linput = document.getElementById('inputL')?.value?.trim();
    const lowerInput = document.getElementById('inputLowerLimit')?.value?.trim();
    const upperInput = document.getElementById('inputUpperLimit')?.value?.trim();
    const funcStr = document.getElementById('inputFunction')?.value?.trim();
    const harmonics = parseInt(document.getElementById('inputHarmonics')?.value);
    
    if (!Linput || !lowerInput || !upperInput || !funcStr || isNaN(harmonics)) {
        alert('Please fill all fields with valid values.');
        return;
    }
    
    const L = evaluateExpression(Linput);
    const lowerLimit = evaluateExpression(lowerInput);
    const upperLimit = evaluateExpression(upperInput);
    
    if (isNaN(L) || isNaN(lowerLimit) || isNaN(upperLimit)) {
        alert('Invalid numerical values. Please check your inputs.');
        return;
    }
    
    if (harmonics < 1 || harmonics > 20) {
        alert('Number of harmonics should be between 1 and 20.');
        return;
    }
    
    try {
        const testFn = new Function('x', `return ${funcStr};`);
        testFn(0);
    } catch (e) {
        alert('Invalid function expression. Use JavaScript syntax (e.g., Math.sin(x), x*x, Math.pow(x,2))');
        return;
    }
    
    const steps = 2000;
    const results = computeFourierWithSteps(funcStr, L, lowerLimit, upperLimit, harmonics, steps);
    
    displayFourierResults(results, L);
    displayStepByStep(results, L, funcStr, lowerLimit, upperLimit, harmonics, steps);
    displayFinalEquation(results, L, funcStr);
}

function evaluateExpression(expr) {
    expr = expr.replace(/π|pi/gi, 'Math.PI');
    try {
        return Function(`'use strict'; return (${expr})`)();
    } catch (e) {
        return NaN;
    }
}

function computeFourierWithSteps(funcStr, L, lowerLimit, upperLimit, harmonics, steps) {
    const dx = (upperLimit - lowerLimit) / steps;
    const fn = new Function('x', `return ${funcStr};`);
    
    let A0 = 0;
    for (let i = 0; i < steps; i++) {
        const x = lowerLimit + i * dx;
        A0 += fn(x) * dx;
    }
    A0 = A0 / L;
    
    const coefficients = [];
    for (let n = 1; n <= harmonics; n++) {
        let An = 0;
        let Bn = 0;
        
        for (let i = 0; i < steps; i++) {
            const x = lowerLimit + i * dx;
            An += fn(x) * Math.cos(n * Math.PI * x / L) * dx;
            Bn += fn(x) * Math.sin(n * Math.PI * x / L) * dx;
        }
        
        An = An / L;
        Bn = Bn / L;
        
        coefficients.push({ n, An, Bn });
    }
    
    return { A0, coefficients };
}

function displayFourierResults(results, L) {
    const resultsDiv = document.getElementById('fourierResults');
    if (!resultsDiv) return;
    
    let html = `
        <div class="results-box" style="margin-top: 25px;">
            <h4><i class="fas fa-table"></i> Fourier Coefficients Table</h4>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                        <tr style="background: #A0522D; color: white;">
                            <th style="padding: 10px; border: 1px solid #8B7355;">Harmonic (n)</th>
                            <th style="padding: 10px; border: 1px solid #8B7355;">Aₙ (Cosine Coefficient)</th>
                            <th style="padding: 10px; border: 1px solid #8B7355;">Bₙ (Sine Coefficient)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background: #FAEBD7;">
                            <td style="padding: 10px; border: 1px solid #D2B48C; text-align: center; font-weight: bold;">0</td>
                            <td style="padding: 10px; border: 1px solid #D2B48C; text-align: center;">A₀ = ${results.A0.toFixed(6)}</td>
                            <td style="padding: 10px; border: 1px solid #D2B48C; text-align: center;">-</td>
                        </tr>
    `;
    
    results.coefficients.forEach(coef => {
        html += `
                        <tr>
                            <td style="padding: 10px; border: 1px solid #D2B48C; text-align: center; font-weight: bold;">${coef.n}</td>
                            <td style="padding: 10px; border: 1px solid #D2B48C; text-align: center;">${coef.An.toFixed(6)}</td>
                            <td style="padding: 10px; border: 1px solid #D2B48C; text-align: center;">${coef.Bn.toFixed(6)}</td>
                        </tr>
        `;
    });
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
}

function displayStepByStep(results, L, funcStr, lowerLimit, upperLimit, harmonics, steps) {
    const stepsDiv = document.getElementById('fourierSteps');
    if (!stepsDiv) return;
    
    const dx = (upperLimit - lowerLimit) / steps;
    
    let html = `
        <div class="results-box" style="margin-top: 25px;">
            <h4><i class="fas fa-list-ol"></i> Step-by-Step Solution</h4>
            
            <div class="theory-block" style="margin-top: 15px;">
                <h5 style="color: #A0522D;">Given Data:</h5>
                <p>• Function: <strong>f(x) = ${funcStr}</strong></p>
                <p>• Half-Period: <strong>L = ${L}</strong></p>
                <p>• Interval: [<strong>${lowerLimit}</strong>, <strong>${upperLimit}</strong>]</p>
                <p>• Number of Harmonics: <strong>${harmonics}</strong></p>
            </div>
            
            <div class="theory-block">
                <h5 style="color: #A0522D;">Step 1: Calculate A₀ (Average Value)</h5>
                <div class="formula-box">
                    A₀ = (1/L) ∫ f(x) dx
                </div>
                <p><strong>Result:</strong> A₀ = <span style="color: #A0522D; font-size: 18px;">${results.A0.toFixed(6)}</span></p>
            </div>
    `;
    
    results.coefficients.forEach((coef, index) => {
        html += `
            <div class="theory-block">
                <h5 style="color: #A0522D;">Step ${index + 2}: Calculate A${coef.n} and B${coef.n} for n = ${coef.n}</h5>
                <p><strong>A<sub>${coef.n}</sub></strong> = <span style="color: #A0522D;">${coef.An.toFixed(6)}</span></p>
                <p><strong>B<sub>${coef.n}</sub></strong> = <span style="color: #A0522D;">${coef.Bn.toFixed(6)}</span></p>
            </div>
        `;
    });
    
    html += `</div>`;
    stepsDiv.innerHTML = html;
}

function displayFinalEquation(results, L, funcStr) {
    const equationDiv = document.getElementById('fourierEquation');
    if (!equationDiv) return;
    
    let seriesTerms = [];
    
    if (Math.abs(results.A0) > 0.0001) {
        seriesTerms.push(`${(results.A0/2).toFixed(4)}`);
    }
    
    results.coefficients.forEach(coef => {
        if (Math.abs(coef.An) > 0.0001) {
            const sign = coef.An >= 0 ? '+' : '-';
            seriesTerms.push(`${sign} ${Math.abs(coef.An).toFixed(4)} cos(${coef.n}πx/${L})`);
        }
        if (Math.abs(coef.Bn) > 0.0001) {
            const sign = coef.Bn >= 0 ? '+' : '-';
            seriesTerms.push(`${sign} ${Math.abs(coef.Bn).toFixed(4)} sin(${coef.n}πx/${L})`);
        }
    });
    
    let equationStr = seriesTerms.join(' ');
    equationStr = equationStr.replace(/^\+ /, '');
    
    let html = `
        <div class="results-box" style="margin-top: 25px; background: linear-gradient(135deg, #FFF8DC, #FAEBD7); border: 3px solid #A0522D;">
            <h4 style="text-align: center; color: #5C4033; font-size: 22px;">
                <i class="fas fa-equals"></i> Complete Fourier Series Expansion
            </h4>
            
            <div style="text-align: center; padding: 25px; background: white; border-radius: 8px; margin: 20px 0;">
                <div class="formula-box" style="font-size: 16px; line-height: 2;">
                    <strong>f(x) = ${equationStr || '0'}</strong>
                </div>
            </div>
        </div>
    `;
    
    equationDiv.innerHTML = html;
}

// ============================================
// Feedback Modal
// ============================================
function showFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}
