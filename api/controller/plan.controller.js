import PlanMongo from "../../models/plan.model.js"
import mongoose from "mongoose"
import winston from "winston"

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'app.log' })
  ]
});

export default class PlanController {

    static async find(req, res) {
      PlanMongo.find()
        .lean()
        .then(classEntity => res.json(classEntity))
        .catch(err => res.status(500).json('Error: ' + err))
    }
    
    static async create(req, res) {
      const newClass = new PlanMongo(req.body)
      newClass.save()
        .then(() => res.json('¡Plan guardado!'))
        .catch(err => res.status(400).json('Error: ' + err))
    }

    static async update(req, res) {
      try {
        const result = await PlanMongo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!result) {
          res.status(404).json('Error: Plan no encontrado.')
        }
        res.json('Plan actualizado!')
      } catch (error) {
        logger.error(error.message)
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de plan inválido.')
        }
      }
    }
    
    static async delete(req, res) {
      try {
        const result = await PlanMongo.findByIdAndDelete(req.params.id)
        if (!result) {
          res.status(404).json('Error: Plan no encontrada.')
        }
        res.json('Plan borrado.')
      } catch (error) {
        logger.error(error.message)
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de plan inválido.')
        }
      }
    }
}