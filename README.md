# 🚀 Trabalho P2 — Estrutura de Dados: Grafos e Travessias (BFS vs. DFS)

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Semestre:** 2026.2  

---

## 👤 Identificação do Aluno

* **Nome Completo:** [João Ricardo Assis Fornari]
* **RA:** [2840482521038]
* **Tema Escolhido:** **Tema D (Tema 4) — Grafos: Travessias (Busca em Largura - BFS vs. Busca em Profundidade - DFS)**

---

## 🎬 Defesa Técnica em Vídeo


> 📌 **Link do Vídeo:** `COLE_SEU_LINK_DO_VIDEO_AQUI`  

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

* **Modelo de IA Utilizado:** Google Gemini 1.5 Pro / Claude 3.5 Sonnet.
* **Objetivo:** Auxiliar no planejamento modular do algoritmo em Python, suporte na estruturação e estilização da interface web do simulador visual.

### Principais Prompts Utilizados:
1. **Prompt 1 (Modelagem de Código):**  
   > *"Crie uma classe `Grafo` em Python baseada em Lista de Adjacência. Implemente os métodos `bfs` (usando `collections.deque`) e `dfs` (usando pilha iterativa), ambos retornando o caminho encontrado, a ordem de visitação e um contador explícito de operações. Adicione type hints e docstrings."*
2. **Prompt 2 (Construção Visual da Fila/Pilha):**  
   > *"Desenvolva uma interface web em HTML/CSS/JS que simule visualmente um grafo em Canvas/DOM e mostre em tempo real a transição dos elementos entrando e saindo da Fila (FIFO) na BFS e da Pilha (LIFO) na DFS a cada passo."*
3. **Prompt 3 (Cenário Comparativo):**  
   > *"Gere um cenário de teste para o simulador onde o DFS faz um desvio longo (6 arestas) e a BFS encontra o atalho direto (2 arestas), evidenciando a diferença de menor caminho."*

### Ajuste Manual Realizado:
* **Problema Encontrado:** Inicialmente, a IA sugeriu um DFS recursivo que acumulava a ordem dos nós visitados sem manter um registro correto do vetor de antecessores para reconstrução limpa do caminho final.
* **Correção Efetuada:** Modifiquei a implementação da DFS para a versão **iterativa com Pilha explícita (`list.pop()`)**, sincronizando o mapeamento do dicionário de `antecessores` e garantindo paridade conceitual direta entre a Fila da BFS e a Pilha da DFS no simulador visual.

---

## 🖥️ Como Executar o Projeto

### 1. Script Python (`src/algoritmo.py`)
Certifique-se de ter o Python 3.8+ instalado e execute no terminal a partir da raiz do projeto:
```bash
python src/algoritmo.py
