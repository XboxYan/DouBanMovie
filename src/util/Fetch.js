global.Base = 'http://120.55.16.187/newmovie/api/';
global._Base = 'http://120.55.16.187/newmovie/btmovie/';
global.appVersion = '5.3.1';

const API = {
    //首页
    index:() => `${Base}index`,
    //更多榜单
    more_doubantopic_list:({page=1,pageSize=15}) => `${Base}more_doubantopic_list?page=${page}&pageSize=${pageSize}`,
    //推荐更多
    more_douban_topic_items:({id='1818',page=1,pageSize=15}) => `${Base}more_douban_topic_items?id=${id}&page=${page}&pageSize=${pageSize}`,
    //你可能感兴趣(随机推荐)
    suggestion:({page=Math.random()*28}) => `${Base}suggestion?page=${Math.ceil(page)}`,
    //发现好电影更多(douban)
    more_doulist:({page=1,pageSize=15}) => `${Base}more_doulist?page=${page}&pageSize=${pageSize}`,
    //发现好电影列表详情摘要(douban)
    doulist_info:({id=''}) => `${Base}doulist_info?id=${id}`,
    //发现好电影详情列表
    doulist_items:({id='',page=1,pageSize=15}) => `${Base}doulist_items?id=${id}&page=${page}&pageSize=${pageSize}`,
    //影片详情
    video:({videoId='',st='',sn=''}) => `${Base}video?videoId=${videoId}&st=${st}&sn=${sn}`,
    //影片资源
    videosource:({movieId='',type='',name=''}) => `${Base}videosource?movieId=${movieId}&type=${type}&name=${name}`,
    //获取影片详情（豆瓣）
    douban_subject:({id=''}) => `https://api.douban.com/v2/movie/subject/${id}`,
    //搜索
    search:({keywords=''}) => `${Base}videos?keywords=${keywords}`,
    //评论
    get_comments:({id='',start=0,count=5}) => `https://frodo.douban.com/api/v2/movie/${id}/interests?start=${start}&count=${count}&order_by=time`,
    //热门
    hotPlay:({type=0}) => `${Base}hotPlay?type=${type}`,
}

const fetchData = (url,{headers={'appVersion': appVersion},par = {} } = {},success,error=(err)=>{console.warn(err)}) => {
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
        error(err)
    })
}

export default fetchData;

