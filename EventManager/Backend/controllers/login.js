import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Customer from '../models/Loginmodel.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '5h' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("registration password", password);

    if (!name || !email || !password) {
      return res.status(400).send('Invalid request data');
    }

    const userExist = await Customer.findOne({ email });

    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("register hash", hashedPassword);

      const data = new Customer({ name, email, password: hashedPassword });
      await data.save();
      res.status(201).json({ msg: "Register successful", data });
    } else {
      res.status(400).send('User already exists, try to login');
    }
  } catch (err) {
    console.error("error in register", err);
    res.status(500).send("Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password, email);

    if (!email || !password) {
      return res.status(400).send("Email and password required");
    }

    const userExist = await Customer.findOne({ email });
    const userRole=userExist.role;
    if (userExist) {
      try {
        const passCheck = await bcrypt.compare(password, userExist.password);
        console.log("Stored hash:", userExist.password);
        console.log("Password to compare:", password);
        console.log("bcrypt compare", passCheck);
        if (passCheck) {
          const accessToken = generateToken(userExist);
          const refreshToken = generateRefreshToken(userExist);
          userExist.refreshToken = refreshToken;
          await userExist.save();

          // Set the access token in the session
          req.session.accessToken = accessToken;
          req.session.refreshToken = refreshToken;

          res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
          });
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
          });

          // Save the session and send a response
          req.session.save(err => {
            if (err) {
              return res.status(500).send('Failed to save session');
            }
            // Send a success response with a valid status code
            
            res.status(200).json({ message: 'Login successful', accessToken ,userRole});
          });
        } else {
          console.log("Incorrect password");
          res.status(400).send("Incorrect password");
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Password comparison failed");
      }
    } else {
      console.log("User does not exist");
      res.status(400).send('User does not exist, try to register');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
export const logout = async (req, res) => {
  // const { refreshToken } = req.session.refreshToken;
  const {refreshToken} = req.session;
  console.log(req.session);
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const user = await Customer.findOne({ refreshToken });
    
    if (user) {
      user.refreshToken = null; // Remove the refresh token
      await user.save(); // Save the user without the refresh token
    }

    // Clear cookies
    res.clearCookie('accessToken');
    //   res.clearCookie('refreshToken');

    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);

    return res.status(500).json({ message: 'User logout failed', error });
  }
};

// Assuming you have already defined your router
//   loginrouter.post('/logout', logout);

export const token = async (req, res) => {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) return res.status(401).json({ message: 'No token provided' });
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await Customer.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Invalid token' });
    const accessToken = generateToken(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });
    res.status(200).json({ message: 'Token refreshed' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Token refresh failed', error });
  }
};

export const allUsers = async (req, res) => {

  try {
    const users = await Customer.find();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("There is an error in fetching users");
  }
};



export const getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
};


// update one user

// export const updateCustomer = async (req, res) => {
//     const customer = await Customer.findById(req.params.id);

//     if (customer) {
//       customer.name = req.body.name || customer.name;
//       customer.email = req.body.email || customer.email;
//       customer.role = req.body.role || customer.role;

//       if (req.body.password) {
//         customer.password = req.body.password;
//       }

//       const updatedCustomer = await customer.save();
//       res.json({
//         _id: updatedCustomer._id,
//         name: updatedCustomer.name,
//         email: updatedCustomer.email,
//         role: updatedCustomer.role,
//       });
//     } else {
//       res.status(404).json({ message: 'Customer not found' });
//     }
//   };

// Controller
export const updateCustomer = async (req, res) => {
  console.log('Updating customer with ID:', req.params.id);  // Log req.params.id to see if it's undefined
  try {
    const customer = await Customer.findById(req.params.id);

    if (customer) {
      customer.name = req.body.name || customer.name;
      customer.email = req.body.email || customer.email;
      customer.role = req.body.role || customer.role;

      if (req.body.password) {
        customer.password = req.body.password;
      }

      const updatedCustomer = await customer.save();
      res.json({
        _id: updatedCustomer._id,
        name: updatedCustomer.name,
        email: updatedCustomer.email,
        role: updatedCustomer.role,
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error updating customer:', error);  // Log error for more details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Router
//   loginrouter.patch('/user/:id', updateCustomer);



//delete users 

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (customer) {
      await Customer.deleteOne({ _id: req.params.id });
      res.json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};