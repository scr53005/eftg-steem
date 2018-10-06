import pdf from 'vue-pdf'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$pdf = pdf
}
