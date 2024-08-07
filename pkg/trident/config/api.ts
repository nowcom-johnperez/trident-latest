export const getConfig = () => {
  let config = {
    NETWORK_URL_V2: 'https://packetlifter.hankeyinvestments.com/',
    RANCHER_DIRECT_URL: 'https://els-cybraindev.hankeyinvestments.com/',
    GITLAB_URL: 'https://gitlab.com/api/v4/',
    GITLAB_SOURCE_URL: 'https://gitlab.com/groups/nowcom/trident/-/wikis/',
    GITLAB_GROUP_ID: '90144365',
    GITLAB_IMAGES_PROJECT_ID: '60607760',
    GITLAB_PROJECT_TOKEN: 'glpat-5t8tWuTYdHTnhSszGZyp',
    GITLAB_TOKEN: 'glpat-3fpYpWvshVzaSjxUyyzt',
    BEARERTOKEN: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InpyWEF3LUJhZnRvOEtURmVQNkF0Q292NVBFX2VDeGFFMVdVeWoyRlphT3MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InBhY2tldGxpZnRlci10b2tlbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJwYWNrZXRsaWZ0ZXItYWNjb3VudCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjgwYmI5NzVjLWY2ZTUtNDVjMi05MjlmLTlkOGJiYTRiOTljYyIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OnBhY2tldGxpZnRlci1hY2NvdW50In0.k2f4uOUR-jIZbyKKcFfFsZGjwk6BnQGylgUnBbp-FcjNFKyXWe1zUggBWPCqB8w7J-jddNFdQAOIRYg62lmKtsLfp_Ig-HdvRS5R0MzMwFFrtC9c3-WtGdHsSY61ZW4OyaHTS5y_JULPhdXh3Hb9Qc9mhy2WSqWUFNvR9mKmJNEd1n-z5szzqNOhF333GvAsPMTl4hmp6pN2LRounc6tFkzXRNDVEetPKe-lykNeCflNDfPBI_bYP3aSVLLzCi8wtOaVnz3VbSy7r80t1_sr037HzW6r95lh0WsAnrBEyzfnv7RwD7UtN6hpFEoSHxV2H-XUZaqcJr3bQabXbgrNLw',
    RANCHER_BEARERTOKEN: 'token-tcs46:brqknm659wwtjm5r8gpz6tr5m4jrhz4vdrfkgt9lgfgv8nt2vbkkrw',
    CLUSTER: 'c-m-qcvh2r78',
    API_VERSION: 'v1',
    API: 'packetlifter.dev'
  };

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    if (hostname.includes('clouddev')) {
      config.RANCHER_DIRECT_URL = 'https://els-clouddev.hankeyinvestments.com/'
      config.RANCHER_BEARERTOKEN = 'token-dwz8m:vlbqpmct5sn2tbzf22t68w6hdrlqg9z9zt9bkp4tn6q274njqk4nlc'
      config.CLUSTER = 'c-m-kl24rgkc'
      config.API = 'packetlifter.io'
    } else {
      config.RANCHER_DIRECT_URL = 'https://els-cybraindev.hankeyinvestments.com/'
      config.RANCHER_BEARERTOKEN = 'token-tcs46:brqknm659wwtjm5r8gpz6tr5m4jrhz4vdrfkgt9lgfgv8nt2vbkkrw'
      config.CLUSTER = 'c-m-qcvh2r78'
      config.API = 'packetlifter.dev'
    }
  }

  return config;
};