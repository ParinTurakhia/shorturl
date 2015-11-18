# URL Shortner

Node Api which accpets long URL and returns a hash, which can be used to redirect to long URL. It has 2 routes :
* makeshort : To create hash for a long URL
* makelong : Accepts hash and redirects to acutal URL

### Tech stack
 * App : Nodejs
* Data Store : Redis

### Version
0.0.1

### API details
```sh
[domain]/makeshort/?vl=[URL]
```

```sh
[domain]/makelong/?ky=[Hash retured]&df=[Default URL]
```
