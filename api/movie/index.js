const express = require("express")
const router = express.Router()
const ctrl = require("./movie.ctrl")

router.get("/", ctrl.list); // 목록조회
router.get("/new", ctrl.showCreatePage);
router.get("/:id", ctrl.checkId, ctrl.detail); // 상세조회
router.get("/:id/edit", ctrl.checkId, ctrl.showUpdatePage);

router.post("/", ctrl.create); // 등록
router.put("/:id", ctrl.checkId, ctrl.update); // 수정
router.delete("/:id", ctrl.checkId, ctrl.remove); // 삭제

module.exports = router