---
theme: seriph
layout: cover
title: Explainable AI and the right to explanation  
info: |
drawings:
  persist: false
transition: slide-left
mdc: true
background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)
addons:
  - slidev-addon-citations
biblio:
  footnotes: short
  filename: 
    - bibliography.bib
    - gdpr.bib
---

# Explainable AI and the right to explanation

<div class="abs-br m-6 text-sm opacity-50">
Daniel Fenz · 2026
</div>

<!--
[~1 min] OPENING

Introduce the topic and set the tone.
-->

---
layout: statement
---

# Is there a right to explanation?

--- 

# GDPR and the right to explanation [@gdpr] [@eu-right-explanation]

## Article 13

> 2. In addition to the information referred to in paragraph 1, the controller shall, at the time when personal data are obtained, provide the data subject with the following further information necessary to ensure fair and transparent processing
>    - **g**: the existence of automated decision-making, including profiling, referred to in Article 22(1) and (4) and, at least in those cases, meaningful information about the logic involved, as well as the significance and the envisaged consequences of such processing for the data subject. 
>    - **f**: the existence of automated decision-making, including profiling, referred to in Article 22(1) and (4) and, at least in those cases, meaningful information about the logic involved, as well as the significance and the envisaged consequences of such processing for the data subject. 

<!-- article 14 contains the same clause -->

--- 

# GDPR and the right to explanation [@gdpr] [@eu-right-explanation]

## Article 22

> 1. The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her.
> 2. Paragraph 1 shall not apply if the decision:
>     - a. is necessary for entering into, or performance of, a contract between the data subject and a data controller;"
>     - b. is authorised by Union or Member State law to which the controller is subject and which also lays down suitable measures to safeguard the data subject's rights and freedoms and legitimate interests; or
>     - c. is based on the data subject's explicit consent.
> 3. In the cases referred to in points (a) and \(c) of paragraph 2, the data controller shall implement suitable measures to safeguard the data subject's rights and freedoms and legitimate interests, at least the right to obtain human intervention on the part of the controller, to express his or her point of view and to contest the decision.


---

# The moral argument [@right-to-expl]

- Opaqueness in institutions 
  - erode their legitimacy
  - more unjust

<v-clicks>

- *informed self-advocacy*
  - agency
  - accountability
- claim right instead of liberty
- explanations over evidence 

</v-clicks>

<!-- kate vredenborgh, claim right Hohfeld -->


---
layout: center
class: text-center
---

# What constitutes an explanation?

---

# Aspects of an explanation [@explanations-social-sciences]

- Contrastive
- Cognitive Process
  - identifying causes, attribution
- Social Process
  - Intent of knowledge transfer
- explanation vs. justification

<!-- 
goal: explore social sciences to better define explanations for ai
contrastive explanation: why did i receive grade 2 instead of 1 
-->

---
layout: center
class: text-center
---

# In which aspects can AI be evaluated as explainable? 

---
transition: none
---

# Explainable AI [@arous2025llm]


- Explainability 
- Interpretability 
- Faithfulness
- Understandability
- Transparency


<!-- 
exp: post hoc explanations 
inter: understandable models
faithfulnes: models inner workings, not oversimplify model
Understandability: usefulness
Transparency: traingin data, translating algorithmic behaviour
-->

---
layout: two-cols-header
---

# LLMs and Explainable AI [@arous2025llm] [@stochastic-parrots]

::left::

- Explainability 
- Interpretability 
- Faithfulness
- Understandability
- Transparency

::right::

<v-clicks>

- seems to be applicable
- basically impossible
- hard in common knowlegde form
- seems to be applicable
- challenging

</v-clicks>

---
layout: statement
---

# Explainability is a requirement for the use off AI based systems in government

### Thus, LLMs cannot be ethically used in government (at this point in time)

---

# Justice as fairness [@sep-rawls] [@sep-original-position]

- negative and positive thesis
- Original position
  - veil of ignorance

---
transition: none
---

# Core argument

- *informed self-advocacy* [@right-to-expl]
- Veil of Ignorance
  - unable to challenge decisions
  - unable to conform behaviour to rules 

---
transition: none
---

# Core argument

- Difference Principle 
  - biased trainig data [@stochastic-parrots]
  - most vulnerable -> more likely to be harmed
- Publicity

---

# References

<BiblioList :item-per-page="4"> </BiblioList>

---
layout: section
---

# Disussion

---
layout: statement
---

# No right to explanation?

---

# No right to an explanation [@no-right]

- danger of beaurocratic paralization
- no need for deep explanation, intervention is enough
- black box is not a problem
  - evaluatable by correlating input and output

<!-- a bit sensational and provocative -->

---
layout: statement
---

# Which aspects of explainable AI would you attest to LLMs?

---

# Explainable AI [@arous2025llm] [@stochastic-parrots]


- Explainability 
- Interpretability 
- Faithfulness
- Understandability
- Transparency
---
layout: statement
---

# People do use LLMs to get explanations for vairous things. Does this contradict evaluation of explainability?

<!-- but these people need to verify, and need to have the necessary knowledge to verify -->

---
layout: statement
---

# Is all use of LLMs in government problematic?


