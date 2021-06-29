# HyAPI

HyAPI is a reformatted version of the Hypixel API.

## 🌐 API Reference

The base URL for all requests is

```http
  https://hyapi.tech/
```

#### Examples

```http
  GET /player
```

Requires either **uuid** or **name**
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `uuid` | `string` | The uudi of the requested player |
| `name` | `string` | The username of the requested player |

Using name **won't** prevent you from making further requests \
unlike the Hypixel Api

## ❓ FAQ

#### Why isn't `path.color` working?

I used British English troughout the entire API. \
This means words as `color` will be `colour` and `soccer` will be `football`

<details>
<summary>Dictionary</summary>

| American | British    |
| :------- | :--------- |
| `color`  | `colour`   |
| `soccer` | `football` |

</details>

## ℹ Project Information

**Server:** NodeJS with ExpressJS \
 **Host:** DigitalOcean

## 💻 Developer

- [@MauritsWilke](https://www.github.com/MauritsWilke)
