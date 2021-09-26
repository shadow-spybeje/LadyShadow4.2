module.exports = {
    "$cmd_usage": "I'm sorry but that command requires other paramaters...\n  Please try ",


    "$cmd_ping_name": "ping",
    "$cmd_ping_desc": "",

    "$cmd_ping_Pinging": "Pinging...",
    "$cmd_ping_Pong": "Pong!",
    "$cmd_ping_Client": "Client",
    "$cmd_ping_API": "API",


    // ====== ==== ======\\
    // === MODERATION ===\\
    // ====== ==== ======\\

    // ====== KICK ====== \\
    "$cmd_kick_name": "kick",
    "$cmd_kick_desc": "",
    "$cmd_kick_usage": "<@user|userID> [reason]",

    "$cmd_kick_kick-succ": "Alright I've kicked the pest.",
    "$cmd_kick_kick-fail": "I couldn't kick them!! *(Lacking Permissions)*\nRight click on this mentioned name and select `Kick Member`!\n-->",//{@user}

    "$cmd_kick_ban-succ": "Alright, I've banned ",//{username}
    "$cmd_kick_ban-fail": "I couldn't ban them!! *(Lacking Permissions)*\nRight click on this mentioned name and select `Ban Member`!\n-->",//{@user}
    "$cmd_kick_ban-no": "❎\n  Uhm... Okay then...",

    "$cmd_kick_noMember": "Please mention a user or give me their ID.",
    "$cmd_kick_noMemberFound": "isn't on this server...",
    "$cmd_kick_noMemberFound-ban": "isn't on this server...\nDid you mean to ban them?",
    "$cmd_kick_noPerms-Author": "What are you trying to do??\nI will not kick someone for you...",
    "$cmd_kick_noPerms-Client": "I cannot kick people on this server!\nRight click on this mentioned name and select the red `Kick ",//{username}


    // ====== BAN ====== \\

    "$cmd_ban_name": "ban",
    "$cmd_ban_desc": "",
    "$cmd_ban_usage": "<@user|userID> [reason]",


    "$cmd_ban_noMember": "Please mention a user or give me their ID.",
    "$cmd_ban_notBannable": "I cannot ban this user...\n  They are either the Owner or have a role equal or greater than my highest..",
    "$cmd_ban_noPerms-Author": "What are you trying to do??\nI will not ban someone for you...",
    "$cmd_ban_noPerms-Client": "I cannot ban people on this server!\nRight click on this mentioned name and select the red `Ban ",//{username}
    "$cmd_ban_ban-succ-r": "Alright, I've banned {@user}\n  Reason: {reason}",
    "$cmd_ban_ban-succ": "Alright, I've banned {@user}",
    "$cmd_ban_reason-x": "Banned by: {author} ({authorID}) -- No reason specified.",
    "$cmd_ban_reason": "Banned by: {author} ({authorID}) -- Reason: {reason}",
    "$cmd_ban_ban-fail": "I was unable to ban {@user}!\nReason: {err}",
};
