const { loginHandler,signUpHandler } = require(`../controller/UserController`)
const express = require(`express`)
const router = express.Router();

router.post('/login', loginHandler);
router.post('/signup', signUpHandler);
router.get("/",(req,res)=>{
    console.log("hello")
    res.send("Hello World")
})

module.exports = router;