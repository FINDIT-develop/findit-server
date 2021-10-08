module.exports = function(app) {
    const user = require('./videoController');


    // 영상 조회 API
    app.get('/app/video/:id', video.getVideos);

}