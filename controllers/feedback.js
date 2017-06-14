const Feedback = require('../models/feedback');

const methods = {};

methods.getAll = (req, res, next) => {
  Feedback.find({})
    .populate(['votes'])
    .exec(function (err, feedbacks) {
      if (err) {
        res.json({ error: err, success: false });
      } else {
        res.json({ feedbacks: feedbacks, success: true });
      }
    });
}

methods.findById = (req, res, next) => {
  // console.log('in controller, req.params.id: ', req.params.id);
  if (req.params.id) {
    if (req.params.id.length > 0) {
      Feedback.findById(req.params.id)
        .populate(['user', 'votes'])
        .exec(function (err, feedback) {
          // console.log('in controller, found feedback: ', feedback);
          if (err) {
            res.json({ error: err, success: false });
          } else {
            res.json({ feedback: feedback, success: true });
          }
        });
    } else {
      res.json({ success: false, message: 'Feedback id tidak boleh kosong!' });
    }
  } else {
    res.json({ success: false, message: 'Feedback id tidak boleh kosong!' });
  }
}

methods.create = (req, res, next) => {
  if (req.body.user && req.body.title && req.body.content) {
    if (req.body.user.length > 0 && req.body.title.length > 0 && req.body.content.length > 0) {
      Feedback.create({
        url: req.body.url,
        name: req.body.name,
        description: req.body.description,
        votes: [],
        hoaxVoteCount: 0,
        nonHoaxVoteCount: 0,
        createdAt: new Date()
      }, (err, feedback) => {
        if (err) {
          res.json({ error: err, success: false });
        } else {
          res.json({ feedback: feedback, success: true });
        }
      });
    } else {
      res.json({ error: 'user id, title, content tidak boleh kosong', success: false });
    }
  } else {
    res.json({ error: 'user id, title, content tidak boleh kosong', success: false });
  }
}

methods.update = (req, res, next) => {
  if (req.params.id) {
    Feedback.findById(req.params.id, (err, feedback) => {
      if (err) {
        res.json({ error: err, success: false });
      } else {
        if (feedback && feedback !== null) {
          Feedback.update({ _id: id }, {
            $set: {
              url: feedback.url,
              name: req.body.name || feedback.name,
              description: req.body.description || feedback.description,
              votes: feedback.votes,
              hoaxVoteCount: feedback.hoaxVoteCount,
              nonHoaxVoteCount: feedback.nonHoaxVoteCount
            }
          }, (err, updated) => {
            res.json({ feedback: feedback, success: true });
          });
        } else {
          res.json({ error: 'Id feedback tidak ditemukan', success: false });
        }
      }
    });
  } else {
    res.json({ error: 'Id feedback tidak boleh kosong', success: false });
  }

}

methods.delete = (req, res, next) => {
  Feedback.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json({ success: false, error: err });
    } else {
      res.json({ success: true, message: 'feedback is successfully deleted' });
    }
  });
}

methods.vote = (req, res, next) => {

  if (req.body.userId && req.body.value && req.body.name && req.body.description) {

    Feedback.find({ name: req.body.name })
      .populate('vote')
      .exec(function (err, feedback) {
        if (err) {
          res.json({ error: err, success: false });
        } else {

          console.log('feedback: ', feedback);

          if (feedback && feedback.length > 0) {

            let foundIndex = null;
            feedback = feedback[0];

            feedback.votes.map((vote, index) => {
              if (String(vote.user) === String(req.body.userId)) {
                foundIndex = index;
              }
            });

            let message = '';

            if (foundIndex !== null) {

              console.log('userId is found in votes');

              if (Number(req.body.value) !== Number(feedback.votes[foundIndex].value)) {
                if (Number(feedback.votes[foundIndex].value) === 1) {
                  feedback.hoaxVoteCount--;
                  feedback.votes[foundIndex].value = 0;
                } else if (Number(feedback.votes[foundIndex].value) === -1) {
                  feedback.nonHoaxVoteCount--;
                  feedback.votes[foundIndex].value = 0;
                } else {
                  if (Number(req.body.value) === 1) {
                    feedback.hoaxVoteCount++;
                    feedback.votes[foundIndex].value = req.body.value;
                  } else {
                    feedback.nonHoaxVoteCount++;
                    feedback.votes[foundIndex].value = req.body.value;
                  }
                }

                message = 'Edit vote berhasil';

                feedback.save((err, feedback) => {
                  res.json({ feedback: feedback, success: true, message: message });
                });

              } else {
                res.json({ success: false, error: 'Tidak bisa vote lagi!' });
              }

            } else {

              console.log('userId is not found in votes');

              if (Number(req.body.value) === 1) {
                feedback.hoaxVoteCount++;
              } else {
                feedback.nonHoaxVoteCount++;
              }
              feedback.votes.push({
                user: req.body.userId,
                value: req.body.value,
                createdAt: new Date()
              });
              feedback.save((err, feedback) => {
                res.json({ feedback: feedback, success: true });
              });

            }

          } else {

            let newFeedback = new Feedback({
              createdAt: new Date(),
              name: req.body.name,
              description: req.body.description,
              url: req.body.url,
              votes: [],
              hoaxVoteCount: 0,
              nonHoaxVoteCount: 0
            });

            if (Number(req.body.value) === 1) {
              newFeedback.hoaxVoteCount++;
            } else {
              newFeedback.nonHoaxVoteCount++;
            }
            newFeedback.votes.push({
              user: req.body.userId,
              value: req.body.value,
              createdAt: new Date()
            });
            newFeedback.save((err, feedback) => {
              res.json({ feedback: feedback, success: true });
            });

          }

        }

      });

  } else {
    res.json({ message: 'userId, name, dan description tidak boleh kosong', success: false });
  }

}

module.exports = methods;
