global.Base = 'http://43.241.227.35/';
global.appVersion = '5.0.7';

const API = {
    //首页
    index:() => `${Base}api/index`,
    //更多榜单
    more_doubantopic_list:({page=1,pageSize=15}) => `${Base}api/more_doubantopic_list?page=${page}&pageSize=${pageSize}`,
    //推荐更多
    more_douban_topic_items:({id='1818',page=1,pageSize=15}) => `${Base}api/more_douban_topic_items?id=${id}&page=${page}&pageSize=${pageSize}`,
    //你可能感兴趣(随机推荐)
    suggestion:({page=Math.random()*28}) => `${Base}api/suggestion?page=${Math.ceil(page)}`,
    //发现好电影更多(douban)
    more_doulist:({page=1,pageSize=15}) => `${Base}api/more_doulist?page=${page}&pageSize=${pageSize}`,
    //发现好电影列表详情摘要(douban)
    doulist_info:({id=''}) => `${Base}api/doulist_info?id=${id}`,
    //发现好电影详情列表
    doulist_items:({id='',page=1,pageSize=15}) => `${Base}api/doulist_items?id=${id}&page=${page}&pageSize=${pageSize}`,
    //影片详情
    video:({isAlbum=false,videoId=''}) => `${Base}api/video?isAlbum=${isAlbum}&videoId=${videoId}`,
    //获取影片详情（豆瓣）
    douban_subject:({id=''}) => `https://api.douban.com/v2/movie/subject/${id}`,
    //搜索
    search:({keywords=''}) => `${Base}api/videos?keywords=${keywords}`
    
}

const fetchData = (url,{headers={'appVersion': appVersion},par = {} } = {},success) => {
    const URL = API[url](par);
    fetch(URL, {
        method: 'GET',
        headers: headers,
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        success(data);
    })
    .catch((err) => {
        console.warn(err);
    })
}

export default fetchData;

