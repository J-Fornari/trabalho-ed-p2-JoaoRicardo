/**
 * Simulador Visual Interativo — BFS vs. DFS
 * FATEC Ribeirão Preto — Estrutura de Dados
 */

class GraphSimulator {
  constructor() {
    this.canvas = document.getElementById('graphCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.nodes = {};
    this.edges = [];
    this.startNode = 'A';
    this.targetNode = 'H';
    
    this.algorithm = 'BFS';
    this.steps = [];
    this.currentStepIdx = 0;
    this.timer = null;
    this.speed = 600;

    this.initDOM();
    this.loadScenarioWorst(); // Cenário padrão comparativo
  }

  initDOM() {
    document.getElementById('algorithmSelect').addEventListener('change', (e) => {
      this.algorithm = e.target.value;
      this.resetSimulation();
    });

    document.getElementById('btnScenarioMedium').addEventListener('click', () => this.loadScenarioMedium());
    document.getElementById('btnScenarioWorst').addEventListener('click', () => this.loadScenarioWorst());
    document.getElementById('btnScenarioDisconnected').addEventListener('click', () => this.loadScenarioDisconnected());

    document.getElementById('btnStep').addEventListener('click', () => this.stepForward());
    document.getElementById('btnPlay').addEventListener('click', () => this.play());
    document.getElementById('btnPause').addEventListener('click', () => this.pause());
    document.getElementById('btnReset').addEventListener('click', () => this.resetSimulation());

    document.getElementById('speedRange').addEventListener('input', (e) => {
      this.speed = 1700 - parseInt(e.target.value);
      if (this.timer) {
        this.pause();
        this.play();
      }
    });
  }

  // --- CENÁRIOS PRÉ-CONFIGURADOS ---
  loadScenarioWorst() {
    // Pior Caso Comparativo: Atalho (A->C->H) vs Ramo Longo Profundo
    this.nodes = {
      'A': { x: 100, y: 210, state: 'unvisited' },
      'C': { x: 250, y: 90,  state: 'unvisited' },
      'H': { x: 600, y: 210, state: 'unvisited' },
      'B': { x: 180, y: 320, state: 'unvisited' },
      'D': { x: 270, y: 320, state: 'unvisited' },
      'E': { x: 360, y: 320, state: 'unvisited' },
      'F': { x: 450, y: 320, state: 'unvisited' },
      'G': { x: 530, y: 320, state: 'unvisited' }
    };
    this.edges = [
      ['A', 'C'], ['C', 'H'],
      ['A', 'B'], ['B', 'D'], ['D', 'E'], ['E', 'F'], ['F', 'G'], ['G', 'H']
    ];
    this.startNode = 'A';
    this.targetNode = 'H';
    this.resetSimulation();
  }

  loadScenarioMedium() {
    this.nodes = {
      'A': { x: 100, y: 210, state: 'unvisited' },
      'B': { x: 250, y: 110, state: 'unvisited' },
      'C': { x: 250, y: 310, state: 'unvisited' },
      'D': { x: 450, y: 110, state: 'unvisited' },
      'E': { x: 450, y: 310, state: 'unvisited' },
      'H': { x: 600, y: 210, state: 'unvisited' }
    };
    this.edges = [
      ['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'H'], ['E', 'H'], ['B', 'C']
    ];
    this.startNode = 'A';
    this.targetNode = 'H';
    this.resetSimulation();
  }

  loadScenarioDisconnected() {
    this.nodes = {
      'A': { x: 120, y: 150, state: 'unvisited' },
      'B': { x: 280, y: 150, state: 'unvisited' },
      'C': { x: 200, y: 300, state: 'unvisited' },
      'Z': { x: 550, y: 210, state: 'unvisited' }
    };
    this.edges = [['A', 'B'], ['B', 'C'], ['A', 'C']];
    this.startNode = 'A';
    this.targetNode = 'Z';
    this.resetSimulation();
  }

  // --- CONSTRUÇÃO DOS PASSOS DO ALGORITMO ---
  generateSteps() {
    this.steps = [];
    let ops = 0;
    const visited = new Set();
    const parent = {};
    const struct = [this.startNode]; // Fila (BFS) ou Pilha (DFS)
    
    this.steps.push({
      currentNode: null,
      structState: [...struct],
      visitedState: new Set(visited),
      log: `Inicializando ${this.algorithm}. Nó de origem '${this.startNode}' inserido.`,
      ops: ++ops,
      path: []
    });

    while (struct.length > 0) {
      const curr = (this.algorithm === 'BFS') ? struct.shift() : struct.pop();
      ops++;

      if (!visited.has(curr)) {
        visited.add(curr);
        
        this.steps.push({
          currentNode: curr,
          structState: [...struct],
          visitedState: new Set(visited),
          log: `Removido '${curr}' da ${this.algorithm === 'BFS' ? 'Fila (FIFO)' : 'Pilha (LIFO)'}. Marcado como atual/visitado.`,
          ops: ops,
          path: []
        });

        if (curr === this.targetNode) {
          // Reconstrução do caminho
          const finalPath = [];
          let temp = this.targetNode;
          while (temp) {
            finalPath.unshift(temp);
            temp = parent[temp];
          }
          this.steps.push({
            currentNode: curr,
            structState: [...struct],
            visitedState: new Set(visited),
            log: `🎯 DESTINO '${this.targetNode}' ENCONTRADO! Caminho: ${finalPath.join(' → ')}`,
            ops: ops,
            path: finalPath
          });
          return;
        }

        // Vizinhos
        const neighbors = this.getNeighbors(curr);
        for (let n of neighbors) {
          ops++;
          if (!visited.has(n)) {
            if (!parent[n]) parent[n] = curr;
            struct.push(n);
            ops++;
          }
        }

        this.steps.push({
          currentNode: curr,
          structState: [...struct],
          visitedState: new Set(visited),
          log: `Adicionados vizinhos não visitados de '${curr}' na estrutura.`,
          ops: ops,
          path: []
        });
      }
    }

    this.steps.push({
      currentNode: null,
      structState: [],
      visitedState: new Set(visited),
      log: `⚠️ Destino '${this.targetNode}' inalcançável. Estrutura vazia.`,
      ops: ops,
      path: []
    });
  }

  getNeighbors(node) {
    const res = [];
    for (let [u, v] of this.edges) {
      if (u === node) res.push(v);
      else if (v === node) res.push(u);
    }
    return res;
  }

  // --- EXECUÇÃO E CONTROLE ---
  resetSimulation() {
    this.pause();
    this.currentStepIdx = 0;
    this.generateSteps();
    this.renderStep(0);
  }

  stepForward() {
    if (this.currentStepIdx < this.steps.length - 1) {
      this.currentStepIdx++;
      this.renderStep(this.currentStepIdx);
    } else {
      this.pause();
    }
  }

  play() {
    document.getElementById('btnPlay').disabled = true;
    document.getElementById('btnStep').disabled = true;
    document.getElementById('btnPause').disabled = false;

    this.timer = setInterval(() => {
      if (this.currentStepIdx < this.steps.length - 1) {
        this.stepForward();
      } else {
        this.pause();
      }
    }, this.speed);
  }

  pause() {
    clearInterval(this.timer);
    this.timer = null;
    document.getElementById('btnPlay').disabled = false;
    document.getElementById('btnStep').disabled = false;
    document.getElementById('btnPause').disabled = true;
  }

  // --- RENDERIZAÇÃO VISUAL ---
  renderStep(idx) {
    const step = this.steps[idx];

    // Atualiza Painel de Métricas
    document.getElementById('metricStep').innerText = `${idx} / ${this.steps.length - 1}`;
    document.getElementById('metricOps').innerText = step.ops;
    document.getElementById('metricVisited').innerText = step.visitedState.size;
    document.getElementById('metricStructureSize').innerText = step.structState.length;

    // Atualiza Estrutura (FIFO/LIFO Visualizer)
    const titleElem = document.getElementById('structTitle');
    titleElem.innerText = (this.algorithm === 'BFS') ? '📥 Estado da Fila (FIFO — BFS)' : '📚 Estado da Pilha (LIFO — DFS)';
    
    const structContainer = document.getElementById('structureContainer');
    structContainer.innerHTML = '';
    if (step.structState.length === 0) {
      structContainer.innerHTML = '<span class="placeholder-text">Estrutura Vazia</span>';
    } else {
      step.structState.forEach(item => {
        const div = document.createElement('div');
        div.className = 'struct-item';
        div.innerText = item;
        structContainer.appendChild(div);
      });
    }

    // Atualiza Log
    const logContent = document.getElementById('logContent');
    const p = document.createElement('p');
    p.className = `log-entry ${step.path.length > 0 ? 'log-found' : 'log-step'}`;
    p.innerText = `[Passo ${idx}] ${step.log}`;
    logContent.appendChild(p);
    logContent.scrollTop = logContent.scrollHeight;

    // Desenha o Grafo no Canvas
    this.drawGraph(step);
  }

  drawGraph(step) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Arestas
    this.edges.forEach(([u, v]) => {
      const n1 = this.nodes[u];
      const n2 = this.nodes[v];

      let isPath = false;
      if (step.path.length > 0) {
        for (let i = 0; i < step.path.length - 1; i++) {
          if ((step.path[i] === u && step.path[i+1] === v) || (step.path[i] === v && step.path[i+1] === u)) {
            isPath = true;
            break;
          }
        }
      }

      this.ctx.beginPath();
      this.ctx.moveTo(n1.x, n1.y);
      this.ctx.lineTo(n2.x, n2.y);
      this.ctx.lineWidth = isPath ? 5 : 2;
      this.ctx.strokeStyle = isPath ? '#10b981' : '#334155';
      this.ctx.stroke();
    });

    // 2. Nós
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      let color = '#64748b'; // Não visitado

      if (step.path.includes(key)) {
        color = '#10b981'; // Caminho Final
      } else if (key === step.currentNode) {
        color = '#ec4899'; // Nó Atual
      } else if (step.structState.includes(key)) {
        color = '#f59e0b'; // Na Fila/Pilha
      } else if (step.visitedState.has(key)) {
        color = '#3b82f6'; // Visitado
      }

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 22, 0, 2 * Math.PI);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.stroke();

      // Texto do Nó
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 14px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(key, node.x, node.y);
    });
  }
}

window.onload = () => new GraphSimulator();