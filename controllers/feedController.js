const { create } = require('../utils/dbUtil');
const httpStatus = require('http-status-codes');
const db = require('../models/database');
const { createError, createResponse } = require('../utils/responseUtil');

module.exports = {
  getFeedList: (req, res) => {
    const feeds = db.get('feeds').value();
    const page = Number(req.query.page) || 0;
    const pageSize = Number(req.query.pageSize) || 10;
    const isPublic =
      req.query.isPublic != null ? req.query.isPublic === 'true' : true;

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFeeds = feeds
      .slice(startIndex, endIndex)
      .filter((feed) => feed.isPublic === Boolean(isPublic));

    if (feeds) {
      return res.status(httpStatus.OK).send(createResponse(paginatedFeeds));
    } else {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(createError('Unable to retrieve data from server'));
    }
  },
  createdFeed: (req, res) => {
    const { exerciseKind, content, imageUrl, isPublic } = req.body;

    if (content && exerciseKind && imageUrl) {
      const data = db
        .get('feeds')
        .push(create({ exerciseKind, content, imageUrl, isPublic }))
        .write();

      return res
        .status(httpStatus.OK)
        .send(createResponse(data[data.length - 1]));
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(createError('must provide a valid data'));
    }
  },
};
