const expr = require('express');
const router = expr.Router();

router.get('/hi', async (req: any, res: { send: (arg0: string) => void; }) => {
    console.log("f")
    res.send("dsds");
});

module.exports = router; 
