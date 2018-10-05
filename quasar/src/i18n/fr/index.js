export default {
  interface: {
    save: 'Enregistrer',
    favourite: 'Préféré',
    report: 'Report',
    online: 'En ligne',
    offline: 'Hors ligne',
    allRecords: 'Rapport complet',
    financialYear: {
      meta: {
        label: 'Année financière'
      },
      input: {
        name: {
          label: 'Filtrer les enregistrements pour l\'identifian',
          hint: 'Type pour les résultats d\'auto-complétion',
          error: 'Quelque chose s\'est mal passé.',
          empty: 'Aucun résultat'
        }
      }
    },
    selectDocs: {
      meta: {
        label: 'Classes et sous-classes de document'
      },
      input: {
        name: {
          label: 'Filtrer les enregistrements pour l\'identifian',
          hint: 'Type pour les résultats d\'auto-complétion',
          error: 'Quelque chose s\'est mal passé.',
          empty: 'Aucun résultat'
        }
      }
    },
    legalEntity: {
      meta: {
        label: 'Identifiant d\'entité légale'
      },
      input: {
        name: {
          label: 'Filtrer les enregistrements pour l\'identifiant',
          hint: 'Type pour les résultats d\'auto-complétion',
          error: 'Quelque chose s\'est mal passé.',
          empty: 'Aucun résultat'
        }
      }
    },
    searchTitle: {
      meta: {
        label: 'Rechercher titre par mots-clés'
      },
      input: {
        name: {
          label: 'Mots clés',
          hint: 'Type pour les résultats d\'auto-complétion',
          error: 'Quelque chose s\'est mal passé.',
          empty: 'Aucun résultat'
        }
      }
    },
    issuer: {
      meta: {
        label: 'Nom de l\'émetteur'
      },
      input: {
        name: {
          label: 'Filtrer les enregistrements pour un nom',
          hint: 'Type pour les résultats d\'auto-complétion',
          error: 'Quelque chose s\'est mal passé.',
          empty: 'Aucun résultat'
        }
      }
    },
    country: {
      meta: {
        label: 'État membre d\'origine de l\'émetteur'
      },
      input: {
        name: {
          label: 'Filtrer les pays',
          hint: 'Type pour les résultats d\'auto-complétion',
          error: 'Quelque chose s\'est mal passé.',
          empty: 'Aucun résultat'
        }
      }
    },
    disclosureDate: {
      meta: {
        label: 'Date de divulgation'
      },
      dateFrom: {
        label: 'De:',
        hint: 'Commencer à...',
        error: 'Quelque chose s\'est mal passé.',
        empty: 'Aucun résultat'
      },
      dateTo: {
        label: 'À:',
        hint: 'Fin à...',
        error: 'Quelque chose s\'est mal passé.',
        empty: 'Aucun résultat'
      }
    }
  },
  pages: {
    dashboard: {
      title: 'Tableau du Bord'
    },
    information: {
      title: 'Information'
    }
  }
}
