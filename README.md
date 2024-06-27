# TRIDENT

## Building and running locally
- Run `yarn install`
- Create a `.env.local` and add `API={your_rancher_server_api}` on to the file OR Run `API={your_rancher_server_api} yarn dev`
- If you preferred creating `.env.local` file, then you should be able to run it the application using `yarn dev`
- Open a web browser to `https://localhost:8005` or `https://127.0.0.1:8005`


## Publishing Package Manually
command
- yarn publish-pkgs -s `{github_username}/{repository}` -b `{branch}` -f

- `-s` - {repo}
- `-b` - {branch}
- `-f` - force build charts

- refer here `https://extensions.rancher.io/extensions/publishing`

- after doing this, copy the `index.yaml` from `assets/index.yaml` and paste it to root `index.yaml`
- this ensures that the latest version shows up as available installable / upgradable version of package.

### GITHUB
```
yarn publish-pkgs -s nowcom-johnperez/trident-latest -b main -f
```

### GITLAB (THIS IS NOT WORKING)
```
yarn publish-pkgs -s nowcom/infrard/trident-extension-package -b main -f
```
- go to charts > trident > version > cr.yaml
- change raw.githubusercontent.com -> gitlab.com