const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU5vODRENnJkZnFsNXFHWnB1Sy93b1pWOGxRVnJKWVdRWDlRUnMyc05IQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWtnQXJVWk9HMEtqd3h2aytXVTE3MWNFQU82NkdFZlNSTXZtdFpxNFpDTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TnM1VzJMc1FhZ3RjYVhtVFNrYkd1cHVNTCtLbklpWXdqU1Nvc2J2eG1JPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxMnVKRk9mZVpLZTNyZ2lEd0ZUSThjYk44TnhnTGZjWFB2Z3c2eTlnQ0djPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFBN2RMR3lueVFkd2ZoYW1Nb05GbmdrMitTMHhrK1EwQ05zYkt2OGswMFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdNUnZCeTlhOXBIclRzNG5iSkJXTFB1bHlKUGt6Qm9ocVpZNkVENk81Z0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0l4TTVKc3hHVE9sbUVyTWExQzBQWVh3ZWdVdFBRVDVoWDVxelRmRVFuTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejdkRXJwclo4OXdSM3gyWlJkT1Frd25BcjQ2WjFNMDdPVTcwVkFHbnh5bz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijg2UG1uS0grSFErL2xRQk92dm1JMTRpdWhycUdlSjY3TWhpY2xybDB4bTlGd0JUSXc3eEpCTjNDZW1BbUIxL29QUXBwa2ZDaTNmRHlPUGU4SExZRGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAzLCJhZHZTZWNyZXRLZXkiOiJrV01BbzMzeHp6ZUFENjNIL1BKZUljK1hMTlZqNnVtTWxwNCtaSGFpZzlNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJbWlScTZZOVQ0NmIyaEotMjVFQVdnIiwicGhvbmVJZCI6IjA0Nzg0YWRkLTJjNWYtNDRmNi05Y2M3LWY1Y2IwOTcwNDkyYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQlIxZWMrYnlPNmZSMEQ5ZFdnKy8vZ2g1blU9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklvYjBscU5IZFFnemFDSG5GNUdtaDV0T1FYRT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09HRWhhQURFTmpkODhBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InE3TXdha3JobXVYTDhZTWw2UUtDL2p6UUdCbWJiRW1VQTVLR1ljc0VubVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im54ZkcwRzhEWndPYWpWd29rQVh4dkk0cDlDdTJSa2ZRSlpmaVc5UGE5UkNhbFB6OVh4RkV6Zmo2ZUFIb0VYTDE0ZkxPczVlMXRrN3Yvc3JsM0o5dkJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ5KzZVM0NQcmNRS0tqK1owVlpmN08wZ2lOT2FxV00yR3hRWitya0hJeGJjRTZoODE0UW5IYzREdDhjVWE2M2h4TkNJbUF6OXdNc1dIRFNYeUpDOFhnQT09In0sIm1lIjp7ImlkIjoiMjM0NzA1MjQxNDc3OTo3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkRyZXkgSnIuIiwibGlkIjoiMTcxNDg1Nzk2Nzk4NzE3OjdAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNTI0MTQ3Nzk6N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhdXpNR3BLNFpybHkvR0RKZWtDZ3Y0ODBCZ1ptMnhKbEFPU2htSExCSjVsIn19XSwicGxhdGZvcm0iOiJzbWJpIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDY3MjY2MjksImxhc3RQcm9wSGFzaCI6IjJHNEFtdSJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
