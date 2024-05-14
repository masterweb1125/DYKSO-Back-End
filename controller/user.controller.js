import { userModel } from "../model/user.model.js";


export const follow_up = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.body.postId;

        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Add string to follow_up array
        user.follow_up.push(postId);

        // Save updated user
       const updatedFollowUp = await user.save();

        res.status(200).json({success: true, updatedData: updatedFollowUp, message: "service post to the follow up successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const Unfollow_up = async (req, res) => {
    console.log("reg.body: ", req.body)
  try {
    const userId = req.params.userId;
    const postId = req.body.postId;

    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove string from follow_up array
    user.follow_up = user.follow_up.filter((item) => item !== postId);

    // Save updated user
    await user.save();

    // Save updated user
    const updatedFollowUp = await user.save();

    res
      .status(200)
      .json({
        success: true,
        updatedData: updatedFollowUp,
        message: "service post has marked unfollow",
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};