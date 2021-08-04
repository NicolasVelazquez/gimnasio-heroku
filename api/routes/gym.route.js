import express from "express"
import MembersController from "../controller/members.controller.js"
import ClassController from "../controller/class.controller.js"
import PaymentController from "../controller/payment.controller.js"
import PlanController from "../controller/plan.controller.js"

const router = express.Router()

router
    .route("/clases")
    .get(ClassController.find)
    .post(ClassController.create)
router
    .route("/clases/:id")
    .get(ClassController.findById)
    .put(ClassController.update)
    .delete(ClassController.delete)

router.route("/clases/inscripcion").post(ClassController.enroll)
router.route("/clases/baja").post(ClassController.dropOut)

router
    .route("/planes")
    .get(PlanController.find)
    .post(PlanController.create)
router
    .route("/planes/:id")
    .put(PlanController.update)
    .delete(PlanController.delete)

router
    .route("/abonos")
    .get(PaymentController.find)
    .post(PaymentController.create)

router
    .route("/abonos/:id")
    .get(PaymentController.find)
    .delete(PaymentController.delete)

router
    .route("/socios")
    .get(MembersController.find)
    .post(MembersController.create)
router
    .route("/socios/:id")
    .get(MembersController.findById)
    .put(MembersController.update)
    .delete(MembersController.delete)

export default router