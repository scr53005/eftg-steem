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
            dense
            @hide="removeCompanyChip(company)"
            ) {{ company }}
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
            dense
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
      .row(v-if="identifier")
        .col-md-5
          q-card.outline
            q-card-title.bg-primary.flex()
              strong {{ $t('interface.legalEntity.meta.label') }}
              span(v-if="selectedName")
                q-chip.float-right(square) {{ company }}
            q-card-main
              q-chip.q-ma-md(
              color="secondary"
              square
              ) {{ identifier }}
          q-card.outline()
            q-card-title.bg-primary.flex()
              strong {{ $t('interface.searchTitle.meta.label') }}

            q-card-main
              q-search.full-width(
              loading
              clearable
              v-model="selectedName"
              :float-label="$t('interface.searchTitle.input.name.label')"
              :placeholder="$t('interface.searchTitle.input.name.hint')"
              )
        .col-md-5
          q-card.outline()
            q-card-title.bg-primary.flex()
              strong {{ $t('interface.selectDocs.meta.label') }}
            q-card-main
              .row
                q-input.full-width(
                color="secondary"
                stack-label="Filter"
                v-model="tickFilter"
                class="q-ma-none"
                clearable
                )
              q-scroll-area(style="width: 100%; height: 146px")
                q-tree(
                style="font-size: 0.8em"
                :nodes="tickable"
                color="secondary"
                default-expand-all
                :ticked.sync="ticked"
                tick-strategy="leaf-filtered"
                :filter="tickFilter"
                node-key="label"
                )
        .col-md-2
          q-card.outline()
            q-card-title.bg-primary.flex()
              strong {{ $t('interface.financialYear.meta.label') }}
            q-card-main
              q-scroll-area(style="width: 100%; height: 202px")
                q-tree(
                style="font-size: 0.8em"
                :nodes="years"
                color="secondary"
                default-expand-all
                :ticked.sync="tickedYear"
                tick-strategy="leaf"
                node-key="label"
                )
      .row(v-if="identifier")
        q-card.col-md-12.outline()
          q-table.full-width(
          :data="documents"
          :columns="columns"
          row-key="name"
          selection="single"
          :selected.sync="selected"
          rows-per-page="[10, 25, 50, 100]"
          )
            template(slot="top-selection" slot-scope="props")
              .row.bg-grey-10.full-width
                .col-3
                  q-btn.q-pa-sm(flat, dense, size="xs", text-color="cyan-2" icon="fas fa-cloud-download-alt", @click="headsUp(`Downloading all assets with edges connected to this user`)")
                    label {{ $t('interface.allRecords') }}
                .col-6
                .col-3
                  q-btn.q-pa-sm(flat, dense, size="xs", text-color="positive", icon="star", @click="headsUp(`Saving this Issuer to your favorites`)")
                    label {{ $t('interface.favourite') }}
                  q-btn.q-pa-sm(flat, dense, size="xs", text-color="warning", icon="warning", @click="headsUp(`Alert the admins about this Issuer`)")
                    label {{ $t('interface.report') }}
                  q-btn.q-pa-sm(flat, dense, size="xs", text-color="light" icon="info", @click="headsUp(`Show me what the heck this is about`)")
                    label {{ $t('pages.information.title') }}
                  // div.col
                  // q-btn(color="negative" flat round delete icon="delete")
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
      country_search: undefined,
      selection: [],
      selected: undefined,
      deleteRow: undefined,
      columns: [
        {
          name: 'name',
          label: this.$t('table.issuerName'),
          field: 'issuerName',
          // OR field: row => row.some.nested.prop
          required: true,
          align: 'center',
          sortable: true,
          // sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          // format: val => `${val}`,
          classes: 'my-special-class'
        },
        { name: 'hms', align: 'center', label: 'HMS', field: 'hms', sortable: true },
        { name: 'class', align: 'center', label: this.$t('table.documentClass'), field: 'class', sortable: true },
        { name: 'language', align: 'center', label: this.$t('table.language'), field: 'language', sortable: true },
        { name: 'year', align: 'center', label: this.$t('table.year'), field: 'year', sortable: true },
        { name: 'disclosureDate', align: 'center', label: this.$t('table.disclosureDate'), field: 'disclosureDate', sortable: true }
      ],
      ticked: ['1.1 annual financial report', '2.1 home member state'],
      tickedYear: ['2017', '2016', '2015', '2014', '2013'],
      tickFilter: null,
      tickable: [
        {
          label: 'select all document classes and sub-classes',
          children: [
            {
              label: '1. Periodic regulated information',
              children: [
                { label: '1.1 annual financial report' },
                { label: '1.2 half-year financial report' },
                { label: '1.3 interim management statement' }
              ]
            },
            {
              label: '2. Ongoing regulated information\'',
              children: [
                { label: '2.1 home member state' },
                { label: '2.2 inside information' }
              ]
            }
          ]
        }
      ],
      years: [
        { label: '2017' },
        { label: '2016' },
        { label: '2015' },
        { label: '2014' },
        { label: '2013' }
      ],
      documents: []
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
    createTable: (documents) => {
      this.tableData = {

      }
    },
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
          if (company.name === 'G. & C. S.R.L.') {
            this.company = company.name
            this.identifier = company.id
            this.documents = []
            // this.years = []
            company.documents.forEach((document) => {
              this.documents.push({
                issuerName: company.name,
                hms: company.country,
                class: document.type,
                language: 'English',
                year: document.year,
                disclosureDate: document.disclosureDate
              })
              /*
              const yearTest = this.years.indexOf({ label: document.year })
              if (yearTest < 0) {
                this.years.forEach((year) => {
                  this.years.push({ label: year })
                })
              }
              */
            })
          }
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
