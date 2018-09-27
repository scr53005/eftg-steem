<template lang="pug">
  q-page
    .column
      .row
        q-card.col-md-5.outline()
          q-card-title.bg-primary.flex()
            strong {{ $t('interface.issuer.meta.label') }}
            span(v-if="selectedName")
              q-chip.float-right(square) {{ selectedName }}
          q-card-main
            q-search.full-width(
            loading
            clearable
            v-model="selectedName"
            :float-label="$t('interface.issuer.input.name.label')"
            :placeholder="$t('interface.issuer.input.name.hint')"
            )
              q-autocomplete(
              :min-characters="0"
              @search="searchPeople"
              @selected="selectedPerson"
              )
            q-chip(v-for="company in companiesChoice" :key="company.id"
            color="secondary"
            style="margin-right:2px"
            closable
            square
            @hide="removeCompanyChip(company)"
            ) {{ company }}
          q-card-separator
          q-card-actions(align="end")
            q-btn( dense, size="xs", text-color="black", color="cyan-2" icon="fas fa-box", @click="headsUp(`Downloading all assets with edges connected to this user`)")
              label {{ $t('interface.allRecords') }}
            q-btn.color(dense, size="xs", text-color="black", color="positive", icon="star", @click="headsUp(`Saving this Issuer to your favorites`)")
              label {{ $t('interface.favourite') }}
            q-btn( dense, size="xs", text-color="black", color="warning", icon="warning", @click="headsUp(`Alert the admins about this Issuer`)")
              label {{ $t('interface.report') }}
            q-btn( dense, size="xs", text-color="black", color="light" icon="info", @click="headsUp(`Show me what the heck this is about`)")
              label {{ $t('pages.information.title') }}

        q-card.col-md-4.outline()
          q-card-title.bg-primary()
            strong {{ $t('interface.country.meta.label') }}
          q-card-main
            q-search.full-width(
            loading
            clearable
            v-model="countriesHolder"
            :float-label="$t('interface.country.input.name.label')"
            @change="selectedCountry"
            )
              q-autocomplete(
              :min-characters="0"
              v-model="countries"
              @search="searchCountry"
              @selected="selectedCountry"
              )
            q-chip(v-for="country in countriesChoice" :key="country.id"
            color="secondary"
            style="margin-right:2px"
            closable
            square
            @hide="removeCountryChip(country)"
            ) {{ country }}
        q-card.col-md-3.outline()
          q-card-title.bg-primary()
            strong {{ $t('interface.disclosureDate.meta.label') }}
          q-card-main()
            q-datetime.full-width(
              minimal
              type="date"
              default-view="year"
              format="DD/MM/YYYY"
              min="1970"
              max="2018"
              :before="[{icon: 'fas fa-calendar-alt'}]"
              :float-label="$t('interface.disclosureDate.dateFrom.label')"
              :placeholder="$t('interface.disclosureDate.dateFrom.hint')"
              v-model="dateFrom"
              )
            q-datetime.full-width(
              minimal
              type="date"
              default-view="year"
              format="DD/MM/YYYY"
              min="1970"
              max="2018"
              :before="[{icon: 'fas fa-calendar-alt'}]"
              :float-label="$t('interface.disclosureDate.dateTo.label')"
              :placeholder="$t('interface.disclosureDate.dateTo.hint')"
              v-model="dateTo"
              )
</template>

<style>
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
      tags: undefined,
      title: 'Dashboard',
      dateFrom: '1970/01/01',
      dateTo: new Date(),
      selectedName: '',
      countries,
      countriesHolder: undefined,
      countriesChoice: [],
      companies,
      companiesChoice: [],
      country_search: undefined
    }
  },
  meta () {
    return {
      title: 'Dashboard'
    }
  },
  methods: {
    // in reality these removes would be a mixin at least
    // and they would be unit tested
    headsUp (msg) {
      this.$q.notify(msg)
    },
    removeCountryChip (item) {
      const check = this.countriesChoice.indexOf(item)
      if (check > -1) this.countriesChoice.splice(check, 1)
      this.$q.notify(`Removed country: "${item}"`)
    },
    removeCompanyChip (item) {
      const check = this.companiesChoice.indexOf(item)
      if (check > -1) this.companiesChoice.splice(check, 1)
      this.$q.notify(`Removed company: "${item}"`)
    },
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
    selectedCountry (item) {
      const check = this.countriesChoice.indexOf(item.label)
      if (check > -1) this.countriesChoice.splice(check, 1)
      this.countriesChoice.push(item.label)
      this.countriesHolder = null
      companies.forEach((company) => {
        const check = company.country.indexOf(item.label)
        if (check > -1) {
          this.companiesChoice.push(company.name)
        } else {
          // SUPER HACKY!!!
          this.removeCompanyChip(company.name)
        }
      })
      this.$q.notify(`Selected suggestion "${item.label}"`)
    },
    selectedPerson (item) {
      // this is so PSEUDO ;)
      companies.forEach((company) => {
        const check = company.people.indexOf(item.label)
        if (check > -1) {
          this.companiesChoice.push(company.name)
          // this.companiesHolder = { ...{ label: company.name } }
          this.countriesChoice.push(company.country)
          // this.selectedCountry(`["label": "${company.country}", "value": "${company.country}" }]`)
        }
      })
      this.$q.notify(`Selected Issuer "${item.label}"`)
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
