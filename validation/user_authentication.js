const UsersSchema= require("./../models/users")
const driverSchema= require("./../models/driver")

//Middleware for register validation
exports.validateRegister= async(req, res, next)=> {
    const { name, lname, email, password, confirm_password } = req.body;


    //Check if all fields are filled
    if (
        name === "" || name === null || name === undefined ||
        email === "" || email === null || email === undefined ||
        password === "" || password === null || password === undefined ||
        confirm_password === "" || confirm_password === null || confirm_password === undefined 
    ) {
        return res
            .status(400)
            .json({ message: "All fields are required", status: "error" });
    }

    //check if password and confirm password match
    if (password !== confirm_password) {
        return res.status(400).json({
            message: "Password and confirm password do not match",
            status: "error",
        });
    }

    //Check password length
    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long",
            status: "error",
        });
    }
    //check lname is valid
    const fname_regex = /^[a-zA-Z ]+$/;
    if (!fname_regex.test(name))
        return res.status(400).json({
            message: "Name is not valid, only alphabets and spaces are allowed",
            status: "error",
        });


    //Check if user exists
    const user = await UsersSchema.findOne({ email: req.body.email });
    if (user)
        return res.status(400).json({
            message: "Email already exists",
            status: "error",
        });

    //Check email is valid
    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email_regex.test(email))
        return res.status(400).json({
            message: "Email is not valid",
            status: "error",
        });

    // //Check Username is valid
    // const username_regex = /^[a-zA-Z0-9]+$/;
    // if (!username_regex.test(username))
    //     return res.status(400).json({
    //         message: "Username is not valid, only alphabets and numbers are allowed",
    //         status: "error",
    //     });



    // //Check username is unique
    // const user_exists = await UsersSchema.findOne({ username: username });
    // if (user_exists)
    //     return res.status(400).json({
    //         message: "Username is already taken",
    //         status: "error",
    //     });

    //Check phone is valid
    // const phone_regex = /^[0-9]{10}$/;
    // if (!phone_regex.test(phone))
    //     return res.status(400).json({
    //         message: "Phone is not valid",
    //         status: "error",
    //     });

    //    "" //Check phone is unique
    //     const phone_exists = await UsersSchema.findOne({ phone: phone });
    //     if (phone_exists)
    //         return res.status(400).json({
    //             message: "Phone is already exists",
    //             status: "error",
    //         });""

    next();
}

exports.validateUpdateuser=async(req,res, next)=>{
    if(
        req.body.name === "" || req.body.name === null || req.body.name === undefined 
    ){
        return res
          .status(400)
          .json({ message: "Fill all the required fields", status: "error" });
    }

     //check lname is valid
     const fname_regex = /^[a-zA-Z ]+$/;
     if (!fname_regex.test(req.body.name))
         return res.status(400).json({
             message: "Name is not valid, only alphabets and spaces are allowed",
             status: "error",
         });
         next();
}

//Middleware for register validation
exports.val_driver_reg= async(req, res, next)=> {
    // const { fname, lname, email, password, confirm_password } = req.body;
    const { fname,lname, email, password, confirm_password,phone,city,status } = req.body;



    //Check if all fields are filled
    if (
       fname==null || fname === undefined || fname === " " ||
       lname==null || lname === undefined || lname === " " ||
       email==null || email === undefined || email === " " ||
       password==null || password === undefined || password === " " ||
       confirm_password==null || confirm_password === undefined || confirm_password === " " ||
       phone==null || phone === undefined || phone === " " ||
       city==null || city === undefined || city === " " 
       
    ) {
        return res
            .status(400)
            .json({ message: "All fields are required", status: "error" });
    }

    //check if password and confirm password match
    if (password !== confirm_password) {
        return res.status(400).json({
            message: "Password and confirm password do not match",
            status: "error",
        });
    }

    //Check password length
    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long",
            status: "error",
        });
    }
    //check fname is valid
    const fname_regex = /^[a-zA-Z ]+$/;
    if (!fname_regex.test(fname))
        return res.status(400).json({
            message: "Name is not valid, only alphabets and spaces are allowed",
            status: "error",
        });

          //check lname is valid
    const lname_regex = /^[a-zA-Z ]+$/;
    if (!lname_regex.test(lname))
        return res.status(400).json({
            message: "Name is not valid, only alphabets and spaces are allowed",
            status: "error",
        });


    //Check if user exists
    const user = await driverSchema.findOne({ email: req.body.email });
    if (user)
        return res.status(400).json({
            message: "Email already exists",
            status: "error",
        });

    //Check email is valid
    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email_regex.test(email))
        return res.status(400).json({
            message: "Email is not valid",
            status: "error",
        });

    // //Check Username is valid
    // const username_regex = /^[a-zA-Z0-9]+$/;
    // if (!username_regex.test(username))
    //     return res.status(400).json({
    //         message: "Username is not valid, only alphabets and numbers are allowed",
    //         status: "error",
    //     });



    // //Check username is unique
    // const user_exists = await UsersSchema.findOne({ username: username });
    // if (user_exists)
    //     return res.status(400).json({
    //         message: "Username is already taken",
    //         status: "error",
    //     });

    //Check phone is valid
    // const phone_regex = /^[0-9]{10}$/;
    // if (!phone_regex.test(phone))
    //     return res.status(400).json({
    //         message: "Phone is not valid",
    //         status: "error",
    //     });

    //    "" //Check phone is unique
    //     const phone_exists = await UsersSchema.findOne({ phone: phone });
    //     if (phone_exists)
    //         return res.status(400).json({
    //             message: "Phone is already exists",
    //             status: "error",
    //         });""

    next();
}

exports.validateUpdatedriver=async(req,res, next)=>{
    const { fname,lname, email, password, confirm_password,phone,city,status } = req.body;



    //Check if all fields are filled
    if (
       fname==null || fname === undefined || fname === " " ||
       lname==null || lname === undefined || lname === " " ||
       phone==null || phone === undefined || phone === " " ||
       city==null || city === undefined || city === " " 
       
    ) {
        return res
            .status(400)
            .json({ message: "All fields are required", status: "error" });
    }

     //check lname is valid
     const fname_regex = /^[a-zA-Z ]+$/;
     if (!fname_regex.test(fname))
         return res.status(400).json({
             message: "First name is not valid, only alphabets and spaces are allowed",
             status: "error",
         });

            //check lname is valid
     const lname_regex = /^[a-zA-Z ]+$/;
     if (!lname_regex.test(lname))
         return res.status(400).json({
             message: "Last name is not valid, only alphabets and spaces are allowed",
             status: "error",
         });

         //check if phone is valid
         const phone_regex = /^[0-9]{10}$/;
         if (!phone_regex.test(phone))
         return res.status(400).json({
             message: "Phone is not valid",
             status: "error",
         });

         //check if city is valid
         const city_regex = /^[a-zA-Z ]+$/;
         if (!city_regex.test(city))
         return res.status(400).json({
             message: "City is not valid, only alphabets and spaces are allowed",
             status: "error",
         });
         next();
}