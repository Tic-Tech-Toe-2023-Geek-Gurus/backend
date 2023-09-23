const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');
// const image = require('../../generated_images');


const registerController = asyncHandler(async (req, res) => {

    const {name, audio } = req.body;

    if (!name || !audio )
    {
        res.status(400)
        // res.json({success: false, message: 'Please fill all the fields'});
        throw new Error('Please fill all the fields');
    }

    const userExists = await User.findOne({name});

    if (userExists)
    {
        res.status(400)
        // res.json({success: false, message: 'User already exists'});
        throw new Error('User already exists');
    }

    // let {audio} = JSON.parse(req.body.audio);
    const pythonProcess = child_process.spawn("python", ["../../audio_to_image.py", audio]);
  
      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
      });
  
      // Handle Python script exit
      pythonProcess.on('close', (code) => {
            if (code === 0) {
            console.log('Python script exited successfully.');
    
            res.status(200).json({ message: 'Image generated successfully' });
    
            } else {
            console.error(`Python script exited with code ${code}.`);
            res.status(500).send('Internal Server Error');
            }
      });

        // send to model

    const User = User.create({
        name,
        // vector,
    });

    if (User)
    {
        res.status(200).json({
            success: true,
            _id: User._id,
            name: User.name,
            //vector: User.vector,
            message: "Registeration Successful",
        });
        //user.save();
    }

    else
    {
        res.status(400)
        // res.json({success: false, message: 'Invalid user data'});
        throw new Error('Invalid user data');
    }

});


const loginController = asyncHandler(async (req, res) => {
    
    const {name, audio} = req.body;

    if (!name || !audio)
    {
        res.status(400)
        // res.json({success: false, message: 'Please fill all the fields'});
        throw new Error('Please fill all the fields');
    }

    const User = await User.findOne({name});

    if (!User)
    {
        res.status(401)
        // res.json({success: false, message: 'Invalid Credentials'});
        throw new Error('User not found');
    }

    const pythonProcess = child_process.spawn("python", ["../../audio_to_image.py", audio]);
  
      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
      });
  
      // Handle Python script exit
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Python script exited successfully.');
  
          res.status(200).json({ message: 'Image generated successfully' });
  
        } else {
          console.error(`Python script exited with code ${code}.`);
          res.status(500).send('Internal Server Error');
        }
      });

      //send audio to model
      // model comparison

    if (User)
    {
        res.status(200).json({
            success: true,
            _id: User._id,
            name: User.name,
            //vector's comparison with the vector of the user
            message: "Login Successful",
        });
    }

    else
    {
        res.status(401)
        // res.json({success: false, message: 'Invalid Credentials'});
        throw new Error('Invalid Credentials');
    }
});




module.exports = {loginController, registerController};