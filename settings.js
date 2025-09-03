const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU5lOU12WGZPYys5L0JsSHpFNC9OYnY4WFM1OE1iRUo2aFF5UDFlR2tHOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEVzbUJsbjMvZ0tXVWRZYlRNMm44ejN3SlhodkJGRmNHV2NjSDJ6YWJEST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RWdZSFpDY2R6OE13OG95MGZUamhNVjg0TjlFTWJzSStpaXdZNGVNYm5RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZS2FBRE5GT2JRL3hqSTV6M0k1aXh1Z1U3c3VzNXUydWh1SmYyMVZabEdVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVQdkhoU0JHNjhVM08wcHo5US9FQVhuRmZhZFpwZ0hid3QyS1BjcDEyV2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxaaWxpaUJqUEFqTzNsUWhvaHNsUjJxT2hxcjd6bFY3NTk3dkwzampLQUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0lQNWVtUTNzcFVjSitFbFBVWVBPcDdXdEV6TjFOU1NBc01uNnJWL0luYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVkFSODFwMldlNVE3REl6d3ZZdWNOZHV2cGpVd1E3K2xoZ3VxK0Q5MEUyZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZMeWpFSGNteUYzYThQRUVGUHBTbnVFRW5iY1VlclZjcFNhKzVraTZXYkFlemtjMXVNeGVoTTI1NndOT2xuOTVVNkRpbGJZRnRGa2hwTmtVUHdVOUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM1LCJhZHZTZWNyZXRLZXkiOiJvMXJ1d3g4M2hOWEthcklBdlpRS2FvZDUxd3RQV0ltTnpSUmpHNFBrUHVBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYxMTQyNTQ2OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwREZBNENBNUIxMzM5RDg4NUM0QkU1OUU0QzQ1QzhDNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU2NjQ4OTY2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2MTE0MjU0NjhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjc4NTBFRUYyNDc1NkYwMDVCRjQ3QkIzQzA1RDMxNzAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NjY0ODk3NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNDJSTTdBTjkiLCJtZSI6eyJpZCI6IjI1NTYxMTQyNTQ2ODo0N0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJhbGlzb24iLCJsaWQiOiI4NTE3NTU3NjkwNTQzOjQ3QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlB5MlBVRkVPdXIwY1VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieWNObmJ4T0VpaDFyblFlOVFtOGlCWW5PZ1ZjUUZFVUtJa2gvbmVHYk5ucz0iLCJhY2NvdW50U2lnbmF0dXJlIjoic1kwQU54cDdpUkdOSDRmaVlacWRoYW9ha2VDL2gvRmd6eUxqYndiS0xTU3FwRXZZWFgwRXVJdzVnUkVBTmZycll0d0RhOWdWdWRIMlRFd2pkNFUvRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IjFKamxDdythbnFveC81bXBqZmRXRCtlSWx2b3ZsN2J6T0I3Mnd3RTg2RitOSzQrNHM0OC9xTlJjTUFyQTFnVGFOb0FtcG5xYkNLcFMxejhmS2gwcENBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjExNDI1NDY4OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNuRFoyOFRoSW9kYTUwSHZVSnZJZ1dKem9GWEVCUkZDaUpJZjUzaG16WjcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NjY0ODk1MywibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJRzUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ALISON",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255611425468",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, 
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '2',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    CHAT_BOT: process.env.CHAT_BOT || 'yes',
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
