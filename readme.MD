# HyAPI

HyAPI is a better version of the Hypixel API. \
This API was made to make getting data from the Hypixel API easier and better.

## 💡 List of features

This API has several features that make it better than the Hypixel API 👇

### **Faster**

HyAPI is faster than the Hypixel API because we cache data and return a smaller amount of data allowing for responses upto 20 times as fast!

### **Easier**

HyAPI is easier to use than the Hypixel API because we process the data for you. \
Examples of this are things like:

<ul>
	<li> Player Rank
	<li> Network Level
	<li> 
	<details>
	<summary>Ratios</summary>
		<ul>
			<li> Win Lose Ratio
			<li> Final Kill Death Ratio
			<li> Kill Death Ratio
		</ul>
	</details>
	<li> 
	<details>
	<summary>Averages</summary>
		<ul>
			<li> Average Kills per Game
			<li> Average Deaths per Game
			<li> Average XP per Game
		</ul>
	</details>
	<li> 
	<details>
	<summary>Formatting</summary>
		The API automatically removes formatting of things like <b>Pet Name Colour</b> and stores it in an extra variable for ease of access
	</details>
</ul>

### **No unnecessary things**

The Hypixel API gives a lot of unnecessary data that the average request doesn't need and just clutters response data.

<details>
	<summary>Examples</summary>
		<ul>
			<li> levelingRewards
			<li> The 20 different ways of killing and dying
			<li> Overdetailed Quests data
		</ul>
</details> ​

### **Specific requests**

The HyAPI returns just the data you want by using different paths for specific requests. \
This allows requests to be made more specific and deliver data faster!

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
