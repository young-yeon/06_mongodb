const MusicModel = require("../../models/movie")
const mongoose = require("mongoose")

// id 유효성 체크
const checkId = (req, res, next) => {
    const id = req.params.id
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end()
    }

    next()
}

// 목록 조회 (/api/music?limit=XX)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10)
    
    if (Number.isNaN(limit)) return res.status(400).end()

    MusicModel.find((err, result) => {
        if (err) throw err
        res.json(result)
    }).limit(limit)
}

// 상세 조회 (/api/music/:id)
const detail = (req, res) => {
    const id = req.params.id
    

    MusicModel.findById(id, (err, result) => {
        if (err) return res.status(500).end()
        if (!result) return res.status(404).end()
        res.json(result)
    })
    
  }

// 등록
const create = (req, res) => {
    const { title, director, year } = req.body;
    if (!director || !title || !year) return res.status(400).end();

    MusicModel.create({ title, director, year }, (err, result) => {
        if (err) throw err
        res.status(201).json(result)
    })

}

// 수정 (/api/music/:id)
const update = (req, res) => {
    const id = req.params.id

    const { title, director, year } = req.body;
    MusicModel.findByIdAndUpdate(id, { title, director, year }, { new: true }, (err, result) => {
        if (err) return res.status(500).end()
        if (!result) return res.status(404).end()
        res.json(result)
    })

}

// 삭제 (/api/music/:id)
const remove = (req, res) => {
    const id = req.params.id

    MusicModel.findByIdAndDelete(id, (err, result) => {
        if (err) return res.status(500).end()
        if (!result) return res.status(404).end()
        res.json(result)
    })
}

module.exports = { checkId, list, detail, create, update, remove }