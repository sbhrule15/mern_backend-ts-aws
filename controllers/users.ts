import User from '../models/user';

function load(req, res, next, id) {
  console.log("In User Load");
  User.findById(id)
    .exec()
    .then((user) => {
      req.dbUser = user;
      return next();
    }, (e) => next(e));
}

function get(req, res) {
  console.log("In User Get");
  return res.json(req.dbUser);
}

function create(req, res, next) {
  console.log("In User Create");
  User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then((savedUser) => {
      return res.json(savedUser);
    }, (e) => next(e));
}

function update(req, res, next) {
  console.log("In User Update");
  const user = req.dbUser;
  Object.assign(user, req.body);

  user.save()
    .then((savedUser) => res.sendStatus(204),
      (e) => next(e));
}

function list(req, res, next) {
  console.log("In User List");
  const { limit = 50, skip = 0 } = req.query;
  User.find()
    .skip(skip)
    .limit(limit)
    .exec()
    .then((users) => res.json(users),
      (e) => next(e));
}

function listPacks(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Pack.find({ author: req.user })
    .skip(skip)
    .limit(limit)
    .exec()
    .then((packs) => res.json(packs),
      (e) => next(e));
}

function remove(req, res, next) {
  console.log("In User Remove");
  const user = req.dbUser;
  user.remove()
    .then(() => res.sendStatus(204),
      (e) => next(e));
}

exports.load = load;
exports.get = get;
exports.create = create;
exports.update = update;
exports.list = list;
exports.listPacks = listPacks;
exports.remove = remove;