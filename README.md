# Discord Bot Command Deployer

This project is a command deployer for a Discord bot using the `discord.js` library. It allows users to check the 
local weather information, send text messages and emails, and
stream music remotely.

## Technologies

- Node.js
- Discord.js library
- Public APIs (IP Geolocation, OpenWeather, etc.)

## Demo

Here are some examples of what the bot can do:

### Weather Information
- **Command:** `/weather [location]`
- **Description:** Fetches and displays the current weather information for the specified location. If no location 
  is provided, the bot will display the weather information for the current location.
- **Example Command:**
    ```sh
    /weather Salt Lake City
    ```
- **Answer:**
  ```
  In Salt Lake City, US, it's currently 75.45°F with smoke. It feels like 74.1°F. Humidity is at 30%.
  ```

### Send Text Message
- **Command:** `/text <phone_number>`
- **Description:** Sends a text message to the specified T-mobile phone number.
- **Example:**
    ```sh
    /text +1234567890
    ```

### Send Email
- **Command:** `/email <email_address>`
- **Description:** Sends an email to the specified email address.
- **Example:**
    ```sh
    /email example@example.com
    ```
  
## Project Structure
```
discord-bot/
├── commands/
│   ├── dadjoke.js
│   ├── die.js
│   ├── email.js
│   ├── help.js
│   ├── lorem.js
│   ├── music.js
│   ├── text.js
│   └── weather.js
├── client.js
├── deploy-commands.js
├── index.js
└── README.md
```