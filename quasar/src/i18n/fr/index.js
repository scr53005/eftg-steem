export default {
  interface: {
    save: 'Enregistrer',
    favourite: 'Préféré',
    report: 'Report',
    online: 'En ligne',
    offline: 'Hors ligne',
    allRecords: 'Rapport complet',
    intro: 'Veuillez sélectionner ou saisir un nom dans le champ Nom de l’émetteur pour afficher les résultats et interagir avec la base de données.',
    showPdf: 'Afficher le pdf',
    filterResults: 'Filtrer les résultats',
    downloadPdf: 'Télécharger PDF',
    account: 'Compte d\'utilisateur',
    userName: 'Votre nom',
    userNameHelper: 'Nous avons besoin de votre nom pour être plus transparent.',
    password: 'Mot de passe',
    passwordHelper: 'Utilisez un mot de passe pour protéger votre nom.',
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
        label: 'Classes de document'
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
        label: 'État d\'origine de l\'émetteur'
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
