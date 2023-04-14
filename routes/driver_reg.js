const express = require("express");
const router = express.Router();
const driverSchema = require("./../models/driver");
const bcrypt = require("bcryptjs");
const {val_driver_reg, validateUpdatedriver}= require("./../validation/user_authentication")


//create users
router.post("/", val_driver_reg, async(req, res) => { 
    const { fname,lname, email, password, confirm_password,phone,city,status } = req.body;

    // //generate random userid
    // const userid =
    //     Math.random().toString(36).substring(2, 15) +
    //     Math.random().toString(36).substring(2, 15);

    //Hash password
    const hashed_password = await bcrypt.hash(password, 10);
    const hashed_confirm_password = await bcrypt.hash(confirm_password, 10);

    //Save user to database
    const save_user = new UsersSchema({
        fname,
        lname,
        email,
        password: hashed_password,
        confirm_password:hashed_confirm_password,
        phone,
        city
    });
    try {
        await save_user.save();
        res.status(200).json({
            message: "Driver created successfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message, status: "error" });
    }
});

//get users
router.get("/", async(req, res) => {
    const user = await UsersSchema.find();

    res.json({
        message: "user details",
        data: user
    });
});

//get single user
router.get("/:id", async(req, res) => {
    const user = await driverSchema.findById(req.params.id);
    try {
        res.status(200).json({
            message: "Single user",
            user
        });
    } catch (error) {
        res.status(400).json({ message: error.message, status: "error" });
    }
});

//update user
router.put("/:id", validateUpdatedriver, async(req, res) => {
    try {
        const user = await driverSchema.findByIdAndUpdate(req.params.id, {
            fname: req.body.fname,
            lname: req.body.lname,
            phone: req.body.phone,
            city: req.body.city
        });
        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        res.status(400).json({ message: error.message, status: "error" });
    }
});

//update driver status
router.put("/update-status/:id",async(req, res)=>{
    try {
        const status = await driverSchema.findByIdAndUpdate(req.params.id, {
            status: 'approved'
        });
        res.status(200).json({
            message: "status updated successfully",
            status
        });
    } catch (error) {
        res.status(400).json({ message: error.message, status: "error" });
    }
})

//delete user
router.delete("/:id", async(req, res) => {
    const user = await UsersSchema.findByIdAndDelete(req.params.id);
    try {
        res.status(200).json({
            message: "User deleted successfully",
            user
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message, status: "error", message: "User not found" });
    }
});


// async function validateUpdateuser(req,res, next){
//     if(
//         req.body.name === "" || req.body.name === null || req.body.name === undefined 
//     ){
//         return res
//           .status(400)
//           .json({ message: "Fill all the required fields", status: "error" });
//     }

//      //check lname is valid
//      const fname_regex = /^[a-zA-Z ]+$/;
//      if (!fname_regex.test(req.body.name))
//          return res.status(400).json({
//              message: "Name is not valid, only alphabets and spaces are allowed",
//              status: "error",
//          });
//          next();
// }


//Middleware for register validation
// async function validateRegister(req, res, next) {
//     const { name, lname, email, password, confirm_password } = req.body;


//     //Check if all fields are filled
//     if (
//         name === "" || name === null || name === undefined ||
//         email === "" || email === null || email === undefined ||
//         password === "" || password === null || password === undefined ||
//         confirm_password === "" || confirm_password === null || confirm_password === undefined 
//     ) {
//         return res
//             .status(400)
//             .json({ message: "All fields are required", status: "error" });
//     }

//     //check if password and confirm password match
//     if (password !== confirm_password) {
//         return res.status(400).json({
//             message: "Password and confirm password do not match",
//             status: "error",
//         });
//     }

//     //Check password length
//     if (password.length < 6) {
//         return res.status(400).json({
//             message: "Password must be at least 6 characters long",
//             status: "error",
//         });
//     }
//     //check lname is valid
//     const fname_regex = /^[a-zA-Z ]+$/;
//     if (!fname_regex.test(name))
//         return res.status(400).json({
//             message: "Name is not valid, only alphabets and spaces are allowed",
//             status: "error",
//         });


//     //Check if user exists
//     const user = await UsersSchema.findOne({ email: req.body.email });
//     if (user)
//         return res.status(400).json({
//             message: "Email already exists",
//             status: "error",
//         });

//     //Check email is valid
//     const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (!email_regex.test(email))
//         return res.status(400).json({
//             message: "Email is not valid",
//             status: "error",
//         });

//     // //Check Username is valid
//     // const username_regex = /^[a-zA-Z0-9]+$/;
//     // if (!username_regex.test(username))
//     //     return res.status(400).json({
//     //         message: "Username is not valid, only alphabets and numbers are allowed",
//     //         status: "error",
//     //     });



//     // //Check username is unique
//     // const user_exists = await UsersSchema.findOne({ username: username });
//     // if (user_exists)
//     //     return res.status(400).json({
//     //         message: "Username is already taken",
//     //         status: "error",
//     //     });

//     //Check phone is valid
//     // const phone_regex = /^[0-9]{10}$/;
//     // if (!phone_regex.test(phone))
//     //     return res.status(400).json({
//     //         message: "Phone is not valid",
//     //         status: "error",
//     //     });

//     //    "" //Check phone is unique
//     //     const phone_exists = await UsersSchema.findOne({ phone: phone });
//     //     if (phone_exists)
//     //         return res.status(400).json({
//     //             message: "Phone is already exists",
//     //             status: "error",
//     //         });""

//     next();
// }

module.exports = router;