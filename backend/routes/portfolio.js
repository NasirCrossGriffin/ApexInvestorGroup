const express = require('express')
const router = express.Router()
const PortfolioEntry = require('../models/PortfolioEntry.js')

router.get('/', async (req, res) => {
    try {
        const AllEntries = await PortfolioEntry.find();
        res.status(200).json(AllEntries);
    } catch (err) {
        console.log(err);
        res.status(400).json({Error : err});
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const thisEntry = await PortfolioEntry.findById(id);
        res.status(200).json(thisEntry);
    } catch (err) {
        console.log(err);
        res.status(400).json({Error : err});
    }
})

router.post('/', async (req, res) => {

    const portfolioEntry = new PortfolioEntry({
        title : req.body.title,
        body : req.body.body,
        path : req.body.path,
        date : new Date(req.body.date),
        hidden : req.body.hidden,
    })

    try {
        const newEntry = await portfolioEntry.save();
        res.status(200).json(newEntry);
    } catch (err) {
        console.log(err);
        res.status(400).json({Error : err});
    }
})

router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await PortfolioEntry.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
        path: req.body.path,
        date: new Date(req.body.date),
        hidden: req.body.hidden,
      },
      {
        new: true,        // return updated document
        runValidators: true, // enforce schema rules
      }
    );

    if (!updatedEntry) {
      return res.status(404).json({ error: "Portfolio entry not found" });
    }

    res.status(200).json(updatedEntry);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEntry = await PortfolioEntry.findByIdAndDelete(req.params.id)

    if (!deletedEntry) {
      return res.status(404).json({ error: "Portfolio entry not found" });
    }

    res.status(200).json(deletedEntry);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
});


module.exports = router