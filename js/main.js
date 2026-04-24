// Main JavaScript file for Virtual Lab

// Page content objects
const pageContent = {
    aim: `
        <div class="aim-container">
            <div class="aim-card">
                <i class="fas fa-bullseye"></i>
                <h3>Aim of the Experiment</h3>
                <div class="aim-content">
                    <p>The objective of this virtual lab experiment on Fourier Series is to:</p>
                    <ul>
                        <li>Understand the fundamentals of Fourier Series expansion for periodic functions</li>
                        <li>Learn to calculate Fourier coefficients (a₀, aₙ, bₙ) for various functions</li>
                        <li>Visualize the convergence of Fourier Series approximations using interactive simulations</li>
                        <li>Analyze the Gibbs phenomenon in Fourier Series approximations</li>
                        <li>Apply Fourier Series concepts to solve engineering problems in signal processing, vibrations, and heat transfer</li>
                    </ul>
                </div>
            </div>
            
            <div class="quick-access-grid">
                <div class="section-card" onclick="loadPage('theory')">
                    <i class="fas fa-book"></i>
                    <h3>Theory</h3>
                    <p>Learn the mathematical foundations</p>
                </div>
                <div class="section-card" onclick="loadPage('pretest')">
                    <i class="fas fa-question-circle"></i>
                    <h3>Pretest</h3>
                    <p>Test your prior knowledge</p>
                </div>
                <div class="section-card" onclick="loadPage('simulation')">
                    <i class="fas fa-desktop"></i>
                    <h3>Simulation</h3>
                    <p>Interactive visualization</p>
                </div>
                <div class="section-card" onclick="loadPage('posttest')">
                    <i class="fas fa-clipboard-check"></i>
                    <h3>Posttest</h3>
                    <p>Assess your learning</p>
                </div>
            </div>
            
            <div class="feedback-section">
                <div class="feedback-header">
                    <i class="fas fa-star"></i>
                    <h3>We Value Your Feedback!</h3>
                </div>
                <div class="feedback-content">
                    <p>Help us improve our virtual lab experience. Your suggestions matter!</p>
                    <button class="feedback-button" onclick="openFeedback()">
                        <i class="fas fa-comment-alt"></i> Share Feedback
                    </button>
                </div>
            </div>
        </div>
    `,
    
    theory: `
        <div class="theory-section">
            <div class="theory-block">
                <h3>Introduction to Fourier Series</h3>
                <p>A Fourier series is an expansion of a periodic function f(x) in terms of an infinite sum of sines and cosines. Fourier series make use of the orthogonality relationships of the sine and cosine functions.</p>
                <div class="formula">
                    f(x) = a₀/2 + Σ(aₙcos(nx) + bₙsin(nx))
                </div>
                <p>where n goes from 1 to ∞</p>
            </div>
            
            <div class="theory-block">
                <h3>Fourier Coefficients</h3>
                <p>The Fourier coefficients are calculated using the following formulas:</p>
                <div class="formula">
                    a₀ = (1/π) ∫f(x)dx<br>
                    aₙ = (1/π) ∫f(x)cos(nx)dx<br>
                    bₙ = (1/π) ∫f(x)sin(nx)dx
                </div>
                <p>These integrals are evaluated over one complete period, typically [-π, π] or [0, 2π]</p>
            </div>
            
            <div class="theory-block">
                <h3>Dirichlet Conditions</h3>
                <p>For a Fourier series to converge, the function must satisfy Dirichlet conditions:</p>
                <ul style="list-style-position: inside; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">f(x) must be periodic</li>
                    <li style="margin-bottom: 10px;">f(x) must be single-valued and continuous, except possibly at a finite number of finite discontinuities</li>
                    <li style="margin-bottom: 10px;">f(x) must have a finite number of maxima and minima</li>
                    <li style="margin-bottom: 10px;">The integral of |f(x)| over one period must converge</li>
                </ul>
            </div>
            
            <div class="theory-block">
                <h3>Half-Range Series</h3>
                <p>For functions defined on [0, L], we can create:</p>
                <ul style="list-style-position: inside; padding-left: 20px;">
                    <li style="margin-bottom: 10px;"><strong>Half-range cosine series:</strong> Even extension, only cosine terms</li>
                    <li style="margin-bottom: 10px;"><strong>Half-range sine series:</strong> Odd extension, only sine terms</li>
                </ul>
            </div>
        </div>
    `,
    
    pretest: `
        <div class="quiz-container">
            <h3 style="color: var(--dark-brown); margin-bottom: 25px;">Pretest - Fourier Series</h3>
            <form id="pretestForm">
                <div class="question-block">
                    <h4>1. What is the general form of a Fourier series?</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="q1" value="a"> a₀/2 + Σ(aₙcos(nx) + bₙsin(nx))
                        </label>
                        <label class="option">
                            <input type="radio" name="q1" value="b"> a₀ + Σ(aₙcos(nx))
                        </label>
                        <label class="option">
                            <input type="radio" name="q1" value="c"> Σ(bₙsin(nx))
                        </label>
                        <label class="option">
                            <input type="radio" name="q1" value="d"> a₀/2 + Σ(bₙcos(nx))
                        </label>
                    </div>
                </div>
                
                <div class="question-block">
                    <h4>2. What does a₀ represent in Fourier series?</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="q2" value="a"> The frequency
                        </label>
                        <label class="option">
                            <input type="radio" name="q2" value="b"> The average value of the function
                        </label>
                        <label class="option">
                            <input type="radio" name="q2" value="c"> The amplitude
                        </label>
                        <label class="option">
                            <input type="radio" name="q2" value="d"> The phase angle
                        </label>
                    </div>
                </div>
                
                <div class="question-block">
                    <h4>3. Which condition is NOT required for Fourier series convergence?</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="q3" value="a"> Function must be periodic
                        </label>
                        <label class="option">
                            <input type="radio" name="q3" value="b"> Function must be differentiable everywhere
                        </label>
                        <label class="option">
                            <input type="radio" name="q3" value="c"> Finite number of discontinuities
                        </label>
                        <label class="option">
                            <input type="radio" name="q3" value="d"> Finite number of maxima and minima
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="submit-btn">Submit Pretest</button>
            </form>
            <div id="pretestResult" style="margin-top: 20px; display: none;"></div>
        </div>
    `,
    
    simulation: `
        <div class="simulation-container">
            <h3 style="color: var(--dark-brown); margin-bottom: 25px;">Fourier Series Simulation</h3>
            
            <div class="canvas-container">
                <canvas id="fourierCanvas" width="700" height="400"></canvas>
            </div>
            
            <div class="controls">
                <h4 style="color: var(--dark-brown); margin-bottom: 20px;">Simulation Controls</h4>
                
                <div class="control-group">
                    <label>Select Function:</label>
                    <select id="functionSelect">
                        <option value="square">Square Wave</option>
                        <option value="sawtooth">Sawtooth Wave</option>
                        <option value="triangle">Triangle Wave</option>
                    </select>
                </div>
                
                <div class="control-group">
                    <label>Number of Harmonics: <span id="harmonicValue">5</span></label>
                    <input type="range" id="harmonicSlider" min="1" max="20" value="5">
                </div>
                
                <button class="submit-btn" onclick="updateSimulation()">Update Simulation</button>
            </div>
            
            <div class="theory-block">
                <h4>Current Function Details:</h4>
                <p id="functionDescription">Square wave approximation using 5 harmonics</p>
            </div>
        </div>
    `,
    
    posttest: `
        <div class="quiz-container">
            <h3 style="color: var(--dark-brown); margin-bottom: 25px;">Posttest - Fourier Series</h3>
            <form id="posttestForm">
                <div class="question-block">
                    <h4>1. What is the Fourier series of an odd function?</h4>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="pq1" value="a"> Only cosine terms
                        </label>
                        <label class="option">
                            <input type
