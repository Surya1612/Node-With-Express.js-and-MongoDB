const express = require('express');
const bodyParser = require('body-parser');
const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());
const promotions=require('../model/promotions');
const Promotions = require('../model/promotions');
var authenticate = require('../authenticate');
const cors=require('./cors');

promotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    Promotions.find({})
    .then((promo)=>{
     res.statusCode=200;
     res.setHeader('Content-type','application/json');
     res.json(promo)
    },err=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
   Promotions.create(req.body)
   .then((promo)=>{
    console.log("promo created",promo);
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(promo);
   },err=>next(err))
   .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotion');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
   Promotions.remove({})
   .then((resc)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resc);
   },err=>next(err))
   .catch((err)=>next(err));
});


promotionRouter.route('/:promotionId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
   Promotions.findById(req.params.promotionId)
   .then((promo)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(promo);
   },err=>next(err))
   .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.end('POST operation not supported on /promotion/'+req.params.promotionId)
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promotionId,{
    $set:req.body
  },{new:true})
  .then((promo)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(promo);
   },err=>next(err))
   .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
    .then((resc)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resc);
       },err=>next(err))
       .catch((err)=>next(err));
});

module.exports =promotionRouter;