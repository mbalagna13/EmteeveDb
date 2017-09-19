const db = require('./index');

const messages = db.get('messages')
const viewers = db.get('viewer')
const viewrooms = db.get('viewrooms')

module.exports = {
getAllMessages() {
  return messages.find({});
  // return messages.aggregate([
  //   {
  //     $lookup:
  //       {
  //         from: 'viewer',
  //         localField: "viewer_name",
  //         foreignField: 'viewer_name',
  //         as: "viewer_info"
  //       }
  //   }
  // ])
},
getMessagesByRoom(id) {
  // return messages.find({viewroom_id: id})
  return messages.aggregate([{
    $match: { viewroom_id: id }
  }, {
    $lookup:
      {
        from: 'viewer',
        localField: "viewer_name",
        foreignField: "viewer_name",
        as: "viewer_info"
      }
  }])
},
getAllViewers() {
  return viewers.find({})
},
getViewerByName(name) {
  return viewers.find({viewer_name: name})
},
getViewerMessages(id) {
  return messages.find({viewer_id:id})
},
create(message) {
  return messages.insert(message)
},
getAllViewrooms() {
  return viewrooms.find({})
},
createNewViewer(viewer) {
  return viewers.insert(viewer)
},
getViewRoomByName(name) {
  return viewrooms.find({viewroom_name:name})
},
createViewRoom(viewroom) {
  return viewrooms.insert(viewroom)
}
}




// db.users.aggregate([{
//   $project: {
//     "fullName": {
//       $concat: ["$firstName", " ", "$lastName"]
//     },
//     "country": "$country"
//   }
// }, {
//   $lookup: {
//     from: "countries",
//     localField: "country",
//     foreignField: "_id",
//     as: "country"
//   }
// }])
