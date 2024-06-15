# TRIDENT

## Building and running locally
- Run `yarn install`
- Create a `.env.local` and add `API={your_rancher_server_api}` on to the file OR Run `API={your_rancher_server_api} yarn dev`
- If you preferred creating `.env.local` file, then you should be able to run it the application using `yarn dev`
- Open a web browser to `https://localhost:8005` or `https://127.0.0.1:8005`


## Publishing Package Manually
command
- yarn publish-pkgs -s `{github_username}/{repository}` -b `{branch}` -f

- `-s` - <repo>
- `-b` - <branch>
- `-f` - force build charts

- refer here `https://extensions.rancher.io/extensions/publishing`



