//to set up path to resolve request

//1)import express
const express = require('express')

//import controller
const userController = require('../controllers/userController')

//import projectsController
const projectsController = require('../controllers/projectsController')

//import jwtMiddleware
const jwtMiddleware = require('../Midware/jwtMiddleware')

//import multer
const multerConfig = require('../Midware/multerMiddleware')


//2)create an object for Router() class in the express modules
const router = new express.Router()

//3)path to resolve the request
  //syntax = router.httpreq('path',()=>{how to solve})
  //a)register
  router.post('/user/register',userController.register)

  //b)login
  router.post('/user/login',userController.login)

  //c)add project
  router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectsController.addProject)

  //d)home project
  router.get('/project/home-project',projectsController.gethomeProject)

  //e)all project
  router.get('/project/all-project',jwtMiddleware,projectsController.getallProject)

  //f)user project
  router.get('/user/allproject',jwtMiddleware,projectsController.getUserProject)

  //g)edit project
  router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectsController.editUserProject)

  //h)delete project
  router.delete('/project/remove/:id',jwtMiddleware,projectsController.deleteUserProject)

  //edit profile
  router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)
  

//4)export router
module.exports = router