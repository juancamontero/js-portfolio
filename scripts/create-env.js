const fs = require("fs"); //para trabajar con el SO

fs.writeFileSync("./.env", `API=${process.env.API}\n`);
