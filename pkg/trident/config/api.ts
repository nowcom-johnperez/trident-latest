export const getConfig = () => {
  let config = {
    NETWORK_URL_V2: 'https://packetlifter.hankeyinvestments.com/',
    NETWORK_URL_V3: 'https://10.55.12.136:6443/',
    RANCHER_DIRECT_URL: 'https://els-cybraindev01.hankeyinvestments.com/',
    BEARERTOKEN: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InpyWEF3LUJhZnRvOEtURmVQNkF0Q292NVBFX2VDeGFFMVdVeWoyRlphT3MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InBhY2tldGxpZnRlci10b2tlbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJwYWNrZXRsaWZ0ZXItYWNjb3VudCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjgwYmI5NzVjLWY2ZTUtNDVjMi05MjlmLTlkOGJiYTRiOTljYyIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OnBhY2tldGxpZnRlci1hY2NvdW50In0.k2f4uOUR-jIZbyKKcFfFsZGjwk6BnQGylgUnBbp-FcjNFKyXWe1zUggBWPCqB8w7J-jddNFdQAOIRYg62lmKtsLfp_Ig-HdvRS5R0MzMwFFrtC9c3-WtGdHsSY61ZW4OyaHTS5y_JULPhdXh3Hb9Qc9mhy2WSqWUFNvR9mKmJNEd1n-z5szzqNOhF333GvAsPMTl4hmp6pN2LRounc6tFkzXRNDVEetPKe-lykNeCflNDfPBI_bYP3aSVLLzCi8wtOaVnz3VbSy7r80t1_sr037HzW6r95lh0WsAnrBEyzfnv7RwD7UtN6hpFEoSHxV2H-XUZaqcJr3bQabXbgrNLw',
    BEARERTOKEN_V3: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Im1MeUp2T2lfdHptTi1pN1JkbEdSUGw5RnR2YnQxbVROeTJVUmY3TE9oR0UifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InBhY2tldGxpZnRlci10b2tlbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJwYWNrZXRsaWZ0ZXItYWNjb3VudCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImVjZDY1NTFiLWM3NTUtNDM1ZS1iMjYyLTRlYzcyYTA0MTk1MSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OnBhY2tldGxpZnRlci1hY2NvdW50In0.LPUPR_O2opQwa6pd73dDu5CxIvoaSAESFoEvVe7h7mpVUGzbZrfKkCRCA4C40vblzBB5MgHzU_DHWf3-GIlCiteUiyGVm8uf9nNoXZeL45Hl1i5rDMrzTdMnMrdMQwiLHH_rxj8Now2qK0eLrfwPZAMdMnwjp-mjzBnsdO1XPNyHXfBkdg1hirYYZXFuVpPrF3wHyjWtdYYQ-gDTzzOUKV8oka4Wly9MzD5FwZEPdDvkyDETqSxaKRT0TwG6PMnhmfjieHXGU6mroDrraWv6K8a79HypHHrqXRKm5kCXqMAdjEk_lCkn3bhjra88l49hf8x4rxV4s5giANIS7nCoPw',
    RANCHER_BEARERTOKEN: 'token-rzfxq:hg7wtcs5v5dng7xllx7vm25nrvz9kqrbfp9bzf5448n8995dj8hjkt',
    GITLAB_URL: 'https://gitlab.com/api/v4/',
    GITLAB_SOURCE_URL: 'https://gitlab.com/groups/nowcom/trident/-/wikis/',
    GITLAB_GROUP_ID: '90144365',
    GITLAB_IMAGES_PROJECT_ID: '60607760',
    GITLAB_PROJECT_TOKEN: 'glpat-5t8tWuTYdHTnhSszGZyp',
    GITLAB_TOKEN: 'glpat-3fpYpWvshVzaSjxUyyzt',
    CLUSTER: 'c-m-sdtmhjdg',
    API_VERSION: 'v1',
    API: 'packetlifter.dev',
    TRIDENT_API: 'trident.nowcom.io'
  };

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    if (hostname.includes('clouddev')) {
      config.RANCHER_DIRECT_URL = 'https://els-clouddev.hankeyinvestments.com/'
      config.RANCHER_BEARERTOKEN = 'token-dwz8m:vlbqpmct5sn2tbzf22t68w6hdrlqg9z9zt9bkp4tn6q274njqk4nlc'
      config.CLUSTER = 'c-m-kl24rgkc'
      config.API = 'packetlifter.io'
    } else {
      config.RANCHER_DIRECT_URL = 'https://els-cybraindev01.hankeyinvestments.com/'
      config.RANCHER_BEARERTOKEN = 'token-rzfxq:hg7wtcs5v5dng7xllx7vm25nrvz9kqrbfp9bzf5448n8995dj8hjkt'
      config.CLUSTER = 'c-m-sdtmhjdg'
      config.API = 'packetlifter.dev'
    }
  }

  return config;
};