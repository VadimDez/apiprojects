API projects
===

## Available API

* [/api/timestamp](#apitimestamp)
* [/api/info](#apiinfo)
* [/api/short](#apishort)

### /api/timestamp

Returns JSON with both unix and natural dates calculated from passed date parameter (Unix, String)

#### Examples

###### using unix timestamp ("1451567966971")

```
GET "/api/timestamp/1451567966971"
```

JSON response:

```
{"unix":1451567966971,"natural":"December 31, 2015"}
```

###### using string ("December 31, 2015")

```
GET "http://localhost:9000/api/timestamp/December%2031,%202015"
```

JSON response:

```
{"unix":1451516400000,"natural":"December 31, 2015"}
```

### /api/info

Returns information about you as a JSON (IP, language, software)
 
#### Example

```
GET "/api/info"
```

will return JSON

```
{"ipaddress":"127.0.0.1","language":"en-us","software":"Macintosh; Intel Mac OS X 10_11_2"}
```

### /api/short

Creates shorter link for passed link. By using shorter link you will be redirected then to passed url.

#### Example

###### using https://google.com

```
GET "/api/short/https://google.com"
```

will return JSON

```
{"original_url":"https://google.com","short_url":"http://apiprojects.herokuapp.com/short/29"}
```

By using "short_url" you will be redirected to "original_url"