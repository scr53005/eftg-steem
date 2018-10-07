export default {
  table: {
    issuerName: 'Issuer Name [Identifier]',
    language: 'Language',
    documentClass: 'Document Class',
    year: 'Year',
    disclosureDate: 'Document Disclosure Date'
  },
  interface: {
    save: 'Save',
    favourite: 'Favourite',
    report: 'Report',
    online: 'Online',
    offline: 'Offline',
    allRecords: 'Download selected documents',
    actions: 'ACTIONS',
    intro: 'Please select or type a name in the Issuer Name field to see results and interact with the database.',
    showPdf: 'Show PDF',
    filterResults: 'Filter Results',
    downloadPdf: 'Download PDF',
    account: 'User Account',
    userName: 'Your name',
    userNameHelper: 'We need your name to be more transparent.',
    password: 'Password',
    passwordHelper: 'Use a password to keep your name safe.',
    financialYear: {
      meta: {
        label: 'Financial Year'
      },
      input: {
        name: {
          label: 'Filter records for identifier',
          hint: 'Type for autocompleted results',
          error: 'Something went wrong.',
          empty: 'No Results'
        }
      }
    },
    selectDocs: {
      meta: {
        label: 'Document Classes'
      },
      input: {
        name: {
          label: 'Filter records for identifier',
          hint: 'Type for autocompleted results',
          error: 'Something went wrong.',
          empty: 'No Results'
        }
      }
    },
    legalEntity: {
      meta: {
        label: 'Legal Entity Identifier'
      },
      input: {
        name: {
          label: 'Filter records for identifier',
          hint: 'Type for autocompleted results',
          error: 'Something went wrong.',
          empty: 'No Results'
        }
      }
    },
    searchTitle: {
      meta: {
        label: 'Search title by keywords'
      },
      input: {
        name: {
          label: 'Keywords',
          hint: 'Full text search',
          error: 'Something went wrong.',
          empty: 'No Results'
        }
      }
    },
    issuer: {
      meta: {
        label: 'Issuer Name'
      },
      input: {
        name: {
          label: 'Filter records for a name',
          hint: 'Type for autocompleted results',
          error: 'Something went wrong.',
          empty: 'No Results'
        }
      }
    },
    country: {
      meta: {
        label: 'Issuer Home Member State'
      },
      input: {
        name: {
          label: 'Filter Countries',
          hint: 'Type for autocompleted results',
          error: 'Something went wrong.',
          empty: 'No Results'
        }
      }
    },
    disclosureDate: {
      meta: {
        label: 'Disclosure Date'
      },
      dateFrom: {
        label: 'From:',
        hint: 'Begin at...',
        error: 'Something went wrong.',
        empty: 'No Results'
      },
      dateTo: {
        label: 'To:',
        hint: 'End at...',
        error: 'Something went wrong.',
        empty: 'No Results'
      }
    }
  },
  pages: {
    dashboard: {
      title: 'Dashboard'
    },
    information: {
      title: 'Information'
    }
  }
}
