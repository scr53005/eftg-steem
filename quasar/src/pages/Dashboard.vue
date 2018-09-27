<template lang="pug">
  q-page
    .column
      .row
        q-card.col-md-5.outline()
          q-card-title.bg-primary()
            strong {{ $t('interface.issuer.meta.label') }}
          q-card-main
            q-item()
              q-search.full-width(
              loading
              v-model="selectedName"
              :float-label="$t('interface.issuer.input.name.label')"
              :placeholder="$t('interface.issuer.input.name.hint')"
              )
                q-autocomplete(
                :min-characters="0"
                @search="searchPeople"
                @selected="selected"
                )
            q-item
              q-item-main
                q-chips-input(
                color="secondary"
                v-model="tags"
                disable
                hide-underline
                )
          q-card-separator
          q-card-actions
            q-btn( dense,  color="positive", icon="fas fa-cloud-download-alt")
              label {{ $t('interface.save') }}
            q-btn( dense,  color="warning", icon="warning")
              label {{ $t('interface.report') }}

        q-card.col-md-4.outline()
          q-card-title.bg-primary()
            strong {{ $t('interface.country.meta.label') }}
          q-card-main
            q-item()
              q-search.full-width(
              loading
              v-model="countries"
              :float-label="$t('interface.country.input.name.label')"
              )
                q-autocomplete(
                :min-characters="0"
                @search="searchCountry"
                @selected="selected"
                )

        q-card.col-md-3.outline()
          q-card-title.bg-primary()
            strong {{ $t('interface.disclosureDate.meta.label') }}
          q-card-main()
            q-item()
              q-datetime.full-width(
              type="date"
              default-view="year"
              min="1970"
              max="2018"
              :before="[{icon: 'fas fa-calendar-alt'}]"
              :float-label="$t('interface.disclosureDate.dateFrom.label')"
              :placeholder="$t('interface.disclosureDate.dateFrom.hint')"
              v-model="dateFrom"
              modal
              )
            q-item
              q-datetime.full-width(
              type="date"
              default-view="year"
              min="1970"
              max="2018"
              :before="[{icon: 'fas fa-calendar-alt'}]"
              :float-label="$t('interface.disclosureDate.dateTo.label')"
              :placeholder="$t('interface.disclosureDate.dateTo.hint')"
              v-model="dateTo"
              modal
              )
</template>

<style>
  .q-chip {
    font-size: 0.7em;
    padding: 2px;
    height: 10px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .q-chip-main {
    padding: 0!important;
  }
  .q-chip-close i {
    font-size: 1.5em!important;
    margin-right: 13px!important;
    height: 18px!important;
    width: 18px!important;
  }
  .outline {
    border: 1px solid rgba(0,0,0,0.1);
  }
</style>

<script>
import { uid, filter } from 'quasar'
// import countries from './countries.json'
import companies from './companies.json'
const people = ['Pato Saldus', 'Peter James']
const countries = ['France', 'Italy', 'Germany', 'Latvia']

function parsePeople () {
  return people.map(person => {
    return {
      label: person,
      sublabel: getRandomSecondLabel(),
      value: person
    }
  })
}

function parseCountries () {
  return countries.map(country => {
    return {
      label: country,
      sublabel: getRandomSecondLabel(),
      value: country
    }
  })
}

function getRandomSecondLabel () {
  return `UID: ${uid().substring(0, 8)}`
}

/* function fuzzy (items, key) {
  return function (query) {
    const words = query.toLowerCase().split(' ')

    return items.filter((item) => {
      const normalizedTerm = item[key].toLowerCase()

      return words.every((word) => {
        return (normalizedTerm.indexOf(word) > -1)
      })
    })
  }
}
*/
function fuzzysearch (needle, haystack) {
  return true | false
}

export default {
  name: 'PageDashboard',
  data () {
    return {
      issuer: '',
      tags: [],
      title: 'Dashboard',
      dateFrom: '',
      dateTo: '',
      selectedName: '',
      countries,
      companies,
      country_search: ''
    }
  },
  meta () {
    return {
      title: 'Dashboard'
    }
  },
  methods: {
    searchFilter (terms, { field, list }) {
      const token = terms.toLowerCase()
      return list.filter(item => fuzzysearch(token, item[field].toLowerCase()))
    },
    searchPeople (terms, done) {
      done(filter(terms, { field: 'value', list: parsePeople() }))
    },
    searchCountry (terms, done) {
      done(filter(terms, { field: 'value', list: parseCountries() }))
    },
    steemTag () { // A function to lowercase, hyphenate and truncate the tags
      this.tags = this.tags.slice(0, 5)
      this.tags.forEach((tag, index) => {
        this.tags[index] = tag.toLowerCase()
          .replace(/[._— ]/g, '-')
          .replace(/[^a-z0-9-]/gi, '')
      })
    },
    selectCompany (val) {
      this.$q.notify(val)
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
    },
    getNames: () => {
      return this.peopleOptions
    },
    company () {
      return ['one', 'two']
    }
  }
}
</script>
