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

  - $a$ at least in $c$ in $\{d_1,...,d_m\}$
  - $a$ always in $c$ in $\{d_1,...,d_m\}$
  - $a$ count $c$ in $\{d_1,...,d_m\}$

</v-clicks>

<v-click>

Some shortcuts:

  - $a$ at least 1 in $\{d_1,...,d_m\}$ => $a$ in $\{d_1,...,d_m\}$
  - $a$ at least 1 in $0$ => $a$
  - $"not "\ a$ at least in c in $\{d_1,...,d_m\}$ => $a$ at most $c'$ in $\{d_1,...,d_m\}$
    - where $c = c' + 1$

</v-click>

---

# Rules
- $a := l_1,\ldots,l_n$
- $temp\ a := l_1,\ldots,l_n$

---

# Semantics of streaming literals

<div> 

<v-clicks>

- Stream $\Sigma = \langle S_0,\ldots,S_n \rangle$
  - $S_i$: set of ground predicate atoms
  - $a \in S_i$: a is true at time point $i$
- Backward Observation $O(\Sigma,D)$ where $D = \{d_1,\ldots,d_m\} \subset \N$ 
  - $O(\Sigma,D) = \{S_i | i = n - d \land d \in D \land i \ge 0\}$

</v-clicks>

<v-clicks depth="3">

<div class="border-1 pt-1 mt-4 bg-slate-300/20">


- $\Sigma = \{\{tram("1","St1")\}, \{\}, \{tram("WLB", "St1"), tram("62", "St1")\}\}$
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

<div> 
<v-clicks>

- A substitution $\sigma$ 
  - mapping from variables to constants 
- Backward Observation $O(\Sigma,D)$ where $D = \{d_1,\ldots,d_m\} \subset \N$ 
  - $O(\Sigma,D) = \{S_i | i = n - d \land d \in D \land i \ge 0\}$

</v-clicks>

<v-clicks depth="3">

<div class="border-1 pt-1 mt-4 bg-slate-300/20">


- $\Sigma = \{\{tram("1","St1")\}, \{\}, \{tram("WLB", "St1"), tram("62", "St1")\}\}$
  - $O(\Sigma, \{0\}) = \{\{tram("WLB", "St1"), tram("62", "St1")\}\}$
  - $O(\Sigma, \{1\}) = \{\{\}\}$
  - $O(\Sigma, \{0,2\}) = \{\{tram("1","St1")\}, \{tram("WLB", "St1"), tram("62", "St1")\}\}$


</div>

</v-clicks>

</div>

---
layout: two-cols
---

# Comparison Slide

## Left Side

<v-clicks>

- Point one
- Point two
- Point three

</v-clicks>

::right::

# &nbsp;

<div v-click>

## Right Side

</div>

<v-clicks>

- Counter point one
- Counter point two
- Counter point three

</v-clicks>

<!--
Walk through left side first, then reveal right side.
-->

---
layout: center
class: text-center
---

# Key Takeaway

<v-click>

<div class="mt-8 text-xl opacity-60">

A closing thought that ties everything together.

</div>

</v-click>

<!--
Deliver this slowly. Let it land.
-->

---
layout: center
class: text-center
---

# Thank You

<p class="text-xl opacity-60 mt-4">Questions?</p>

<div class="mt-16 text-sm opacity-30">

Sources and references available in speaker notes throughout

</div>

<!--
[Q&A]

Open the floor for questions.
-->
