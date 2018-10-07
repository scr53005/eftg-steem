import pdf from 'vue-pdf'
// import VueI18n from 'vue-i18n'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$pdf = pdf
  // Vue.use(pdf)
}
