### Código Python Completo

"""
===============================================================================
Módulo: algoritmo.py
Descrição: Implementação da estrutura de Grafo com Lista de Adjacência e
            algoritmos de travessia BFS (Busca em Largura) e DFS (Busca em Profundidade),
            instrumentados com contadores de operações.
Disciplina: Estrutura de Dados - FATEC Ribeirão Preto (2026.2)
Tema: Tema 4 (Grafos — Travessias: BFS vs. DFS)
===============================================================================
"""

from collections import deque
from typing import Dict, List, Optional, Set, Tuple


class Grafo:
    """
    Representação de um Grafo não ponderado utilizando Lista de Adjacência.
    Permite grafos direcionados ou não direcionados.
    """

    def __init__(self, direcionado: bool = False) -> None:
        """
        Inicializa um novo grafo.

        :param direcionado: Se True, as arestas têm sentido único (u -> v).
                            Se False, as arestas são bidirecionais (u <-> v).
        """
        self.adj: Dict[str, List[str]] = {}
        self.direcionado: bool = direcionado

    def adicionar_vertice(self, v: str) -> None:
        """
        Adiciona um novo vértice ao grafo caso ele ainda não exista.

        :param v: Identificador do vértice.
        """
        if v not in self.adj:
            self.adj[v] = []

    def adicionar_aresta(self, u: str, v: str) -> None:
        """
        Adiciona uma aresta ligando os vértices u e v.

        :param u: Vértice de origem.
        :param v: Vértice de destino.
        """
        self.adicionar_vertice(u)
        self.adicionar_vertice(v)

        if v not in self.adj[u]:
            self.adj[u].append(v)

        if not self.direcionado:
            if u not in self.adj[v]:
                self.adj[v].append(u)

    def bfs(self, origem: str, destino: str) -> Tuple[Optional[List[str]], int, List[str]]:
        """
        Executa a Busca em Largura (BFS) utilizando uma Fila (FIFO).
        Garante a menor rota em termos de número de arestas em grafos não ponderados.

        :param origem: Vértice de início.
        :param destino: Vértice procurado.
        :return: Tupla com (caminho_reconstruido, total_operacoes, ordem_visita).
        """
        operacoes: int = 0
        if origem not in self.adj or destino not in self.adj:
            return None, operacoes, []

        fila: deque[str] = deque([origem])
        visitados: Set[str] = {origem}
        antecessores: Dict[str, Optional[str]] = {origem: None}
        ordem_visita: List[str] = []

        operacoes += 1  # Inicialização de estruturas

        while fila:
            u = fila.popleft()
            ordem_visita.append(u)
            operacoes += 1  # Processamento e desenfileiramento

            if u == destino:
                break

            for vizinho in self.adj[u]:
                operacoes += 1  # Verificação da aresta
                if vizinho not in visitados:
                    visitados.add(vizinho)
                    antecessores[vizinho] = u
                    fila.append(vizinho)
                    operacoes += 2  # Inserção em visitados e na fila

        if destino not in antecessores:
            return None, operacoes, ordem_visita

        # Reconstrução do caminho ótimo a partir do mapa de antecessores
        caminho: List[str] = []
        atual: Optional[str] = destino
        while atual is not None:
            caminho.append(atual)
            atual = antecessores[atual]
            operacoes += 1
        caminho.reverse()

        return caminho, operacoes, ordem_visita

    def dfs(self, origem: str, destino: str) -> Tuple[Optional[List[str]], int, List[str]]:
        """
        Executa a Busca em Profundidade (DFS) de forma iterativa utilizando uma Pilha (LIFO).
        Explora os ramos até a profundidade máxima antes de fazer o backtracking.

        :param origem: Vértice de início.
        :param destino: Vértice procurado.
        :return: Tupla com (caminho_reconstruido, total_operacoes, ordem_visita).
        """
        operacoes: int = 0
        if origem not in self.adj or destino not in self.adj:
            return None, operacoes, []

        pilha: List[str] = [origem]
        visitados: Set[str] = set()
        antecessores: Dict[str, Optional[str]] = {origem: None}
        ordem_visita: List[str] = []

        operacoes += 1  # Inicialização de estruturas

        while pilha:
            u = pilha.pop()
            operacoes += 1  # Desempilhamento

            if u not in visitados:
                visitados.add(u)
                ordem_visita.append(u)
                operacoes += 1

                if u == destino:
                    break

                # Adiciona vizinhos à pilha (em ordem invertida para exploração natural)
                for vizinho in reversed(self.adj[u]):
                    operacoes += 1
                    if vizinho not in visitados:
                        if vizinho not in antecessores:
                            antecessores[vizinho] = u
                        pilha.append(vizinho)
                        operacoes += 2

        if destino not in visitados:
            return None, operacoes, ordem_visita

        # Reconstrução do caminho percorrido pela DFS
        caminho: List[str] = []
        atual: Optional[str] = destino
        while atual is not None:
            caminho.append(atual)
            atual = antecessores.get(atual)
            operacoes += 1
        caminho.reverse()

        return caminho, operacoes, ordem_visita


# ===============================================================================
# BLOCO DE EXECUÇÃO E TESTES OBRIGATÓRIOS
# ===============================================================================
if __name__ == "__main__":
    print("=" * 70)
    print(" 🚀 TRABALHO P2 - GRAFOS: BUSCA EM LARGURA (BFS) VS. PROFUNDIDADE (DFS)")
    print("=" * 70)

    # ---------------------------------------------------------------------------
    # CENÁRIO 1: Caso Comum (Grafo Conexo Equilibrado)
    # ---------------------------------------------------------------------------
    print("\n--------------------------------------------------------------------")
    print("📌 CENÁRIO 1: Grafo Conexo Típico (Origem: A, Destino: E)")
    print("--------------------------------------------------------------------")
    g1 = Grafo(direcionado=False)
    arestas_g1 = [("A", "B"), ("A", "C"), ("B", "D"), ("C", "E"), ("D", "E")]
    for u, v in arestas_g1:
        g1.adicionar_aresta(u, v)

    caminho_bfs, ops_bfs, visita_bfs = g1.bfs("A", "E")
    caminho_dfs, ops_dfs, visita_dfs = g1.dfs("A", "E")

    print(f"[BFS - Fila (FIFO)] Visita: {visita_bfs}")
    print(f" -> Caminho Encontrado: {caminho_bfs} | Operações: {ops_bfs}")
    print(f"[DFS - Pilha (LIFO)] Visita: {visita_dfs}")
    print(f" -> Caminho Encontrado: {caminho_dfs} | Operações: {ops_dfs}")

    # ---------------------------------------------------------------------------
    # CENÁRIO 2: Caso de Borda (Grafo Desconexo / Destino Inalcançável)
    # ---------------------------------------------------------------------------
    print("\n--------------------------------------------------------------------")
    print("📌 CENÁRIO 2: Caso de Borda - Grafo Desconexo (Origem: A, Destino: Z)")
    print("--------------------------------------------------------------------")
    g2 = Grafo(direcionado=False)
    g2.adicionar_aresta("A", "B")
    g2.adicionar_aresta("B", "C")
    g2.adicionar_vertice("Z")  # Vértice isolado

    caminho_borda, ops_borda, visita_borda = g2.bfs("A", "Z")
    print(f"[BFS em Grafo Desconexo] Caminho: {caminho_borda} | Operações: {ops_borda}")
    print(f" -> Ordem de Nós Visitados: {visita_borda}")

    # ---------------------------------------------------------------------------
    # CENÁRIO 3: Pior Caso / Comparativo (Demonstração da Garantia de Menor Caminho)
    # ---------------------------------------------------------------------------
    print("\n--------------------------------------------------------------------")
    print("📌 CENÁRIO 3: Pior Caso Comparativo (Diferença de Menor Caminho)")
    print(" Estrutura: A possui um atalho para H (A->C->H: 2 saltos)")
    print("            e um ramo longo em profundidade (A->B->D->E->F->G->H: 6 saltos)")
    print("--------------------------------------------------------------------")
# Altere a ordem no Cenário 3 para que a DFS explore o ramo longo primeiro:
    g3 = Grafo(direcionado=True)
    # 1. Ramo longo profundo (adicionado primeiro)
    g3.adicionar_aresta("A", "B")
    g3.adicionar_aresta("B", "D")
    g3.adicionar_aresta("D", "E")
    g3.adicionar_aresta("E", "F")
    g3.adicionar_aresta("F", "G")
    g3.adicionar_aresta("G", "H")

    # 2. Atalho direto (adicionado depois)
    g3.adicionar_aresta("A", "C")
    g3.adicionar_aresta("C", "H")

    c_bfs, ops_b, v_bfs = g3.bfs("A", "H")
    c_dfs, ops_d, v_dfs = g3.dfs("A", "H")

    print(f"[BFS] Caminho (Menor Garantido): {c_bfs} ({len(c_bfs)-1 if c_bfs else 0} arestas) | Custo: {ops_b} ops")
    print(f"[DFS] Caminho Encontrado:        {c_dfs} ({len(c_dfs)-1 if c_dfs else 0} arestas) | Custo: {ops_d} ops")
    print("\n✅ Conclusão do Teste: A BFS encontrou a rota ótima de 2 arestas, enquanto a DFS")
    print("   se aprofundou no ramo longo completando uma rota com muito mais arestas.")
    print("=" * 70)