const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const FavoriteSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dishes:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:'Dish'
        }
    ]
},
{
    timestamps:true
});

var Favorites=mongoose.model('Favorite',FavoriteSchema);

module.exports=Favorites;