const mongoose = require('mongoose');

const backlinkSchema = new mongoose.Schema({
  referringPageUrl: {
    type: String,
    trim: true,
    required: 'Backlink requires a referring page URL',
  },
  referringPageTitle: {
    type: String,
    trim: true,
  },
  anchorText: {
    type: String,
    trim: true,
  },
  linksToUrl: {
    type: String,
    trim: true,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastSeen: {
    type: Date,
  }
});

const Backlink = mongoose.model('Backlink', backlinkSchema);

module.exports = Backlink;