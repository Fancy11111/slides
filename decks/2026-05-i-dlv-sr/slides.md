---
theme: seriph
layout: cover
title: I-DLV-sr
info: A Stream Reasoning System based on I-DLV
  
colorSchema: light 
drawings:
  persist: false
transition: slide-left
mdc: true
---

# I-DLV-sr
A Stream Reasoning System based on I-DLV

Francesco Calimeri, Marco Manna, Elena Mastria, Maria Concetta Morelli, Simona Perri, Jessica Zangari 


<div class="abs-br m-6 text-sm opacity-50">
Daniel Fenz · 2026
</div>

<!--
This paper by 
-->

---
---

# I-DLV-sr components

- I²-DLV
- Apache Flink

<!--
I²-DLV is an incremental reasoner, Apache Flink is a stream processing framework with exactly one semantics
-->

---
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

<v-clicks depth="2">

<div class="border-1 pt-1 mt-4 bg-slate-300/20">

- $O(\Sigma, \{0\}) = \{\{tram("WLB", "St1"), tram("62", "St1")\}\}$
- $O(\Sigma, \{1\}) = \{\{\}\}$
- $O(\Sigma, \{0,2\}) = \{\{tram("1","St1")\}, \{tram("WLB", "St1"), tram("62", "St1")\}\}$

</div>

</v-clicks>

</div>

<!--
0 is the current timepoint, 1 is the previous and so on
-->

---

# Semantics of streaming literals

<v-clicks>

  - $a$ at least $c$ in $\{d_1,...,d_m\}$
    - $|\{A \in O(\Sigma, D) : a \in A\}|  \ge c$
  - $a$ always in $c$ in $\{d_1,...,d_m\}$
    - $\forall A \in O(\Sigma, D), a \in A$
  - $a$ count $c$ in $\{d_1,...,d_m\}$
    - $|\{A \in O(\Sigma, D) : a \in A\}| = c$

</v-clicks>

<v-clicks depth="2">

<div class="border-1 pt-1 mt-4 bg-slate-300/20 flex">


- $\{\{tram("1","St1")\}, \{tram("1", "St1")\}, \{tram("WLB", "St1"), tram("62", "St1")\}\}$
- tram("1", Y) atleast 2 in \[2\]
- tram("1", "St1") always in $\{1,2\}$
- tram("WLB", Y) count 1 in \[2\]

</div>

</v-clicks>



---

# Semantics of streaming literals

<div> 
<v-clicks>

- *Substitution* $\sigma$ 
  - mapping from variables to constants 
  - for atom $a$: $\sigma(a)$
  - for literal $l$: $\sigma(l)$
- *applicable* substitution
  - $r$, $\Sigma$: $r$ is applicable on $\Sigma \iff \exists\sigma: \forall b \in B(r): \Sigma \models \sigma(b)$ 
 
</v-clicks>

<v-click>

<div class="border-1 pt-1 mt-4 bg-slate-300/20">


- $\Sigma = \{\{tram(1, St1)\}\}$
- $r: arrivalAt(Y) :- tram(X,Y)$ 
- $\sigma = \{X \rightarrow 1, Y \rightarrow St1\}$


</div>

</v-click>

</div>

---

# Semantics of streaming literals

<div> 
<v-clicks>

- *trigger* $\trigger$ on $\Sigma$
  - $r$ is applicable on $\Sigma$ via $\sigma$
- an *application* of $\trigger$ on $\Sigma$
  - $\Sigma = \{S_0,\ldots,S_n\}$, $a = H(r)$
  - $\Sigma\trigger\Sigma'$
    - $\Sigma' = \{S_0,\ldots,S_n \cup \sigma(a)\}$
 
</v-clicks>

<v-click>

<div class="border-1 pt-1 mt-4 bg-slate-300/20">


- $\Sigma = \{\{tram(1, St1)\}\}$
- $r: arrivalAt(Y) :- tram(X,Y)$ 
- $\sigma = \{X \rightarrow 1, Y \rightarrow St1\}$
- $\trigger\sigma = \{\{tram(1, St1), arrival(St1)\}\}$


</div>

</v-click>

</div>

---
layout: two-cols-header
---

# Stratification

::left::

### Harmless 

  - $a$ at least $c$ in $\{d_1,...,d_m\}$ 
  - $a$ always in $c$ in $\{d_1,...,d_m\}$ 

::right::

### Non-Harmless 

  - $a$ count $c$ in $\{d_1,...,d_m\}$ 

---

# Stratification

- $P$ is stratified by a disjoint set of rules $\Pi_1,\ldots,Pi_k$ 
  - $P = \Pi_1 \cup \ldots \cup \Pi_k$


<div v-click.at="+1" class="border-1 pt-1 px-2 mt-4 bg-slate-300/20">

<v-clicks at="+2">

1. for each harmless literal in the body of a rule in $\Pi_i$ with predicate $p$
    - $\{ r \in P | H(r) = p(t_1,\ldots,t_n) \} \subseteq \cup_{j=1}^i \Pi_j$
2. for each non-harmless literal in the body of a rule in $\Pi_i$ with predicate $p$
    - $\{ r \in P | H(r) = p(t_1,\ldots,t_n) \} \subseteq \cup_{j=1}^{i-1} \Pi_j$

</v-clicks>

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

---

# Restricted Streaming model

- P *stratified* by $\Pi_1,\ldots,\Pi_k$, Stream $\Sigma$
- $\Sigma_{\Pi_1}=outcome(\Pi_1,\Sigma)$
- $\Sigma_{\Pi_i}=outcome(\Pi_i,\Sigma_{\Pi_{i-1}})$
- $\mathcal{R}(P,\Sigma) = \Sigma_{\Pi_k}$: Outcome over strata

---
layout: end
---

Slides available at [https://slides.fenz.io/2026-05-i-dlv-sr](https://slides.fenz.io/2026-05-i-dlv-sr)

<PoweredBySlidev></PoweredBySlidev>
