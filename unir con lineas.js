const pp = document.getElementById('app');
pp.innerHTML = `
<style>
    :root {
        --primary-color: #2196F3;
        --success-color: #4CAF50;
        --error-color: #f44336;
        --neutral-color: #607D8B;
        --bg-color: #f5f5f5;
        --card-bg: #ffffff;
        --text-color: #333333;
    }

    .concept-game * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .concept-game {
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        min-height: 100vh;
        background-color: var(--bg-color);
        display: flex;
        flex-direction: column;
        color: var(--text-color);
    }

    .concept-game header {
        background-color: var(--primary-color);
        color: white;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .concept-game .game-container {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        background-color: var(--card-bg);
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .concept-game .game-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .concept-game .stats {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 2rem;
        font-size: 1.1rem;
    }

    .concept-game .stat-item {
        background-color: var(--neutral-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
    }

    .concept-game .columns-container {
        display: flex;
        justify-content: space-between;
        gap: 4rem;
        margin: 2rem 0;
    }

    .concept-game .column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .concept-game .concept {
        padding: 1rem 1.5rem;
        background-color: var(--primary-color);
        color: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        user-select: none;
        position: relative;
        overflow: hidden;
    }

    .concept-game .concept:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .concept-game .concept.connected {
        background-color: var(--success-color);
    }

    .concept-game .concept.error {
        animation: concept-shake 0.5s ease-in-out;
        background-color: var(--error-color);
    }

    .concept-game .concept.selected {
        outline: 3px solid var(--primary-color);
        outline-offset: 2px;
    }

    .concept-game .controls {
        text-align: center;
        margin-top: 2rem;
    }

    .concept-game button {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        background-color: var(--primary-color);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .concept-game button:hover {
        background-color: #1976D2;
        transform: translateY(-2px);
    }

    .concept-game .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .concept-game .modal-content {
        background-color: white;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        max-width: 500px;
    }

    @keyframes concept-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }

    @media (max-width: 768px) {
        .concept-game .columns-container {
            flex-direction: column;
            gap: 2rem;
        }

        .concept-game .game-container {
            margin: 1rem;
            padding: 1rem;
        }

        .concept-game .stats {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .concept-game .stat-item {
            width: 100%;
            text-align: center;
        }
    }
</style>

<div class="concept-game">
    <header>
        <h1>Conexión de Conceptos de Programación</h1>
    </header>

    <div class="game-container">
        <div class="game-header">
            <h2>Conecta los conceptos relacionados</h2>
            <p>Une cada tecnología con su función principal</p>
        </div>

        <div class="stats">
            <div class="stat-item">
                Aciertos: <span id="score">0</span>
            </div>
            <div class="stat-item">
                Intentos: <span id="attempts">0</span>
            </div>
            <div class="stat-item">
                Tiempo: <span id="timer">00:00</span>
            </div>
        </div>

        <div class="columns-container">
            <div class="column left" id="leftColumn">
                <div class="concept" data-pair="structure">HTML</div>
                <div class="concept" data-pair="style">CSS</div>
                <div class="concept" data-pair="functionality">JavaScript</div>
                <div class="concept" data-pair="server">PHP</div>
                <div class="concept" data-pair="database">SQL</div>
            </div>

            <div class="column right" id="rightColumn">
                <div class="concept" data-pair="structure">Estructura</div>
                <div class="concept" data-pair="style">Estilo</div>
                <div class="concept" data-pair="functionality">Funcionalidad</div>
                <div class="concept" data-pair="server">Servidor</div>
                <div class="concept" data-pair="database">Base de datos</div>
            </div>
        </div>

        <div class="controls">
            <button id="resetBtn">Reiniciar Juego</button>
        </div>
    </div>

    <div class="modal" id="completionModal">
        <div class="modal-content">
            <h2>¡Felicitaciones!</h2>
            <p>Has completado el ejercicio correctamente.</p>
            <p>Tiempo total: <span id="finalTime">00:00</span></p>
            <p>Intentos realizados: <span id="finalAttempts">0</span></p>
            <button onclick="resetGame()">Jugar de nuevo</button>
        </div>
    </div>
</div>
`;

// Cargar la librería Leader Line
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js';
script.onload = () => {
    // Una vez cargada la librería, inicializamos el juego
    class ConceptGame {
        constructor() {
            this.selectedElement = null;
            this.lines = [];
            this.connections = new Set();
            this.score = 0;
            this.attempts = 0;
            this.startTime = new Date();
            this.timerInterval = null;
            this.maxPairs = 5;

            this.initializeGame();
        }

        // ... [Todo el código de la clase ConceptGame igual que antes] ...
        
        initializeGame() {
            this.shuffleConcepts();
            this.updateStats();
            this.startTimer();
            this.addEventListeners();
        }

        shuffleConcepts() {
            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            const leftColumn = document.getElementById('leftColumn');
            const rightColumn = document.getElementById('rightColumn');
            
            const leftConcepts = Array.from(leftColumn.children);
            const rightConcepts = Array.from(rightColumn.children);
            
            shuffleArray(leftConcepts);
            shuffleArray(rightConcepts);
            
            leftConcepts.forEach(concept => leftColumn.appendChild(concept));
            rightConcepts.forEach(concept => rightColumn.appendChild(concept));
        }

        addEventListeners() {
            const concepts = document.querySelectorAll('.concept');
            concepts.forEach(concept => {
                concept.addEventListener('click', (e) => this.handleConceptClick(e));
            });

            document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        }

        handleConceptClick(event) {
            const clickedElement = event.target;
            
            if (clickedElement.classList.contains('connected')) {
                return;
            }

            if (!this.selectedElement) {
                this.selectElement(clickedElement);
            } else if (this.selectedElement === clickedElement) {
                this.deselectElement();
            } else {
                this.attemptConnection(clickedElement);
            }
        }

        selectElement(element) {
            this.selectedElement = element;
            element.classList.add('selected');
        }

        deselectElement() {
            if (this.selectedElement) {
                this.selectedElement.classList.remove('selected');
                this.selectedElement = null;
            }
        }

        attemptConnection(secondElement) {
            this.attempts++;
            
            if (this.isValidConnection(this.selectedElement, secondElement)) {
                this.createSuccessfulConnection(this.selectedElement, secondElement);
                this.checkGameCompletion();
            } else {
                this.handleFailedConnection(this.selectedElement, secondElement);
            }

            this.updateStats();
            this.deselectElement();
        }

        isValidConnection(elem1, elem2) {
            return elem1.dataset.pair === elem2.dataset.pair && 
                   !this.connections.has(elem1.dataset.pair);
        }

        createSuccessfulConnection(elem1, elem2) {
            const line = new LeaderLine(
                elem1,
                elem2,
                {
                    color: getComputedStyle(document.documentElement)
                        .getPropertyValue('--success-color').trim(),
                    size: 3,
                    path: 'straight',
                    startSocketGravity: 50,
                    endSocketGravity: 50
                }
            );

            this.lines.push(line);
            this.connections.add(elem1.dataset.pair);
            elem1.classList.add('connected');
            elem2.classList.add('connected');
            this.score++;
        }

        handleFailedConnection(elem1, elem2) {
            [elem1, elem2].forEach(elem => {
                elem.classList.add('error');
                setTimeout(() => elem.classList.remove('error'), 500);
            });
        }

        checkGameCompletion() {
            if (this.score === this.maxPairs) {
                this.handleGameCompletion();
            }
        }

        handleGameCompletion() {
            clearInterval(this.timerInterval);
            const modal = document.getElementById('completionModal');
            document.getElementById('finalTime').textContent = document.getElementById('timer').textContent;
            document.getElementById('finalAttempts').textContent = this.attempts;
            modal.style.display = 'flex';
        }

        updateStats() {
            document.getElementById('score').textContent = this.score;
            document.getElementById('attempts').textContent = this.attempts;
        }

        startTimer() {
            this.timerInterval = setInterval(() => {
                const now = new Date();
                const diff = now - this.startTime;
                const minutes = Math.floor(diff / 60000);
                const seconds = Math.floor((diff % 60000) / 1000);
                document.getElementById('timer').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }

        resetGame() {
            this.lines.forEach(line => line.remove());
            this.lines = [];
            this.connections.clear();
            this.score = 0;
            this.attempts = 0;
            this.startTime = new Date();
            
            document.querySelectorAll('.concept').forEach(concept => {
                concept.classList.remove('connected', 'selected', 'error');
            });
            
            this.shuffleConcepts();
            
            clearInterval(this.timerInterval);
            this.startTimer();
            
            this.updateStats();
            
            document.getElementById('completionModal').style.display = 'none';
        }
    }

    window.game = new ConceptGame();
    window.resetGame = function() {
        window.game.resetGame();
    };
};

document.head.appendChild(script);