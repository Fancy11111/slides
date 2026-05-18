---
theme: seriph
title: I-DLV-sr
info: A Stream Reasoning System based on I-DLV
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)
---

<h1 class="dark:text-(--slidev-theme-primary) text-(--slidev-theme-primary-dark)">
I-DLV-sr
</h1>

A Stream Reasoning System based on I-DLV

Francesco Calimeri, Marco Manna, Elena Mastria, Maria Concetta Morelli, Simona Perri, Jessica Zangari 


<div class="abs-br m-6 text-sm opacity-50">
Daniel Fenz · 2026
</div>

<!--
This paper by 
-->

---

# I-DLV-sr components

- I²-DLV
- Apache Flink

<!--
I²-DLV is an incremental reasoner, Apache Flink is a stream processing framework with exactly one semantics
-->

---
layout: section
---

# Syntax and Semantics

---

# Syntax


- ASP-Core-2
- normal, stratified programs
- streaming literals

<!--
ASP-Core-2 supports aggregates and weak constraints
-->

---

# Streaming literals 

<v-clicks depth="2">

  - $a$ at least $c$ in $\{d_1,...,d_m\}$
  - $a$ always in $c$ in $\{d_1,...,d_m\}$
  - $a$ count $c$ in $\{d_1,...,d_m\}$

</v-clicks>

<v-click>

Some shortcuts:

  - $a$ at least 1 in $\{d_1,...,d_m\}$ => $a$ in $\{d_1,...,d_m\}$
  - $a$ at least 1 in $0$ => $a$
  - $"not "\ a$ at least in c in $\{d_1,...,d_m\}$ => $a$ at most $c'$ in $\{d_1,...,d_m\}$
    - where $c = c' + 1$
  - $[n]$ instead of $\{0,\ldots,n\}$

</v-click>

---

# Rules

- $a :- l_1,\ldots,l_n$
- $\#temp\ a :- l_1,\ldots,l_n$


<div class="border-1 pt-1 mt-4 bg-slate-300/20">

- $irregular \coloneq \text{not }tram(X, "St1")\text{ in }[10]$.
- $\#\text{temp } num\_anomalies(X) \coloneq \text{irregular count }X\text{ in }[30]$.
- $alert \coloneq num\_anomalies(X), X > 5$.

</div>

---

# Semantics of streaming literals

<div> 

- Stream $\Sigma = \langle S_0,\ldots,S_n \rangle$
  - $S_i$: set of ground predicate atoms
  - $a \in S_i$: a is true at time point $i$
  - $\Sigma = \{\{tram("1","St1")\}, \{\}, \{tram("WLB", "St1"), tram("62", "St1")\}\}$

<v-clicks>

- Backward Observation $O(\Sigma,D)$ where $D = \{d_1,\ldots,d_m\} \subset \N$ 
  - $O(\Sigma,D) = \{S_i | i = n - d \land d \in D \land i \ge 0\}$

</v-clicks>


<div v-click class="border-1 pt-1 mt-4 bg-slate-300/20">

- $O(\Sigma, \{0\}) = \{\{tram("WLB", "St1"), tram("62", "St1")\}\}$
- $O(\Sigma, \{1\}) = \{\{\}\}$
- $O(\Sigma, \{0,2\}) = \{\{tram("1","St1")\}, \{tram("WLB", "St1"), tram("62", "St1")\}\}$

</div>


</div>

<!--
0 is the current timepoint, 1 is the previous and so on
-->

---

# Semantics of streaming literals


- $a$ at least $c$ in $\{d_1,...,d_m\}$
  - $|\{A \in O(\Sigma, D) : a \in A\}|  \ge c$


<v-clicks>

  - $a$ always in $c$ in $\{d_1,...,d_m\}$
    - $\forall A \in O(\Sigma, D), a \in A$
  - $a$ count $c$ in $\{d_1,...,d_m\}$
    - $|\{A \in O(\Sigma, D) : a \in A\}| = c$

</v-clicks>


<div v-click class="border-1 pt-1 mt-4 bg-slate-300/20 flex">


- $\{\{tram("1","St1")\}, \{tram("1", "St1")\}, \{tram("WLB", "St1"), tram("62", "St1")\}\}$
- tram("1", Y) atleast 2 in \[2\]
- tram("1", "St1") always in $\{1,2\}$
- tram("WLB", Y) count 1 in \[2\]

</div>


---

# Semantics of streaming literals

<div> 

- *Substitution* $\sigma$ 
  - mapping from variables to constants 
  - for atom $a$: $\sigma(a)$
  - for literal $l$: $\sigma(l)$

<v-clicks>


- *applicable* substitution
  - $r$, $\Sigma$: $r$ is applicable on $\Sigma \iff \exists\sigma: \forall b \in B(r): \Sigma \models \sigma(b)$ 
 
</v-clicks>

<v-click>

<div class="border-1 pt-1 mt-4 bg-slate-300/20">


- $\Sigma = \{\{tram(1, St1)\}\}$
- $r: arrivalAt(Y) \coloneq tram(X,Y)$ 
- $\sigma = \{X \rightarrow 1, Y \rightarrow St1\}$


</div>

</v-click>

</div>

---

# Semantics of streaming literals

- *trigger* $\trigger$ on $\Sigma$
  - $r$ is applicable on $\Sigma$ via $\sigma$

<div> 
<v-clicks>

- an *application* of $\trigger$ on $\Sigma$
  - $\Sigma = \{S_0,\ldots,S_n\}$, $a = H(r)$
  - $\Sigma\trigger\Sigma'$
    - $\Sigma' = \{S_0,\ldots,S_n \cup \sigma(a)\}$
 
</v-clicks>

<v-click>

<div class="border-1 pt-1 mt-4 bg-slate-300/20">


- $\Sigma = \{\{tram(1, St1)\}\}$
- $r: arrivalAt(Y) \coloneq tram(X,Y)$ 
- $\sigma = \{X \rightarrow 1, Y \rightarrow St1\}$
- $\trigger\sigma = \{\{tram(1, St1), arrival(St1)\}\}$


</div>

</v-click>

</div>
<!---->
<!-- --- -->
<!-- layout: two-cols-header -->
<!-- --- -->
<!---->
<!-- # Stratification -->
<!---->
<!-- ::left:: -->
<!---->
<!-- ### Harmless  -->
<!---->
<!--   - $a$ at least $c$ in $\{d_1,...,d_m\}$  -->
<!--   - $a$ always in $c$ in $\{d_1,...,d_m\}$  -->
<!---->
<!-- ::right:: -->
<!---->
<!-- ### Non-Harmless  -->
<!---->
<!--   - $a$ count $c$ in $\{d_1,...,d_m\}$  -->
<!---->
---

# Stratification

- $P$ is stratified by a disjoint set of rules $\Pi_1,\ldots,Pi_k$ 
  - $P = \Pi_1 \cup \ldots \cup \Pi_k$


<div v-click.at="+1" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20">


1. for each harmless literal in the body of a rule in $\Pi_i$ with predicate $p$
    - $\{ r \in P | H(r) = p(t_1,\ldots,t_n) \} \subseteq \cup_{j=1}^i \Pi_j$
2. for each non-harmless literal in the body of a rule in $\Pi_i$ with predicate $p$
    - $\{ r \in P | H(r) = p(t_1,\ldots,t_n) \} \subseteq \cup_{j=1}^{i-1} \Pi_j$


</div>

---

# Stratum application 

- P *stratified* by $\Pi_1,\ldots,\Pi_k$, Stream $\Sigma$
- *Stratum application* of $\Pi_s$ (for $s \in \{1,\ldots,k\}$) is
  - finite sequence of streams $\Sigma_0,\ldots,\Sigma_h$ where $\Sigma_0 = \Sigma$
  - for $h \ge 0$:
<div v-click.at="+1" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20">

  - for each $0 \le i < h$, there is a trigger $\langle r_i, \sigma_i \rangle$ for $\Pi_s$ such that $\Sigma_i \langle r_i, \sigma_i \rangle \Sigma_{i+1}$
  - for each $0 \le i < j < h$, if $\Sigma_i \langle r_i, \sigma_i \rangle \Sigma_{i+1}$, $\Sigma_j \langle r_j, \sigma_j \rangle \Sigma_{j+1}$ and $r_i = r_j$ then $\sigma_i \neq \sigma_j$
  - there is no trigger $\trigger$ for $\Pi_s$ on $\Sigma_h$ such that $\trigger \not \in \{\langle r_i, \sigma_i \rangle\}_{0 \le i \le h}$  

</div>

<v-click at="+2">

- $\Sigma_h$: *outcome*

</v-click>

<!-- proposition that was not proven in paper but addendum: Any order of triggers in a stratum application leads to the same outcome -->

---

# Restricted Streaming model

- P *stratified* by $\Pi_1,\ldots,\Pi_k$
- Stream $\Sigma = \langle S_0,\ldots,S_n \rangle$

<div v-click.at="+1" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20">

- $\Sigma_{\Pi_1}=outcome(\Pi_1,\Sigma)$
- $\Sigma_{\Pi_i}=outcome(\Pi_i,\Sigma_{\Pi_{i-1}})$
- $\mathcal{R}(P,\Sigma) = \Sigma_{\Pi_k}$: Outcome over strata

</div>

<div v-click.at="+2" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20">

- $\Sigma'=\langle S'_0,\ldots,S'_{n-1},S_n \rangle$
- $S'_0=\mathcal{R}(P,\langle S_0 \rangle)$
- $S'_i=\mathcal{R}(P,\langle S'_0,\ldots,S'_{i-1},S_i \rangle)$
- restricted streaming model $\mathcal{R}(P,\Sigma')$

</div>

---

# Streaming model

- P *stratified* by $\Pi_1,\ldots,\Pi_k$
  - $P_{(1)} = \{r \in P | r \text{ is not } \#temp\}$
- Stream $\Sigma = \langle S_0,\ldots,S_n \rangle$


<div v-click.at="+1" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20">

- $\mathcal{P}(P, \Sigma)$: Persistent outcome over strata
- $\mathcal{P}(P, \Sigma) = \{ a \in \mathcal{R}(P, \Sigma) | a \in S_n \lor \exists k,r: r \in P_{(1)} \land \trigger \text{ for } \Sigma_{\Pi_k} \land \sigma(H(r)) = a \}$

</div>

<div v-click.at="+2" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20">

- $\Sigma'=\langle S'_0,\ldots,S'_{n-1},S_n \rangle$
- $S'_0=\mathcal{P}(P,\langle S_0 \rangle)$
- $S'_i=\mathcal{P}(P,\langle S'_0,\ldots,S'_{i-1},S_i \rangle)$
- Streaming model: $\mathcal{R}(P,\Sigma')$

</div>
<!-- the streaming model for restricted I-DLV-sr programs -->

---
layout: section
id: arch
---

# Architecture 


---
layout: image
image: /architecture.svg
background-size: auto 70%
---

# Top Level

---

# Execution Manager

- Program Rewriting
- Program Splitting 
- Processing Ordering

---

# Execution Manager - Program Rewriting

- Rewrites Non-degenerate streaming atoms
  - $p(t_1,\ldots,t_n) \texttt{ op } \text{in } \{d_1,\ldots,d_m\} \rightarrow p'(t_1,\ldots,t_n)$
    - $\texttt{op} \in \{$ at least $c$, at most $c$, always, count $c \}$
  - $p(t_1,\ldots,t_n) \text{ count } X \text{ in } \{d_1,\ldots,d_m\} \rightarrow p'(t_1,\ldots,t_n,X)$

<div class="flex justify-between">

<div v-click.at="+1" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20 h-fit justify-self align-self">

- $a(X) \coloneq b(X)\text{ always in }[2].$
- $b(Y) \coloneq a(X)\text{ in }[1], Y=X+1, c(Y).$
- $d(X) \coloneq b(X)\text{ at least 2 in }[4].$
- $e(X,Y) \coloneq a(X), b(Y).$

</div>


<div v-click.at="+2" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20 h-fit justify-self align-self">

- $a(X) \coloneq b_{aux1}(X).$
- $b(Y) \coloneq a_{aux1}(X), Y=X+1, c(Y).$
- $d(X) \coloneq b_{aux2}(X).$
- $e(X,Y) \coloneq a(X), b(Y).$

</div>

</div>


<div v-click.at="+2" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20 h-fit justify-self align-self">

- $b(X)\text{ always in }[2] \rightarrow b_{aux1}(X)$
- $a(X)\text{ in }[1] \rightarrow a_{aux1}(X)$
- $b(X)\text{ at least 2 in }[4] \rightarrow b_{aux2}(X)$

</div>

<!-- rewritten program goes to I-DLV, subprogram manager produces ground instances based on evaluation of stream manager -->

---
layout: two-cols-header
---

# Execution Manager - Program Splitting 

::left::

- Stream dependency graph $G_P^{SD}$
  - nodes: predicates $p$ in rule heads $H(r)$
  - edges: p to q if  $\exists r \in P: preds(H(r)) = \{q\} \land p \in preds(B(r))$
    - labelled with $<$ if p occurs in non-degenerate streaming literal

<div class="border-1 pt-1 px-2 mt-4 bg-slate-300/20 h-fit justify-self align-self">

- $a(X) \coloneq b(X)\text{ always in }[2].$
- $b(Y) \coloneq a(X)\text{ in }[1], Y=X+1, c(Y).$
- $d(X) \coloneq b(X)\text{ at least 2 in }[4].$
- $e(X,Y) \coloneq a(X), b(Y).$

</div>

::right:: 

<div class="flex flex-col">

<v-click>

<img src="/stream-dep-graph.svg" class="w-[auto] h-[25%]"/>

</v-click>
</div>

---
layout: two-cols-header
---

# Execution Manager - Program Splitting 

::left::

- Stream component graph $G_P^{SC}$
  - strongly connected components of $G_P^{SD}$

<div class="border-1 pt-1 px-2 mt-4 bg-slate-300/20 h-fit justify-self align-self">

- $a(X) \coloneq b(X)\text{ always in }[2].$
- $b(Y) \coloneq a(X)\text{ in }[1], Y=X+1, c(Y).$
- $d(X) \coloneq b(X)\text{ at least 2 in }[4].$
- $e(X,Y) \coloneq a(X), b(Y).$

</div>

::right:: 

<div class="flex flex-col">

<img src="/stream-dep-graph.svg" class="w-[auto] h-[25%]"/>

<v-click>

<img src="/stream-comp-graph.svg" class="w-[auto] h-[25%]"/>

</v-click>
<!-- rewritten program goes to I-DLV, subprogram manager produces ground instances based on evaluation of stream manager -->

</div>

---
layout: two-cols-header
---

#  Execution Manager - Process Ordering 

::left::

- Stream component graph $G_P^{SC}$
<v-clicks>

- $A \prec B$: $A$ *preceedes* $B$ 
  - there is a path from $A$ to $B$ with atleast 1 $<$ edge
- otherwise $A \approx B$: $A$ *alongside* $B$ 
- ordering $C_1,\ldots,C_n$ for the nodes of $G_P^{SC}$
  - $\forall i,j: i < j \implies C_j \not \prec C_i$ 


<img src="/stream-comp-graph.svg" class="w-[auto] h-[25%]"/>

</v-clicks>

::right::

<v-click>

### Possible orders

- $\{e\} \prec \{a,b\} \prec {d}$
- $\{a,b\} \prec \{e\} \prec {d}$
- $\{a,b\} \prec \{d\} \prec {e}$

</v-click>

---
layout: two-cols-header
---

# Execution Manager - Process Ordering

::left::

- ordering $C_1,\ldots,C_n$ for the nodes of $G_P^{SC}$

<v-clicks>

- collect pairwise nodes into macro nodes $M$
  - $i \le j \le k$: $M = \cup_{j} C_j$
  - _either_ $i = k$
  - _or_ $\forall j, j \not = k : C_j \approx C_{j+1}$



- for $C_l, C_m$ with $l < m$
  - $C_l = \cup_{j_l} C_{j_l}, i_l \leq j_l \leq k_l$
  - $C_m = \cup_{j_m} C_{j_m}, i_m \le j_m \le k_m$
  - requires $k_l < i_m$

</v-clicks>

::right::

<v-click>

<div class="flex flex-col">

<div class="flex-shrink-1">

- $\{a,b\} \prec \{e\} \prec {d}$

</div>

<img src="/stream-comp-graph.svg" class="w-[auto] h-[25%]"/>

</div>

</v-click>

---
layout: image
image: /architecture.svg
background-size: auto 70%
---

# Stream Manager

---
layout: image-right 
image: /stream-manager.svg
background-size: auto 70%
---

# Stream Manager


<div class="flex flex-col">

<div class="border-1 pt-1 px-2 mt-4 bg-slate-300/20 h-fit justify-self align-self w-[fit-content]">

- $a(X) \coloneq b(X)\text{ always in }[2].$
- $b(Y) \coloneq a(X)\text{ in }[1],\\ Y=X+1, c(Y).$
- $d(X) \coloneq b(X)\text{ at least 2 in }[4].$
- $e(X,Y) \coloneq a(X), b(Y).$

</div>

<img src="/stream-macro-graph-spec.svg" />

</div>

---
layout: image-right 
image: /subprogram-manager.svg
background-size: auto 40%
---

# Subprogram Manager

<div class="border-1 pt-1 px-2 mt-4 bg-slate-300/20 h-fit justify-self align-self w-[fit-content]">

- $a(X) \coloneq b(X)\text{ always in }[2].$
- $b(Y) \coloneq a(X)\text{ in }[1],\\ Y=X+1, c(Y).$
- $d(X) \coloneq b(X)\text{ at least 2 in }[4].$
- $e(X,Y) \coloneq a(X), b(Y).$

</div>

---
layout: image
image: /architecture-spec.svg
background-size: auto 85%
---

# I-DLV-sr



---
layout: end
---


# Thank you for your attention
<!---->
<!-- <SlidePortal target="arch"> -->
<!-- Hover -->
<!-- </SlidePortal> -->
<!---->

<span class="abs-bl">
Slides available at <a target="_blank">https://slides.fenz.io/2026-05-i-dlv-sr</a>
</span>

<PoweredBySlidev class="abs-br"></PoweredBySlidev>
