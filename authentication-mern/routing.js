const express = require('express')
const router = express.Router()
const users = require('./users.json')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

// TO GET ALL THE USERS
router.get('/user', async (req, res) => {
  const usersDB = users
  console.log(usersDB)
  res.json(usersDB)
})

// TO GET SPECIFIC USERS ONLY
router.get('/auth', auth, async (req, res) => {
  try {
    console.log(req.user)
    const user = users.find((value) => value.email == req.user.email)
    console.log('i am called')
    console.log(user)
    res.send(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})

// TO REGISTER
router.post('/register', async (req, res) => {
  try {
    // const usersDB = users;
    const { name, email, password } = req.body
    let obj = {
      name,
      email,
      password,
    }
    console.log(obj)
    if (name && email && password) {
      users.push(obj)
      console.log(users)
      const payload = {
        user: {
          email: email,
        },
      }
      jwt.sign(payload, 'mytoken', { expiresIn: 3600 }, (error, token) => {
        if (error) throw error
        res.json({ token })
      })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})

// TO LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const details = users.find((value) => {
    return email === value.email && password === value.password
  })
  if (details) {
    const payload = {
      user: {
        email: email,
      },
    }
    jwt.sign(payload, 'mytoken', { expiresIn: 3600 }, (error, token) => {
      if (error) throw error
      res.json({ token })
    })
  } else {
    res.status(404).send('No users in database')
  }
})

module.exports = router
