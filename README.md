# 🚀 Trabalho P2 — Estrutura de Dados: Grafos e Travessias (BFS vs. DFS)

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Semestre:** 2026.2  

---

## 👤 Identificação do Aluno

* **Nome Completo:** João Ricardo Assis Fornari
* **RA:** 2840482521038
* **Tema Escolhido:** **Tema D (Tema 4) — Grafos: Travessias (Busca em Largura - BFS vs. Busca em Profundidade - DFS)**

---

## 📚 Fundamentação Teórica e Conceitual

As travessias em grafos são procedimentos fundamentais da Ciência da Computação para visitar ou buscar vértices e arestas em uma estrutura de dados de rede.

### 1. Busca em Largura (BFS — Breadth-First Search)
A **BFS** explora o grafo em níveis ou camadas concêntricas a partir do vértice de origem. 
* **Estrutura de Dados Subjacente:** **Fila (FIFO - First In, First Out)**.
* **Comportamento:** Processa primeiramente todos os vizinhos diretos (distância de 1 aresta), depois os vizinhos de 2º grau (distância de 2 arestas), e assim por diante.
* **Garantia de Menor Caminho:** Em grafos não ponderados (onde todas as arestas possuem peso igual a 1), a BFS **garante** a descoberta do menor caminho entre a origem e o destino em número de arestas, pois expande todos os caminhos em ordem crescente de distância.

### 2. Busca em Profundidade (DFS — Depth-First Search)
A **DFS** explora o grafo aprofundando-se o máximo possível ao longo de cada ramo antes de realizar o *backtracking* (retrocesso).
* **Estrutura de Dados Subjacente:** **Pilha (LIFO - Last In, First Out)** ou Pilha de Chamadas Recursivas.
* **Comportamento:** Segue um caminho até atingir um nó sem vizinhos não visitados ou o destino, voltando depois para explorar opções pendentes na pilha.
* **Ausência de Garantia de Menor Caminho:** A DFS pode encontrar caminhos válidos até o destino, mas **não garante** o menor caminho em grafos não ponderados, pois pode seguir uma rota longa em profundidade antes de avaliar atalhos diretos.

---

## 📊 Análise de Complexidade Assintótica (Big-O)

Considerando um grafo $G = (V, E)$, onde $V$ representa o número total de vértices e $E$ representa o número total de arestas:

| Algoritmo | Complexidade de Tempo (Melhor) | Complexidade de Tempo (Médio) | Complexidade de Tempo (Pior) | Espaço Auxiliar | Justificativa Teórica |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **BFS** | $O(1)$ | $O(V + E)$ | $O(V + E)$ | $O(V)$ | **Tempo:** No pior caso (grafo conexo), visita cada vértice $V$ uma vez e analisa cada aresta $E$. <br>**Espaço:** A fila e a estrutura de visitados armazenam até $O(V)$ vértices. |
| **DFS** | $O(1)$ | $O(V + E)$ | $O(V + E)$ | $O(V)$ | **Tempo:** Visita cada vértice $V$ e percorre cada aresta $E$. <br>**Espaço:** A pilha de execução/auxiliar armazena o caminho mais profundo de vértices, limite de $O(V)$ nós. |

### Por que o Pior Caso Ocorre?
* **BFS / DFS ($O(V+E)$):** Ocorre em grafos conexos ou densos, nos quais o algoritmo precisa percorrer todas as componentes e arestas da lista de adjacência até encontrar o destino (ou determinar que ele é inalcançável).
* **Memória no Pior Caso ($O(V)$):** Ocorre quando todos os vértices precisam ser armazenados no conjunto de visitados e na estrutura linear (Fila ou Pilha).

---

## 🤖 Diário de Engenharia com Inteligência Artificial

* **Modelo/Ferramenta Utilizada:** Google Gemini Hydrogen 4
* **Objetivo:** Auxiliar no planejamento modular da classe Grafo em Python, estruturação dos algoritmos BFS/DFS instrumentados e criação da interface interativa em HTML5/Canvas.

### Prompts Utilizados:

1. **Prompt 1 (Estrutura de Dados e Algoritmos em Python):**
   > *"Crie uma classe Grafo em Python baseada em Lista de Adjacência para o Tema 4 da P2 de Estrutura de Dados. Implemente o método `bfs` usando `collections.deque` (Fila FIFO) e o método `dfs` usando Pilha LIFO iterativa. Adicione type hints, docstrings e contadores de operações acumuladas em ambos os métodos."*

2. **Prompt 2 (Simulador Visual Web em Canvas):**
   > *"Crie a interface visual para o trabalho (pasta `src/demo/`) com index.html, styles.css e app.js. A aplicação deve desenhar um grafo em Canvas e mostrar em tempo real a transição dos elementos na Fila (FIFO) durante a BFS e na Pilha (LIFO) durante a DFS com botões de Play, Step e Reset."*

3. **Prompt 3 (Cenário Comparativo de Menor Caminho):**
   > *"Monte a estrutura do Cenário 3 de testes no qual a busca DFS faz um desvio longo por profundidade (ex.: A → B → D → E → F → G → H) e a BFS encontra o atalho direto de menor caminho (ex.: A → C → H), comprovando o comportamento Big-O e a garantia de menor caminho da BFS."*

### Relato de Ajuste Manual (Análise Crítica):
* **Problema Encontrado:** Inicialmente, a IA sugeriu a inclusão das arestas no Cenário 3 inserindo o atalho direto (`A -> C`) antes do ramo profundo (`A -> B`). Por conta do laço de exploração com `reversed()`, a DFS encontrou o atalho antes de explorar o ramo longo.
* **Ajuste Efetuado:** Ajustei manualmente a ordem de inserção das arestas no arquivo `src/algoritmo.py`, garantindo que `("A", "B")` fosse adicionada antes de `("A", "C")`. Isso forçou a DFS a percorrer todo o ramo profundo primeiro, evidenciando de forma clara a diferença de rota em relação à BFS no terminal e no simulador.

---

## 🖥️ Como Executar o Projeto

### 1. Script Python (`src/algoritmo.py`)
Certifique-se de ter o Python 3.8+ instalado e execute no terminal a partir da raiz do projeto:
```bash
python src/algoritmo.py
