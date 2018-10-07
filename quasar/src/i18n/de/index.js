export default {
  table: {
    issuerName: 'Herausgeber [Identifier]',
    language: 'Sprache',
    documentClass: 'Dokumentenklasse',
    year: 'Jahr',
    disclosureDate: 'Veröffentlichungsdatum'
  },
  interface: {
    save: 'Speicheren',
    favourite: 'zu Favoriten hinzufügen',
    report: 'Melden',
    online: 'Online',
    offline: 'Offline',
    allRecords: 'Ausgewählte Dokumente herunterladen',
    actions: 'AKTIONEN',
    intro: 'Bitte wählen oder geben Sie einen Namen in das Feld Name des Herausgebers ein, um die Ergebnisse anzuzeigen und mit der Datenbank zu interagieren.',
    showPdf: 'PDF Anzeigen',
    filterResults: 'Ergebnisse Filtern',
    downloadPdf: 'Herunterladen',
    account: 'Benuzterkonto',
    userName: 'Ihr Name',
    userNameHelper: 'Wir brauchen Ihren Namen, um transparenter zu sein.',
    password: 'Passwort',
    passwordHelper: 'Verwende ein Passwort, um Ihren Namen zu schützen.',
    financialYear: {
      meta: {
        label: 'Geschäftsjahr'
      },
      input: {
        name: {
          label: 'Datensätze nach Bezeichnern filtern',
          hint: 'Ihr Eintrag wird automatisch vervollständigt',
          error: 'Etwas ist schief gelaufen.',
          empty: 'Keine Ergebnisse'
        }
      }
    },
    selectDocs: {
      meta: {
        label: 'Dokumentklassen'
      },
      input: {
        name: {
          label: 'Datensätze nach Bezeichnern filtern',
          hint: 'Ihr Eintrag wird automatisch vervollständigt',
          error: 'Etwas ist schief gelaufen.',
          empty: 'Keine Ergebnisse'
        }
      }
    },
    legalEntity: {
      meta: {
        label: 'Unternehmensbezeichnung'
      },
      input: {
        name: {
          label: 'Datensätze nach Bezeichnern filtern',
          hint: 'Ihr Eintrag wird automatisch vervollständigt',
          error: 'Etwas ist schief gelaufen.',
          empty: 'Keine Ergebnisse'
        }
      }
    },
    searchTitle: {
      meta: {
        label: 'Titel nach Stichworten durchsuchen'
      },
      input: {
        name: {
          label: 'Schlüsselwörter',
          hint: 'Volltextsuche',
          error: 'Etwas ist schief gelaufen.',
          empty: 'Keine Ergebnisse'
        }
      }
    },
    issuer: {
      meta: {
        label: 'Emittentenname'
      },
      input: {
        name: {
          label: 'Filter records for a name',
          hint: 'Ihr Eintrag wird automatisch vervollständigt',
          error: 'Etwas ist schief gelaufen.',
          empty: 'Keine Ergebnisse'
        }
      }
    },
    country: {
      meta: {
        label: 'Emittentenmitgliedstaat'
      },
      input: {
        name: {
          label: 'Nach Mitgliedstaat filtern',
          hint: 'Ihr Eintrag wird automatisch vervollständigt',
          error: 'Etwas ist schief gelaufen.',
          empty: 'Keine Ergebnisse'
        }
      }
    },
    disclosureDate: {
      meta: {
        label: 'Offenlegungsdatum'
      },
      dateFrom: {
        label: 'Von:',
        hint: 'Beginnen bei...',
        error: 'Etwas ist schief gelaufen.',
        empty: 'Keine Ergebnisse'
      },
      dateTo: {
        label: 'Bis:',
        hint: 'Ende bei...',
        error: 'Etwas ist schief gelaufen.',
        empty: 'Keine Ergebnisse'
      }
    }
  },
  pages: {
    dashboard: {
      title: 'Dashboard'
    },
    information: {
      title: 'Informationen'
    }
  }
}
