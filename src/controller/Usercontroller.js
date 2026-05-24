// import jwt from 'jsonwebtoken';

// import Yousra from '../model/UserModel.js';


// const user1 = async (req, res) => {
//     console.log('req body', req.body)
//     try {
//         const abcd = new Yousra(req.body);
//         const data = await abcd.save();
//         console.log(data);

//         res.json({
//             status: true,
//             message: 'User Added Successfully',
//             user: data,
//         })
//     } catch (error) {
//         console.log("error user1 page-->", error);

//         res.json({
//             status: false,
//             message: error.message,
//         })
//     }
// }

// const user2 = async (req, res) => {
//     try {
//         const users = await Yousra.find();

//         res.json({
//             status: true,
//             users: users
//         });

//     } catch (error) {
//         res.json({
//             status: false,
//             message: error.message
//         });
//     }
// };


// const user3 = async (req, res) => {
//     try {
//         const user = await Yousra.findById(req.params.id);
//         res.json({
//             status: true,
//             message: 'User get Successfully',
//             user: user
//         });

//     } catch (error) {
//         res.json({
//             status: false,
//             message: error.message
//         });
//     }
// }

// const user4 = async (req, res) => {
//     try {
//         const updatedUser = await Yousra.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );

//         res.json({
//             status: true,
//             message: "User Updated Successfully",
//             user: updatedUser
//         });

//     } catch (error) {
//         res.json({
//             status: false,
//             message: error.message
//         });
//     }
// }

// const user5 = async (req, res) => {
//     try {
//         await Yousra.findByIdAndDelete(req.params.id);

//         res.json({
//             status: true,
//             message: "User Deleted Successfully"
//         });

//     } catch (error) {
//         res.json({
//             status: false,
//             message: error.message
//         });
//     }
// }



// const loginUser = async (req, res) => {

//     try {

//         const { email, password } = req.body;

//         // find user
//         const user = await Yousra.findOne({ email });

//         if (!user) {
//             return res.json({
//                 status: false,
//                 message: "Email not found"
//             });
//         }

//         // password check
//         if (user.password !== password) {
//             return res.json({
//                 status: false,
//                 message: "Incorrect Password"
//             });
//         }

//         // create token
//         const token = jwt.sign(

//             {
//                 id: user._id,
//                 email: user.email,
//                 role: user.role
//             },

//             process.env.JWT_SECRET,

//             {
//                 expiresIn: "1h"
//             }

//         );

//         res.json({
//             status: true,
//             message: "Login Successfully",
//             token,
//             user
//         });

//     } catch (error) {

//         res.json({
//             status: false,
//             message: error.message
//         });

//     }


// };

// export { user1, user2, user3, user4, user5, loginUser }








import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Yousra from '../model/UserModel.js';


// ================= USER REGISTER =================

const user1 = async (req, res) => {

    console.log('req body', req.body);

    try {

        const { name, email, password, role } = req.body;

        // check email already exists
        const existingUser = await Yousra.findOne({ email });

        if (existingUser) {
            return res.json({
                status: false,
                message: "Email already exists"
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const abcd = new Yousra({
            name,
            email,
            password: hashedPassword,
            role
        });

        const data = await abcd.save();

        console.log(data);

        res.json({
            status: true,
            message: 'User Added Successfully',
            user: data,
        });

    } catch (error) {

        console.log("error user1 page-->", error);

        res.json({
            status: false,
            message: error.message,
        });

    }
};


// ================= GET ALL USERS =================

const user2 = async (req, res) => {

    try {

        const users = await Yousra.find();

        res.json({
            status: true,
            meassage: " All Users Successfully",
            users: users
        });

    } catch (error) {

        res.json({
            status: false,
            message: error.message
        });

    }
};


// ================= GET SINGLE USER =================

const user3 = async (req, res) => {

    try {

        const user = await Yousra.findById(req.params.id);

        res.json({
            status: true,
            message: 'User get Successfully',
            user: user
        });

    } catch (error) {

        res.json({
            status: false,
            message: error.message
        });

    }
};


// ================= UPDATE USER =================

const user4 = async (req, res) => {

    try {

        const updatedUser = await Yousra.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            status: true,
            message: "User Updated Successfully",
            user: updatedUser
        });

    } catch (error) {

        res.json({
            status: false,
            message: error.message
        });

    }
};


// ================= DELETE USER =================

const user5 = async (req, res) => {

    try {

        await Yousra.findByIdAndDelete(req.params.id);

        res.json({
            status: true,
            message: "User Deleted Successfully"
        });

    } catch (error) {

        res.json({
            status: false,
            message: error.message
        });

    }
};



// ================= LOGIN USER =================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // FIND USER
        const user = await Yousra.findOne({ email });

        if (!user) {

            return res.json({
                status: false,
                message: "Email not found"
            });

        }

        // COMPARE PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.json({
                status: false,
                message: "Incorrect Password"
            });

        }

        // CREATE TOKEN
        const token = jwt.sign(

            {
                id: user._id,
                email: user.email,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }

        );

        // res.json({
        //     status: true,
        //     message: "Login Successfully",
        //     token,
        //     user
        // });

        // SAVE TOKEN IN COOKIE
        res.cookie("token", token, {

            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000

        });

        res.json({

            status: true,
            message: "Login Successfully",
            token,
            user

        });

    } catch (error) {

        res.json({
            status: false,
            message: error.message
        });

    }

};

const logoutUser = async (req, res) => {

    try {

        // COOKIE CLEAR
        res.clearCookie("token");

        res.json({

            status: true,
            message: "Logout User Successfully"

        });

    } catch (error) {

        res.json({

            status: false,
            message: error.message

        });

    }

};

const UserProfile = async (req, res) => {
    console.log(req.user);
    try {
        if (req.user) {
            return res.status(200).json({
                status: true,
                meassage : "User profile Add",
                user: req.user
            })
        }
    } catch (error) {
        res.status(200).json({
            status: true,
            message: error.message
        })
    }

}


export { user1, user2, user3, user4, user5, loginUser, logoutUser, UserProfile };
