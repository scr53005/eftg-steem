export default {
  interface: {
    save: 'Save',
    report: 'Report',
    online: 'Online',
    offline: 'Offline',
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
          label: 'Filter records for a Country',
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
    }
  }
}
