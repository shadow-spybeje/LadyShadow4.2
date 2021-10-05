module.exports = {
    "$cmd_usage": "I'm sorry but that command requires other paramaters...\n  Please try ",

    //in the '${cmd_%%_usage}' field, using '{cmdName}' will replace with the commands name.
    // example: name = 'testCMD'; usage = 'this is a test command for {cmdName}';
    // output: 'this is a test command for testCMD'


    // ====== ===== ======\\
    // ===== GENERAL =====\\
    // ====== ===== ======\\

    // ====== PING ====== \\
    "$cmd_ping_name": "ping",
    "$cmd_ping_desc": "",

    "$cmd_ping_Pinging": "Pinging...",
    "$cmd_ping_Pong": "Pong!",
    "$cmd_ping_Client": "Client",
    "$cmd_ping_API": "API",


    // ====== TODO ====== \\

    "$cmd_todo_name": "todo",
    "$cmd_todo_desc": "Shadow save's your todo lists for you as you let her know what you need to do!",
    "$cmd_todo_usage": `<+|-> <todo message> || {cmdName} list`,

    //TODO Args (Phrases required to run commands/subcommands.)
    "$cmd_todo_args_list": "list", //Show the todos
    "$cmd_todo_args_add": "+;add",  //Add to the todo's
    "$cmd_todo_args_del": "-;del;delete;remove",  //Delete the todo's

    "$cmd_todo_invalid_usage": `Invalid Usage. Please try one of the following:\n`+
      "  `{prefix}{cmdName} {$cmd_todo_args_list}\n`"+
      "  `{prefix}{cmdName} + <ToDo message>\n`"+
      "  `{prefix}{cmdName} - <ToDo #>`",

    //TODO - List Messages
    "$cmd_todo_noToDos": "You don't have any toDo's yet! Try creating one with:\n"+
      "`{prefix}{cmdName} + <ToDo message>`",

    //TODO - Add messages
    "$cmd_todo_invalid_usage-add": "Invalid Usage.\nPlease try: `{prefix}{cmdName} + <ToDo message>`\n"+
      "  Example: `{prefix}{cmdName} + Create my first to do!`",

    //TODO - Del messages
    "$cmd_todo_invalid_usage-del": "Invalid Usage.\nPlease try: `{prefix}{cmdName} - <ToDo #>`\n"+
      "  Example: `{prefix}{cmdName} - 1`",


    // ====== ==== ======\\
    // === MODERATION ===\\
    // ====== ==== ======\\

    // ====== KICK ====== \\
    "$cmd_kick_name": "kick",
    "$cmd_kick_desc": "",
    "$cmd_kick_usage": "<@user|userID> [reason]",

    "$cmd_kick_kick-succ": "Alright I've kicked the pest.",
    "$cmd_kick_kick-fail": "I couldn't kick them!! *(Lacking Permissions)*\n"+
      "Right click on this mentioned name and select `Kick Member`!\n-->",//{@user}

    "$cmd_kick_ban-succ": "Alright, I've banned ",//{username}
    "$cmd_kick_ban-fail": "I couldn't ban them!! *(Lacking Permissions)*\n"+
      "Right click on this mentioned name and select `Ban Member`!\n-->",//{@user}
    "$cmd_kick_ban-no": "❎\n  Uhm... Okay then...",

    "$cmd_kick_noMember": "Please mention a user or give me their ID.",
    "$cmd_kick_noMemberFound": "isn't on this server...",
    "$cmd_kick_noMemberFound-ban": "isn't on this server...\nDid you mean to ban them?",
    "$cmd_kick_noPerms-Author": "What are you trying to do??\nI will not kick someone for you...",
    "$cmd_kick_noPerms-Client": "I cannot kick people on this server!\n"+
      "Right click on this mentioned name and select the red `Kick ",//{username}


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
