export default {
  mounted() {
    const elements = document.getElementsByClassName('dashboard-root');
    for (let el of elements) {
      if (!el.classList.contains('idp-container')) {
        // el.classList.add('idp-container');
      }
    }
  },
  beforeRouteLeave(to: any, from: any, next: any) {
    if (!to.fullPath.includes('trident')) {
      const elements = document.getElementsByClassName('dashboard-root');
      for (let el of elements) {
        if (el.classList.contains('idp-container')) {
          el.classList.remove('idp-container');
        }
      }
    }
    next()
  },
}