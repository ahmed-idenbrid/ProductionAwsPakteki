const router = require("express").Router();
const AllNewsModal = require("../models/NewsModels/AllNewsModal");
const UserFeedbackModal = require("../models/UserFeedbackModal");
const fileSystem = require("fs");
const Collect = require("@supercharge/collections");
const {
  CreateFileAndSendData,
  ReadExistingFileAndSendData,
} = require("../utils/sendNewsData");

// submit all news in mongodb
router.post("/news/all", async (req, res) => {
  const AllNews = new AllNewsModal({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    channel: req.body.channel,
    image: req.body.image,
    permalink: req.body.permalink,
    category: req.body.category,
    fetching_date: req.body.fetching_date,
    registered_views: req.body.registered_views,
    no_of_registered_views: req.body.no_of_registered_views,
    no_of_nonregistered_views: req.body.no_of_nonregistered_views,
    no_of_comments: req.body.no_of_comments,
    rating: req.body.rating,
    language: req.body.language,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    comments: req.body.comments,
  });
  try {
    const SaveAllNews = await AllNews.save();
    res.send(SaveAllNews);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// // submit a EntertainmentNews in mongon db
// router.post('/news/entertainment',async (req,res)=>{
//   const EntertainmentNews = new EntertainmentNewsSchema({
//     _id:req.body.id,
//     title:req.body.title,
//     description:req.body.description,
//     date:req.body.date,
//     channel:req.body.channel,
//     image:req.body.image,
//     permalink:req.body.permalink,
//     category:req.body.category,
//     fetching_date:req.body.fetching_date,
//     no_of_views:req.body.no_of_views,
//     no_of_likes:req.body.no_of_likes,
//     no_of_dislikes:req.body.no_of_dislikes,
//     no_of_comments:req.body.no_of_comments,
//     rating:req.body.rating,
//     language:req.body.language,
//     created_at:req.body.created_at,
//     updated_at:req.body.updated_at,
//   });
//   try{
//     const  SaveEntertainmentNews = await EntertainmentNews.save();
//     res.json(SaveEntertainmentNews);
//   }catch(error){
//     res.json({message:error})
//   }

// });
// // submit a EntertainmentNews in mongon db end
// // submit a FashionNewsSchema in mongon db
// router.post('/news/fashion',async (req,res)=>{
//   const FashionNews = new FashionNewsSchema({
//     _id:req.body.id,
//     title:req.body.title,
//     description:req.body.description,
//     date:req.body.date,
//     channel:req.body.channel,
//     image:req.body.image,
//     permalink:req.body.permalink,
//     category:req.body.category,
//     fetching_date:req.body.fetching_date,
//     no_of_views:req.body.no_of_views,
//     no_of_likes:req.body.no_of_likes,
//     no_of_dislikes:req.body.no_of_dislikes,
//     no_of_comments:req.body.no_of_comments,
//     rating:req.body.rating,
//     language:req.body.language,
//     created_at:req.body.created_at,
//     updated_at:req.body.updated_at,
//   });
//   try{
//     const  SaveFashionNews = await FashionNews.save();
//     res.json(SaveFashionNews);
//   }catch(error){
//     res.json({message:error})
//   }

// });
// // submit a FashionNewsSchema in mongon db end
// // submit a GovernmentNewsSchema in mongon db
// router.post('/news/government',async (req,res)=>{
//   const GovernmentNews = new GovernmentNewsSchema({
//     _id:req.body.id,
//     title:req.body.title,
//     description:req.body.description,
//     date:req.body.date,
//     channel:req.body.channel,
//     image:req.body.image,
//     permalink:req.body.permalink,
//     category:req.body.category,
//     fetching_date:req.body.fetching_date,
//     no_of_views:req.body.no_of_views,
//     no_of_likes:req.body.no_of_likes,
//     no_of_dislikes:req.body.no_of_dislikes,
//     no_of_comments:req.body.no_of_comments,
//     rating:req.body.rating,
//     language:req.body.language,
//     created_at:req.body.created_at,
//     updated_at:req.body.updated_at,
//   });
//   try{
//     const  SaveGovernmentNews = await GovernmentNews.save();
//     res.json(SaveGovernmentNews);
//   }catch(error){
//     res.json({message:error})
//   }

// });
// // submit a GovernmentNewsSchema in mongon db end
// // submit a HealthNewsSchema in mongo db
// router.post('/news/health',async (req,res)=>{
//   const HealthNews = new HealthNewsSchema({
//     _id:req.body.id,
//     title:req.body.title,
//     description:req.body.description,
//     date:req.body.date,
//     channel:req.body.channel,
//     image:req.body.image,
//     permalink:req.body.permalink,
//     category:req.body.category,
//     fetching_date:req.body.fetching_date,
//     no_of_views:req.body.no_of_views,
//     no_of_likes:req.body.no_of_likes,
//     no_of_dislikes:req.body.no_of_dislikes,
//     no_of_comments:req.body.no_of_comments,
//     rating:req.body.rating,
//     language:req.body.language,
//     created_at:req.body.created_at,
//     updated_at:req.body.updated_at,
//   });
//   try{
//     const  SaveHealthNews = await HealthNews.save();
//     res.json(SaveHealthNews);
//   }catch(error){
//     res.json({message:error})
//   }

// });
// // submit a HealthNewsSchema in mongo db end
// // submit a InternationalNewsSchema in mongo db
// router.post('/news/international',async (req,res)=>{
//   const InternationalNews = new InternationalNewsSchema({
//     _id:req.body.id,
//     title:req.body.title,
//     description:req.body.description,
//     date:req.body.date,
//     channel:req.body.channel,
//     image:req.body.image,
//     permalink:req.body.permalink,
//     category:req.body.category,
//     fetching_date:req.body.fetching_date,
//     no_of_views:req.body.no_of_views,
//     no_of_likes:req.body.no_of_likes,
//     no_of_dislikes:req.body.no_of_dislikes,
//     no_of_comments:req.body.no_of_comments,
//     rating:req.body.rating,
//     language:req.body.language,
//     created_at:req.body.created_at,
//     updated_at:req.body.updated_at,
//   });
//   try{
//     const  SaveInternationalNewsSchema = await InternationalNews.save();
//     res.json(SaveInternationalNewsSchema);
//   }catch(error){
//     res.json({message:error})
//   }
// });
// // submit a InternationalNewsSchema in mongo db end
// // submit a ItScienceNewsSchema in mongo db
// router.post('/news/it-sciences',async (req,res)=>{
//   const ItScienceNews = new ItScienceNewsSchema({
//     _id:req.body.id,
//     title:req.body.title,
//     description:req.body.description,
//     date:req.body.date,
//     channel:req.body.channel,
//     image:req.body.image,
//     permalink:req.body.permalink,
//     category:req.body.category,
//     fetching_date:req.body.fetching_date,
//     no_of_views:req.body.no_of_views,
//     no_of_likes:req.body.no_of_likes,
//     no_of_dislikes:req.body.no_of_dislikes,
//     no_of_comments:req.body.no_of_comments,
//     rating:req.body.rating,
//     language:req.body.language,
//     created_at:req.body.created_at,
//     updated_at:req.body.updated_at,
//   });
//   try{
//     const  SaveItScienceNewsSchema = await ItScienceNews.save();
//     res.json(SaveItScienceNewsSchema);
//   }catch(error){
//     res.json({message:error})
//   }
// });
// // submit a ItScienceNewsSchema in mongo db end
// // submit a LocalNewsSchema in mongo db
// router.post('/news/local',async (req,res)=>{
//   const LocalNews = new LocalNewsSchema({
//     _id:req.body.id,
//     title:req.body.title,
//     description:req.body.description,
//     date:req.body.date,
//     channel:req.body.channel,
//     image:req.body.image,
//     permalink:req.body.permalink,
//     category:req.body.category,
//     fetching_date:req.body.fetching_date,
//     no_of_views:req.body.no_of_views,
//     no_of_likes:req.body.no_of_likes,
//     no_of_dislikes:req.body.no_of_dislikes,
//     no_of_comments:req.body.no_of_comments,
//     rating:req.body.rating,
//     language:req.body.language,
//     created_at:req.body.created_at,
//     updated_at:req.body.updated_at,
//   });
//   try{
//     const  SaveLocalNewsSchema = await LocalNews.save();
//     res.json(SaveLocalNewsSchema);
//   }catch(error){
//     res.json({message:error})
//   }
// });
// // submit a LocalNewsSchema in mongo db end
// // submit a SportsNewsSchema in mongo db
// router.post('/news/sports',async (req,res)=>{
//   const SportsNews = new SportsNewsSchema({
//     _id:req.body.id,
//     title:req.body.title,
//     description:req.body.description,
//     date:req.body.date,
//     channel:req.body.channel,
//     image:req.body.image,
//     permalink:req.body.permalink,
//     category:req.body.category,
//     fetching_date:req.body.fetching_date,
//     no_of_views:req.body.no_of_views,
//     no_of_likes:req.body.no_of_likes,
//     no_of_dislikes:req.body.no_of_dislikes,
//     no_of_comments:req.body.no_of_comments,
//     rating:req.body.rating,
//     language:req.body.language,
//     created_at:req.body.created_at,
//     updated_at:req.body.updated_at,
//   });
//   try{
//     const  SaveSportsNewsSchema = await SportsNews.save();
//     res.json(SaveSportsNewsSchema);
//   }catch(error){
//     res.json({message:error})
//   }
// });
// // submit a SaveSportsNewsSchema in mongo db end
// // submit a SaveWriterNewsSchema in mongo db
// router.post('/news/writer',async (req,res)=>{
//   const WriterNews = new WriterNewsSchema({
//     _id:req.body.id,
//     title:req.body.title,
//     description:req.body.description,
//     date:req.body.date,
//     channel:req.body.channel,
//     image:req.body.image,
//     permalink:req.body.permalink,
//     category:req.body.category,
//     fetching_date:req.body.fetching_date,
//     no_of_views:req.body.no_of_views,
//     no_of_likes:req.body.no_of_likes,
//     no_of_dislikes:req.body.no_of_dislikes,
//     no_of_comments:req.body.no_of_comments,
//     rating:req.body.rating,
//     language:req.body.language,
//     created_at:req.body.created_at,
//     updated_at:req.body.updated_at,
//   });
//   try{
//     const  SaveWriterNewsSchema = await WriterNews.save();
//     res.json(SaveWriterNewsSchema);
//   }catch(error){
//     res.json({message:error})
//   }
// });

router.get("/news/all", async (req, res) => {
  try {
    const GetAllNewsData = await AllNewsModal.find();
    res.send({ Success: true, newsData: GetAllNewsData });
  } catch (error) {
    res.send({ error: error.message });
  }
});

// get all news from mongodb
router.get("/news/all/:chunkIndex", async (req, res) => {
  try {
    const GetAllNewsData = await AllNewsModal.find();

    const sortedNewsByDate = await GetAllNewsData.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    const chunkedNewsData = await Collect(sortedNewsByDate).chunk(20).all();

    fileSystem.readFile(
      "./dataCollectionFiles/allNewsData.json",
      function (err, data) {
        if (data.length == 0) {
          CreateFileAndSendData(chunkedNewsData, req.params.chunkIndex, res);
        }
      }
    );
    if(fileSystem.existsSync("./dataCollectionFiles/allNewsData.json") &&
      JSON.parse(fileSystem.readFileSync("./dataCollectionFiles/allNewsData.json")).length * 20 < GetAllNewsData.length) {
      console.log("fetching new data");
      CreateFileAndSendData(chunkedNewsData, req.params.chunkIndex, res);
    } else if(fileSystem.existsSync("./dataCollectionFiles/allNewsData.json")) {
      console.log("sending existing data");
      ReadExistingFileAndSendData(req.params.chunkIndex, res);
    } else {
      
      console.log("creating file and sending data");
      CreateFileAndSendData(chunkedNewsData, req.params.chunkIndex, res);
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

router.get("/news/all/getCategoryNews/:chunkIndex", async (req, res) => {
  try {
    if (fileSystem.existsSync("./dataCollectionFiles/allNewsData.json")) {
      const data = fileSystem.readFileSync(
        "./dataCollectionFiles/allNewsData.json"
      );
      const header = req.header("newsCategoryName");
      const myObj = JSON.parse(data);
      const chunkData = myObj[req.params.chunkIndex].filter((obj) => {
        return obj.category === header;
      });
      if (chunkData === undefined) {
        res.send({
          Message: "No Data Found",
        });
      } else {
        res.send({
          success: true,
          chunkData,
        });
      }
    }
  } catch (err) {
    res.send({
      Message: err.message,
    });
  }
});

router.post("/newsLiked", async (req, res) => {
  try {
    const newsData = await AllNewsModal.findById(req.body.newsId);
    await AllNewsModal.updateOne(
      {
        _id: req.body.newsId,
      },
      {
        $push: {
          likes: req.body,
        },
        no_of_likes: newsData.no_of_likes + 1,
      }
    );
    res.send({
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

router.post("/newsUnLiked", async (req, res) => {
  try {
    const newsData = await AllNewsModal.findById(req.body.newsId);
    const newsLikesData = newsData.likes;
    const index = newsLikesData.findIndex(
      (obj) => obj.userId == req.body.userId
    );
    if (index > -1) {
      newsLikesData.splice(index, 1);
    }
    await AllNewsModal.updateOne(
      {
        _id: req.body.newsId,
      },
      {
        likes: newsLikesData,
        no_of_likes: newsData.no_of_likes - 1,
      }
    );
    res.send({
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

router.post("/newsComment", async (req, res) => {
  try {
    const newsData = await AllNewsModal.findById(req.body.newsId);
    await AllNewsModal.updateOne(
      {
        _id: req.body.newsId,
      },
      {
        $push: {
          comments: {
            newsId: req.body.newsId,
            userId: req.body.userId,
            username: req.body.username,
            comment: req.body.comment,
            commentNo: newsData.no_of_comments + 1,
          },
        },
        no_of_comments: newsData.no_of_comments + 1,
      }
    );
    res.send({
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

router.post("/newsCommentDelete", async (req, res) => {
  try {
    const newsData = await AllNewsModal.findById(req.body.newsId);
    const newsCommentsData = newsData.comments.filter((obj) => {
      return obj.commentNo !== req.body.commentNo;
    });
    await AllNewsModal.findByIdAndUpdate(req.body.newsId, {
      comments: newsCommentsData,
      no_of_comments: newsData.no_of_comments - 1,
    });
    res.send({
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

// ranking news

router.get("/news/rankedNews", async (req, res) => {
  try {
    const GetAllNews = await AllNewsModal.find();
    const rankedNews = await GetAllNews.sort(function (a, b) {
      return (
        b.no_of_comments +
        b.no_of_registered_views +
        b.no_of_nonregistered_views -
        (a.no_of_comments +
          a.no_of_registered_views +
          a.no_of_nonregistered_views)
      );
    });
    res.json(rankedNews);
  } catch (err) {
    res.send({
      message: error.message,
    });
  }
});

// ranking news by category name

router.get("/news/rankedNews/:newsName", async (req, res) => {
  try {
    const GetAllNews = await AllNewsModal.find({
      category: req.params.newsName,
    });
    const rankedNews = await GetAllNews.sort(function (a, b) {
      return (
        b.no_of_comments +
        b.no_of_registered_views +
        b.no_of_nonregistered_views -
        (a.no_of_comments +
          a.no_of_registered_views +
          a.no_of_nonregistered_views)
      );
    });
    res.send(rankedNews);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

router.post("/news/increaseViews", async (req, res) => {
  try {
    const newsData = await AllNewsModal.findById(req.body.newsId);
    await AllNewsModal.findByIdAndUpdate(
      req.body.newsId,
      {
        $push: {
          registered_views: {
            newsId: req.body.newsId,
            userId: req.body.userId === "" ? "" : req.body.userId,
          },
        },
        no_of_registered_views:
          req.body.userId === ""
            ? newsData.no_of_registered_views
            : newsData.no_of_registered_views + 1,
        no_of_nonregistered_views:
          req.body.userId === ""
            ? newsData.no_of_nonregistered_views + 1
            : newsData.no_of_nonregistered_views,
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.send({
            success: true,
          });
        }
      }
    );
    const GetAllNews = await AllNewsModal.find();
    const sortedNewsByDate = await GetAllNews.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    const chunkedNewsData = await Collect(sortedNewsByDate).chunk(20).all();
    fileSystem.writeFileSync(
      "./dataCollectionFiles/allNewsData.json",
      JSON.stringify(chunkedNewsData)
    );
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

// user history for my page

router.get("/news/history/:userId", async (req, res) => {
  try {
    const newsData = await AllNewsModal.find({
      "registered_views.userId": req.params.userId,
    });
    res.send(newsData);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

// search news

router.get("/news/search", async (req, res) => {
  try {
    const searchedField = req.query.title;
    AllNewsModal.find({
      title: {
        $regex: searchedField,
        $options: "$i",
      },
    }).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// feedbackApi

router.post("/user/feedback", async (req, res) => {
  try {
    await UserFeedbackModal.create({
      email: req.body.emailAddress,
      message: req.body.message,
    });
    res.send({
      message: "Success",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

//
// // get EntertainmentNews news from mongodb
// router.get('/news/entertainment',async (req,res)=>{
//   // console.log(req.params.id);
//   try{
//     const GetEntertainmentNews = await EntertainmentNewsSchema.find();
//     res.json(GetEntertainmentNews);
//   }catch(error){
// res.json({message:error});
//   }
// });
// // EntertainmentNews from db
// // get FashionNewsSchema news from mongodb
// router.get('/news/fashion',async (req,res)=>{
//   // console.log(req.params.id);
//   try{
//     const GetFashionNews = await FashionNewsSchema.find();
//     res.json(GetFashionNews);
//   }catch(error){
// res.json({message:error});
//   }
// });
// // FashionNewsSchema from db
// // get GovernmentNewsSchema news from mongodb
// router.get('/news/government',async (req,res)=>{
//   console.log(req.params.id);
//   try{
//     const GetGovernmentNews = await GovernmentNewsSchema.find();
//     res.json(GetGovernmentNews);
//   }catch(error){
// res.json({message:error});
//   }
// });
// // GovernmentNewsSchema from db
// // get HealthNewsSchema news from mongodb
// router.get('/news/health',async (req,res)=>{
//   // console.log(req.params.id);
//   try{
//     const GetHealthNews = await HealthNewsSchema.find();
//     res.json(GetHealthNews);
//   }catch(error){
// res.json({message:error});
//   }
// });
// // HealthNewsSchema from db
// // get InternationalNewsSchema news from mongodb
// router.get('/news/international',async (req,res)=>{
//   // console.log(req.params.id);
//   try{
//     const GetInternationalNews = await InternationalNewsSchema.find();
//     res.json(GetInternationalNews);
//   }catch(error){
// res.json({message:error});
//   }
// });
// // InternationalNewsSchema from db
// // get ItScienceNewsSchema news from mongodb
// router.get('/news/it-science',async (req,res)=>{
//   // console.log(req.params.id);
//   try{
//     const GetItScienceNews = await ItScienceNewsSchema.find();
//     res.json(GetItScienceNews);
//   }catch(error){
// res.json({message:error});
//   }
// });
// // ItScienceNewsSchema from db
// // get LocalNewsSchema news from mongodb
// router.get('/news/local',async (req,res)=>{
//   // console.log(req.params.id);
//   try{
//     const GetLocalNews = await LocalNewsSchema.find();
//     res.json(GetLocalNews);
//   }catch(error){
// res.json({message:error});
//   }
// });
// // LocalNewsSchema from db
// // get SportsNewsSchema news from mongodb
// router.get('/news/sports',async (req,res)=>{
//   console.log(req.params.id);
//   try{
//     const GetSportsNews = await SportsNewsSchema.find();
//     res.json(GetSportsNews);
//   }catch(error){
// res.json({message:error});
//   }
// });
// // SportsNewsSchema from db
// // get WriterNewsSchema news from mongodb
// router.get('/news/writer',async (req,res)=>{
//   console.log(req.params.id);
//   try{
//     const GetWriterNews = await WriterNewsSchema.find();
//     res.json(GetWriterNews);
//   }catch(error){
// res.json({message:error});
//   }
// });

// get single new news from mongon db
router.get("/news/single/:newsId", async (req, res) => {
  try {
    const GetSingleNews = await AllNewsModal.findById(req.params.newsId);
    res.json({
      success: true,
      singleNewsData: GetSingleNews,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// delete single new news from mongon db end
router.delete("/news/all/:newsId", async (req, res) => {
  try {
    const RemoveSingleNews = await AllNewsModal.deleteOne({
      _id: req.params.newsId,
    });
    res.json(RemoveSingleNews);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// delete complete collection of news from mongon db
router.post("/news/all/delete", async (req, res) => {
  try {
    const RemoveAllNews = await AllNewsModal.deleteMany({});
    res.send(RemoveAllNews);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// patch single new news from mongon db end
router.patch("/news/all/:newsid", async (req, res) => {
  try {
    const RemoveSingleNews = await AllNewsModal.updateOne(
      {
        _id: req.params.newsid,
      },
      {
        $set: {
          title: req.body.title,
        },
      }
    );
    res.json(RemoveSingleNews);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

module.exports = router;
