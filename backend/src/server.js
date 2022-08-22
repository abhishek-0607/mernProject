const app = require("./app");
const connect = require("./configs/db");






app.listen(8080, async () => {
    try {
        await connect()
        console.log(`Listening to PORT 8080`)
    } catch (err) {
        console.log(err);
    }
})