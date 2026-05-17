import { defineKatexSetup } from '@slidev/types'

export default defineKatexSetup
(() => {
  return {
     macros: { "\\N": "\\mathbb{N}"}, 
    maxExpand
: 2000,
    /* ... */
  }
})
