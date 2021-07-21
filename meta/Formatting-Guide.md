## 📎 Formatting Guide

If you want to help reformat the HyAPI, here is a nifty guide on how to reformat!

Don't be scared away by the long list of guidelines, most are obvious and are just there to prevent unnecessary errors.

Even the small gamemodes count :)

<details>
<summary>Reformatting Status</summary>

### 🟥 To Do

-   Skywars
    <details>
    <summary>Sub-modes</summary>

    -   Solo
        -               Normal
        -   Insane
    -   Doubles
        -   Normal
        -   Insane
    -   Ranked
    -   Mega
    -   Laboratory
        -               This one has more sub-modes but I dont know all of them
        -   Hunters vs Beast
        -   TnT Madness
        -   Slime knockout
        -   Lucky Blocks

    </details>

-   Arcade
    <details>
    <summary>Sub-modes</summary>

    -   Zombies
    -   Hide and Seek
    -   Capture the Wool
    -   Hole in the Wall
    -   The Blocking Dead
    -   Farm Hunt
    -   Creeper Attack
    -   Party Games
    -   Hypixel says
    -   Pixel Painters
    -   Football
    -   Mini Walls
    -   Bounty Hunters
    -   Ender Spleef
    -   Galaxy Wars
    -   Dragon Wars

    </details>

-   TNT Games
    <details>
    <summary>Sub-modes</summary>

    -   Bow Spleef
    -   PVP Run
    -   TNT Run
    -   TNT Tag
    -   Wizards

    </details>

-   Classic Games
    <details>
    <summary>Sub-modes</summary>

    -   VampireZ
    -   TKR
    -   Paintball
    -   Arena Brawl
    -   Quakecraft
    -   The Walls

    </details>

-   UHC
    <details>
    <summary>Sub-modes</summary>

    -   Speed UHC
        -               Solo Normal
        -   Teams Normal
    -   Solo
    -   Teams of 3

    </details>

-   Cops and Crims
    <details>
    <summary>Sub-modes</summary>

    -   Defusal
    -   Challenge Mode
    -   Team Deathmatch

    </details>

-   Housing?
-   The Pit
-   Blitz SG
    <details>
    <summary>Sub-modes</summary>

    -   Solo Normal
    -   Teams Normal

    </details>

-   Mega Walls
    <details>
    <summary>Sub-modes</summary>

    -   Face Off
    -   Standard
    -   Challenge

    </details>

-   Smash Heroes
    <details>
    <summary>Sub-modes</summary>

    -   Solo (1v1v1v1)
    -   Teams (2v2)
    -   Teams (2v2v2)
    -   Friends?
    -   Solo (1v1)

    </details>

-   Warlords
    <details>
    <summary>Sub-modes</summary>

    -   Capture the Flag
    -   Domination
    -   Team Deathmatch

    </details>

-   Skyblock may be added in a later version because of the insane amount of reformatting needed.

### 🟡 In progress

-   Murder Mystery
-   Duels

### 🟢 Done!

-   Bedwars
-   Build Battle

</details>

---

Before reformatting, make sure the gamemode you are planning on reformatting isn't already in progress or done.\
Please also notify me when you are planning on reformatting by starting a new discussion [here](https://github.com/MauritsWilke/HyAPI/discussions/categories/reformatting-notice) with the gamemode you are planning on reformatting.

1. Make sure you have an API key for the Hypixel API. You can get this by going to `mc.hypixel.net` and running `/api new`

<br>

2. Go to the lobby of the gamemode you want to reformat the data for and get the number one player from the all-time leaderboards.

<br>

3. Open the link

```http
	https://api.hypixel.net/player?name=<name>&key=<key>
```

<br>

4.  To make life easier, use ctrl+f or a built in search page shortcut and search for `stats`

<br>

5.  The reformatted data is going to be a Javascript Object so reformatting must be done in a `.json` file

<br>

6.  Now for the actual reformatting, here are some guidelines:<br>

    -   What data is unnecessary is subjective, but for most it shouldn't be that hard to spot. The Hypixel API includes a _lot_ of data so my tip would be to copy it all into a document and reformat by deletion.

        -   ✅ Include
            -   Wins
            -   Kills
            -   Losses
            -   Coins
        -   `Enabled` cosmetics (Current death message etc)
        -   ❌ Don't include
            -   Types of kills (magicKills, poisonKills)
            -   Types of deaths (suffocation, drowning)
            -   All owned cosmetics (including a count is allowed)
            -   Selected preferences

    -   Please use the entire path to the statistics instead of just the statistics themselves
        <details>
        <summary>Example</summary>

        ✅ **Do**

        ```js
        {
            experience: player.stats.Bedwars.Experience;
        }
        ```

        ❌ **Don't**

        ```js
        {
            experience: Experience;
        }
        ```

        </details>

    -   Statistics not linked to a sub-mode of a gamemode must be put on top of the object:
        <details>
        <summary>Example</summary>

        ✅ **Do**

        ```js
        	{
        		experience: player.stats.Bedwars.Experience,
        		coins: player.stats.Bedwars.coins
        	}
        ```

        ❌ **Don't**

        ```js
        	{
        		overall: {
        			experience: player.stats.Bedwars.Experience,
        			coins: player.stats.Bedwars.coins
        		}
        	}
        ```

        </details>

    -   If a gamemode has multiple categories, sort them in those:
        <details>
        <summary>Example</summary>

        ✅ **Do**

        ```js
        	{
        		experience: player.stats.Bedwars.Experience,
        		coins: player.stats.Bedwars.coins,
        		overall: {
        			wins: player.stats.Bedwars.wins_bedwars,
        			losses: player.stats.Bedwars.losses_bedwars
        		}
        		solo: {
        			wins: player.stats.Bedwars.eight_one_wins_bedwars,
        			losses: player.stats.Bedwars.eight_one_losses_bedwars
        		}
        	}
        ```

        ❌ **Don't**

        ```js
        	{
        		experience: player.stats.Bedwars.Experience,
        		coins: player.stats.Bedwars.coins,
        		overallWins: player.stats.Bedwars.wins_bedwars,
        		overallLosses: player.stats.Bedwars.losses_bedwars
        		soloWins: player.stats.Bedwars.eight_one_wins_bedwars,
        		soloLosses: player.stats.Bedwars.eight_one_losses_bedwars
        	}
        ```

        </details>

    -   Please do not add the following even though they are in the reformatted API (I do these myself whilst checking the reformatted data):

        -   Ratios
        -   Averages
        -   Functions (I.E. a function that calculates the level)
        -   To add these please type `undefined` with a comment saying `function that returns said value`
        <details>
        <summary>Example</summary>

        ✅ **Do**

        ```js
        	{
        		star: undefined, // Function that returns the player's star
        		experience: player.stats.Bedwars.Experience,
        		coins: player.stats.Bedwars.coins,
        		overall: {
        			wins: player.stats.Bedwars.wins_bedwars,
        			losses: player.stats.Bedwars.losses_bedwars
        		}
        		solo: {
        			wins: player.stats.Bedwars.eight_one_wins_bedwars,
        			losses: player.stats.Bedwars.eight_one_losses_bedwars
        		}
        	}
        ```

        ❌ **Don't**

        ```js
        	{
        		star: myAmazingCalculationForBedwarsStar(21),
        		experience: player.stats.Bedwars.Experience,
        		coins: player.stats.Bedwars.coins,
        		overallWins: player.stats.Bedwars.wins_bedwars,
        		overallLosses: player.stats.Bedwars.losses_bedwars
        		soloWins: player.stats.Bedwars.eight_one_wins_bedwars,
        		soloLosses: player.stats.Bedwars.eight_one_losses_bedwars,
        		soloRatios: {
        			FKDR: 10 * 2 // amazing maths,
        		}
        	}

        	function myAmazingCalculationForBedwarsStar(star){
        		return star / 100
        		// trust me works
        	}
        ```

        </details>

    -   **Quick naming lesson:**

        -   Every value shall be `lowercase`
        -   Exception is only when multiple words are in play
            -   ✅ Do
                -   star
                -   finalKills
                -   wins
            -   ❌ Don't
                -   Star
                -   sTAR
                -   finalkills
        -   Refrain from abbreviations
            -   ✅ Do
                -   winstreak
                -   finalKills
            -   ❌ Don't
                -   ws
                -   fks
        -   Keep names simple and don't change simple names

            -   ✅ Do
                -   finalKills
                -   winstreak
                -   kills
            -   ❌ Don't
                -   playerFinalKillsBedwarsSolo
                -   epicWinstreak
                -   poggerKills

        -   If you want to really make it perfect:
            -   Put objects and arrays on the bottom
            -   Sort them on alphabetical order

    </br>

## 📨 Submitting data

You can submit data by creating a [gist](https://gist.github.com/) and copy pasting the reformatted data in there!
After creating and saving your gist, create a new issue with in the title `#Formatting` and include a link to your gist in the body. By doing so I can easily find it in between the loads of bugs that need fixing 😓

Thanks in advance, \
@MauritsWilke
