import express from 'express'
import { appointments } from '../Controllers/doctorControllers.js'

const doctorRoute = express.Router()

doctorRoute.get('/doctor/:id',appointments)

export default doctorRoute