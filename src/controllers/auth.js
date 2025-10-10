import { ONE_MONTH, FIFTEEN_MINUTES } from "../constants";
import cookie from "cookie-parser";
import { loginUser, registerUser } from "../services/auth";

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(date.now() + ONE_DAY),
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });
};

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Successfully registered a user!",
    data: user,
  });
};

export const loginUserController=async (req,res)=>{
    const session=await loginUser(req.body);
    setupSession(res,session);
    res.status(200).json({
        status:200,
        success:true,
        message:"Successfully logged in an user!",
        data:session,
    })
}
