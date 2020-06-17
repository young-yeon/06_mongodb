const MusicModel = require("../../models/music");
const mongoose = require("mongoose");

// id 유효성 체크
const checkId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }

  next();
};

// 목록 조회 (/api/music?limit=XX)
const list = (req, res) => {
  const limit = parseInt(req.query.limit || 10, 10);

  if (Number.isNaN(limit)) return res.status(400).end();

  MusicModel.find((err, result) => {
    if (err) throw err;
    // res.json(result)
    res.render("music/list", { result });
  })
    .limit(limit)
    .sort({ _id: -1 });
};

// 상세 조회 (/api/music/:id)
const detail = (req, res) => {
  const id = req.params.id;

  MusicModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.render("music/detail", { result });
  });
};

// 등록
const create = (req, res) => {
  const { singer, title } = req.body;
  if (!singer || !title) return res.status(400).end("입력값 오류");

  MusicModel.create({ singer, title }, (err, result) => {
    if (err) return res.status(500).end("등록 오류");
    res.status(201).json(result);
  });
};

// 수정 (/api/music/:id)
const update = (req, res) => {
  const id = req.params.id;

  const { singer, title } = req.body;
  MusicModel.findByIdAndUpdate(
    id,
    { singer, title },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).end();
      if (!result) return res.status(404).end();
      res.json(result);
    }
  );
};

// 삭제 (/api/music/:id)
const remove = (req, res) => {
  const id = req.params.id;

  MusicModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.json(result);
  });
};

const showCreatePage = (req, res) => {
  res.render("music/create");
};

const showUpdatePage = (req, res) => {
  const id = req.params.id;

  MusicModel.findById(id, (err, result) => {
    if (err) return res.status(500).send("조회 에러");
    if (!result) return res.status(404).send("해당 정보 없음");
    res.render("music/update", { result });
  });
};

module.exports = {
  checkId,
  list,
  detail,
  create,
  update,
  remove,
  showCreatePage,
  showUpdatePage,
};
