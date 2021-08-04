import MemberMongo from "../../models/member.model.js"
import Utils from "../../utils/members.util.js"
import mongoose from "mongoose"
import winston from "winston"

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'app.log' })
  ]
});

export default class MembersController {

    static async find(req, res) {
      MemberMongo.find()
        .lean()
        .then(members => res.json(members.map(function(member) {
          member.active = (member.activePayment && new Date(member.activePayment.end).getTime() >= Date.now())
          return member
        })))
        .catch(err => res.status(400).json('Error: ' + err))
    }

    static async findById(req, res) {
      try {
        const member = await MemberMongo.findById(req.params.id).lean();
        if (!member) {
          res.status(404).json('Error: Socio no encontrado.')
        } else {
          member.active = (member.activePayment && new Date(member.activePayment.end).getTime() >= Date.now())
          res.json(member);
        }
        
      } catch (error) {
        logger.error(error.message)
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de socio inválido.')
        }
      }
    }

    static async create(req, res) {
        const newMember = new MemberMongo()
        Utils.populateMember(newMember, req.body)

        newMember.save()
            .then(() => res.json('¡Socio guardado!'))
            .catch(err => res.status(400).json('Error: ' + err))
    }

    static async update(req, res) {
      try {
        const member = await MemberMongo.findById(req.params.id);
        if (!member) {
          res.status(404).json('Error: Socio no encontrado.')
        } else {
          Utils.populateMember(member, req.body)
          member.save()
            .then(() => res.json('¡Socio actualizado!'))
            .catch(err => res.status(500).json('Error: ' + err))
        }
      } catch (error) {
        logger.error(error.message)
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de socio inválido.')
        }
      }
    }
    
    static async delete(req, res) {
      try {
        const member = await MemberMongo.findById(req.params.id).lean();
        if (!member) {
          res.status(404).json('Error: Socio no encontrado.')
        } else {
          MemberMongo.findByIdAndDelete(req.params.id)
            .then(() => res.json('Socio borrado.'))
            .catch(err => res.status(500).json('Error: ' + err))
        }
      } catch (error) {
        logger.error(error.message)
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de socio inválido.')
        }
      }
    }
    
}