import express from 'express'
import { Appointments, appointments, doctorLogin } from '../Controllers/doctorControllers.js'

const doctorRoute = express.Router()

doctorRoute.get('/doctor/:id',appointments);
doctorRoute.post('/login',doctorLogin);
doctorRoute.get('/appointments/:doctorId', Appointments);

export default doctorRoute