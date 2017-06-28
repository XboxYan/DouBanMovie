# 豆瓣电影RN客户端 API接口抓包

## 首页

### 请求示例

> http://116.62.150.164/newmovie/api/index

### 返回示例

#### 参数说明

* doubanTopicList(推荐)
  * movie_score(高分电影)
  * movie_free_stream(免费在线观看的新片)
  * movie_latest(近期值得观看的电影)
  * 1818(6月豆瓣电影口碑榜Top20)
* suggestions(猜你喜欢)
* doubanList(发现好电影)

```json

{
  "code": 0,
  "message": "return index data.",
  "body": {
    "doubanList": [
      {
        "followers_count": 186349,
        "id": "968362",
        "title": "同时入选IMDB250和豆瓣电影250的电影",
        "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/968362/20161004213224?imageView2/2/q/80/w/300/h/300/format/webp"
      },
      {
        "followers_count": 51239,
        "id": "16002",
        "title": "带你进入不正常的世界",
        "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/16002/20170306154617?imageView2/2/q/80/w/300/h/300/format/webp"
      },
      {
        "followers_count": 21302,
        "id": "190343",
        "title": "用电【影】来祭奠逝去的岁月",
        "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/190343/20170410231828?imageView2/2/q/80/w/300/h/300/format/webp"
      },
      {
        "followers_count": 13469,
        "id": "1125971",
        "title": "女孩们的故事【电影】",
        "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/1125971/20170430201124?imageView2/2/q/80/w/300/h/300/format/webp"
      },
      {
        "followers_count": 16261,
        "id": "4253902",
        "title": "科幻是未来的钥匙——科幻启示录【科幻题材】",
        "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/4253902/20150614015846?imageView2/2/q/80/w/300/h/300/format/webp"
      }
    ],
    "doubanTopicList": [
      {
        "subjects": [
          {
            "score": 8.3,
            "doubanId": "25765735",
            "topicId": "_25765735",
            "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2431980130.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "金刚狼3：殊死一战",
            "show": true,
            "index": 2,
            "pid": "movie_score",
            "movieId": 25765735,
            "id": 8828,
            "v3Show": true
          },
          {
            "score": 8.1,
            "doubanId": "26145033",
            "topicId": "_26145033",
            "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2417949761.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "乐高蝙蝠侠大电影",
            "show": true,
            "index": 3,
            "pid": "movie_score",
            "movieId": 26145033,
            "id": 8949,
            "v3Show": true
          },
          {
            "score": 8.1,
            "doubanId": "26389928",
            "topicId": "_26389928",
            "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2394211986.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "二十世纪女人",
            "show": true,
            "index": 7,
            "pid": "movie_score",
            "movieId": 26389928,
            "id": 8753,
            "v3Show": true
          }
        ],
        "name": "高分电影",
        "id": "movie_score"
      },
      {
        "subjects": [
          {
            "score": 8.7,
            "doubanId": "26325320",
            "topicId": "_26325320",
            "img": "https://qnmob2.doubanio.com/view/photo/large/public/p2397337958.jpg?imageView2/2/q/80/w/409/h/600/format/webp",
            "album": false,
            "name": "血战钢锯岭",
            "show": true,
            "index": 2,
            "pid": "movie_free_stream",
            "movieId": 26325320,
            "id": 8916,
            "v3Show": true
          },
          {
            "score": 6.8,
            "doubanId": "25824009",
            "topicId": "_25824009",
            "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2393776153.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "脑残粉电影",
            "show": true,
            "index": 3,
            "pid": "movie_free_stream",
            "movieId": 25824009,
            "id": 8756,
            "v3Show": true
          },
          {
            "score": 6.5,
            "doubanId": "26831711",
            "topicId": "_26831711",
            "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2414358483.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "熊出没·奇幻空间",
            "show": true,
            "index": 3,
            "pid": "movie_free_stream",
            "movieId": 26831711,
            "id": 8914,
            "v3Show": true
          }
        ],
        "name": "免费在线观看的新片",
        "id": "movie_free_stream"
      },
      {
        "subjects": [
          {
            "score": 6.2,
            "doubanId": "3656884",
            "topicId": "_3656884",
            "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2364970628.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "婚宴桌牌19号",
            "show": true,
            "index": 4,
            "pid": "movie_latest",
            "movieId": 3656884,
            "id": 8959,
            "v3Show": true
          },
          {
            "score": 6.0,
            "doubanId": "11518990",
            "topicId": "_11518990",
            "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2458748574.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "战争机器",
            "show": true,
            "index": 5,
            "pid": "movie_latest",
            "movieId": 11518990,
            "id": 8960,
            "v3Show": true
          },
          {
            "score": 5.3,
            "doubanId": "26253606",
            "topicId": "_26253606",
            "img": "https://qnmob2.doubanio.com/view/photo/large/public/p2377429526.jpg?imageView2/2/q/80/w/405/h/600/format/webp",
            "album": false,
            "name": "育阴房",
            "show": true,
            "index": 7,
            "pid": "movie_latest",
            "movieId": 26253606,
            "id": 8732,
            "v3Show": true
          }
        ],
        "name": "近期值得观看的电影",
        "id": "movie_latest"
      },
      {
        "subjects": [
          {
            "score": 8.3,
            "doubanId": "25921812",
            "topicId": "_25921812",
            "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2393044761.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "驴得水",
            "show": true,
            "index": 1,
            "pid": "1818",
            "movieId": 25921812,
            "id": 7465,
            "v3Show": true
          },
          {
            "score": 8.3,
            "doubanId": "26810837",
            "topicId": "_26810837",
            "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2264955151.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "为你取名的那一天",
            "show": true,
            "index": 2,
            "pid": "1818",
            "movieId": 26810837,
            "id": 7466,
            "v3Show": true
          },
          {
            "score": 7.8,
            "doubanId": "25834735",
            "topicId": "_25834735",
            "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2341555072.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
            "album": false,
            "name": "神奇队长",
            "show": true,
            "index": 3,
            "pid": "1818",
            "movieId": 25834735,
            "id": 7467,
            "v3Show": true
          }
        ],
        "name": "6月豆瓣电影口碑榜Top20",
        "id": "1818"
      }
    ],
    "suggestions": [
      {
        "score": 5.7,
        "doubanId": "26290381",
        "topicId": "_26290381",
        "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2312396187.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
        "album": false,
        "name": "果宝特攻之水果大逃亡",
        "show": true,
        "movieId": 26290381,
        "v3Show": true,
        "desc": "王巍(导演)/赖虹宇/祖晴/鞠月斌/申克/王巍/陆双/邓红/廖晨翕/李团/赵然/陈轶/喜剧/动画/冒险/2016-01-23(中国大陆)"
      },
      {
        "score": 7.5,
        "doubanId": "26611806",
        "topicId": "_26611806",
        "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2418113697.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
        "album": false,
        "name": "贝拉的奇幻花园",
        "show": false,
        "movieId": 26611806,
        "v3Show": true,
        "desc": "Simon Aboud(导演)/杰西卡·布朗·芬德利/安德鲁·斯科特/杰瑞米·艾文/汤姆·威尔金森/安娜·钱斯勒/谢拉·汉考克/伊莲恩·戴维斯/剧情/喜剧/爱情/2016-10-20(斯洛文尼亚)"
      },
      {
        "score": 5.4,
        "doubanId": "25884731",
        "topicId": "_25884731",
        "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2397751556.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
        "album": false,
        "name": "一种谋杀",
        "show": false,
        "movieId": 25884731,
        "v3Show": true,
        "desc": "安迪·戈达德(导演)/海莉·贝内特 Haley Bennett/杰西卡·贝尔/帕特里克·威尔森/托比·琼斯/惊悚/2016"
      },
      {
        "score": 6.2,
        "doubanId": "3656884",
        "topicId": "_3656884",
        "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2364970628.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
        "album": false,
        "name": "婚宴桌牌19号",
        "show": true,
        "movieId": 3656884,
        "v3Show": true,
        "desc": "杰弗里·布里茨(导演)/安娜·肯德里克/阿曼达·克鲁/丽莎·库卓/怀亚特·罗素/托尼·雷沃罗利/斯戴芬·莫昌特/克雷格·罗宾森/玛丽亚·泰耶尔/琼·斯奎布/托马斯·康奎尔/安迪·斯塔尔/喜剧/2017-03-03(美国)"
      },
      {
        "score": 6.0,
        "doubanId": "11518990",
        "topicId": "_11518990",
        "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2458748574.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
        "album": false,
        "name": "战争机器",
        "show": true,
        "movieId": 11518990,
        "v3Show": true,
        "desc": "大卫·米奇欧德(导演)/布拉德·皮特/安东尼·海斯/约翰·马加罗/安东尼·迈克尔·豪尔/艾莫里·科恩/托弗·戈瑞斯/丹尼尔·贝茨/艾蒙·汉道奇/RJ·赛勒/阿兰·卢克/尼古拉斯·琼斯/威尔·保尔特/勒凯斯·斯坦菲尔德/本·金斯利/梅格·提利/蒂尔达·斯文顿/剧情/喜剧/战争/2017-05-26(美国)"
      },
      {
        "score": 6.9,
        "doubanId": "6875268",
        "topicId": "_6875268",
        "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2457098534.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
        "album": false,
        "name": "欺诈圣手",
        "show": false,
        "movieId": 6875268,
        "v3Show": true,
        "desc": "巴瑞·莱文森(导演)/罗伯特·德尼罗/米歇尔·菲佛/汉克·阿扎利亚/克里斯汀·康奈利/亚历桑德罗·尼沃拉/莉莉·拉贝/内森·达罗/凯瑟琳·纳杜奇/凯利·奥科/迈克尔·A.戈尔杰/克莱姆·张/迈克尔·卡斯洛夫/波特兰·赫尔米奇/阿曼达·沃伦/杰弗里·坎特尔/马尔塔·米兰斯/马科·查卡/索菲·冯·海索博格/斯蒂芬·考特尔/剧情/传记/历史/2017-05-20(美国)"
      }
    ]
  }
}

```

## 更多榜单

### 请求示例

> http://43.241.227.35/api/more_doubantopic_list?page=1&pageSize=15

### 返回示例

```json

{
	"code": 0,
	"message": "return more_doubantopic_list.",
	"body": [
		{
			"subjects": [
				{
					"score": 8.3,
					"doubanId": "25765735",
					"topicId": "_25765735",
					"img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2431980130.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "金刚狼3：殊死一战",
					"show": true,
					"index": 2,
					"pid": "movie_score",
					"movieId": 25765735,
					"id": 8828,
					"v3Show": true
				},
				{
					"score": 8.1,
					"doubanId": "26145033",
					"topicId": "_26145033",
					"img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2417949761.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "乐高蝙蝠侠大电影",
					"show": true,
					"index": 3,
					"pid": "movie_score",
					"movieId": 26145033,
					"id": 8949,
					"v3Show": true
				},
				{
					"score": 8.1,
					"doubanId": "26389928",
					"topicId": "_26389928",
					"img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2394211986.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "二十世纪女人",
					"show": true,
					"index": 7,
					"pid": "movie_score",
					"movieId": 26389928,
					"id": 8753,
					"v3Show": true
				}
			],
			"name": "高分电影",
			"id": "movie_score"
		},
		{
			"subjects": [
				{
					"score": 8.7,
					"doubanId": "26325320",
					"topicId": "_26325320",
					"img": "https://qnmob2.doubanio.com/view/photo/large/public/p2397337958.jpg?imageView2/2/q/80/w/409/h/600/format/webp",
					"album": false,
					"name": "血战钢锯岭",
					"show": true,
					"index": 2,
					"pid": "movie_free_stream",
					"movieId": 26325320,
					"id": 8916,
					"v3Show": true
				},
				{
					"score": 6.8,
					"doubanId": "25824009",
					"topicId": "_25824009",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2393776153.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "脑残粉电影",
					"show": true,
					"index": 3,
					"pid": "movie_free_stream",
					"movieId": 25824009,
					"id": 8756,
					"v3Show": true
				},
				{
					"score": 6.5,
					"doubanId": "26831711",
					"topicId": "_26831711",
					"img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2414358483.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "熊出没·奇幻空间",
					"show": true,
					"index": 3,
					"pid": "movie_free_stream",
					"movieId": 26831711,
					"id": 8914,
					"v3Show": true
				}
			],
			"name": "免费在线观看的新片",
			"id": "movie_free_stream"
		},
		{
			"subjects": [
				{
					"score": 6.2,
					"doubanId": "3656884",
					"topicId": "_3656884",
					"img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2364970628.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "婚宴桌牌19号",
					"show": true,
					"index": 4,
					"pid": "movie_latest",
					"movieId": 3656884,
					"id": 8959,
					"v3Show": true
				},
				{
					"score": 6.0,
					"doubanId": "11518990",
					"topicId": "_11518990",
					"img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2458748574.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "战争机器",
					"show": true,
					"index": 5,
					"pid": "movie_latest",
					"movieId": 11518990,
					"id": 8960,
					"v3Show": true
				},
				{
					"score": 5.3,
					"doubanId": "26253606",
					"topicId": "_26253606",
					"img": "https://qnmob2.doubanio.com/view/photo/large/public/p2377429526.jpg?imageView2/2/q/80/w/405/h/600/format/webp",
					"album": false,
					"name": "育阴房",
					"show": true,
					"index": 7,
					"pid": "movie_latest",
					"movieId": 26253606,
					"id": 8732,
					"v3Show": true
				}
			],
			"name": "近期值得观看的电影",
			"id": "movie_latest"
		},
		{
			"subjects": [
				{
					"score": 8.3,
					"doubanId": "25921812",
					"topicId": "_25921812",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2393044761.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "驴得水",
					"show": true,
					"index": 1,
					"pid": "1818",
					"movieId": 25921812,
					"id": 7465,
					"v3Show": true
				},
				{
					"score": 8.3,
					"doubanId": "26810837",
					"topicId": "_26810837",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2264955151.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "为你取名的那一天",
					"show": true,
					"index": 2,
					"pid": "1818",
					"movieId": 26810837,
					"id": 7466,
					"v3Show": true
				},
				{
					"score": 7.8,
					"doubanId": "25834735",
					"topicId": "_25834735",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2341555072.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "神奇队长",
					"show": true,
					"index": 3,
					"pid": "1818",
					"movieId": 25834735,
					"id": 7467,
					"v3Show": true
				}
			],
			"name": "6月豆瓣电影口碑榜Top20",
			"id": "1818"
		},
		{
			"subjects": [
				{
					"score": 6.4,
					"doubanId": "21349301",
					"topicId": "_21349301",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2238540172.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "小混乱",
					"show": true,
					"index": 2,
					"pid": "1691",
					"movieId": 21349301,
					"id": 7549,
					"v3Show": false
				},
				{
					"score": 6.2,
					"doubanId": "19935917",
					"topicId": "_19935917",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2179225642.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "爱的承诺",
					"show": true,
					"index": 3,
					"pid": "1691",
					"movieId": 19935917,
					"id": 7550,
					"v3Show": false
				},
				{
					"score": 8.6,
					"doubanId": "3011235",
					"topicId": "_3011235",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p917846733.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "哈利·波特与死亡圣器(下)",
					"show": true,
					"index": 7,
					"pid": "1691",
					"movieId": 3011235,
					"id": 7554,
					"v3Show": false
				}
			],
			"name": "R.I.P. Alan Rickman",
			"id": "1691"
		},
		{
			"subjects": [
				{
					"score": 7.8,
					"doubanId": "5327268",
					"topicId": "_5327268",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2323258429.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "还魂者",
					"show": true,
					"index": 1,
					"pid": "1690",
					"movieId": 5327268,
					"id": 7580,
					"v3Show": true
				},
				{
					"score": 8.5,
					"doubanId": "3592854",
					"topicId": "_3592854",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2236181653.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "疯狂的麦克斯4：狂暴之路",
					"show": true,
					"index": 2,
					"pid": "1690",
					"movieId": 3592854,
					"id": 7581,
					"v3Show": true
				},
				{
					"score": 8.0,
					"doubanId": "3071604",
					"topicId": "_3071604",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2264778990.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "丹麦女孩",
					"show": true,
					"index": 4,
					"pid": "1690",
					"movieId": 3071604,
					"id": 7583,
					"v3Show": false
				}
			],
			"name": "第88届奥斯卡完整提名名单",
			"id": "1690"
		},
		{
			"subjects": [
				{
					"score": 7.8,
					"doubanId": "5327268",
					"topicId": "_5327268",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2323258429.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "还魂者",
					"show": true,
					"index": 1,
					"pid": "1687",
					"movieId": 5327268,
					"id": 7613,
					"v3Show": true
				},
				{
					"score": 8.4,
					"doubanId": "25864085",
					"topicId": "_25864085",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2280097442.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "火星救援",
					"show": true,
					"index": 2,
					"pid": "1687",
					"movieId": 25864085,
					"id": 7614,
					"v3Show": true
				},
				{
					"score": 7.2,
					"doubanId": "25850443",
					"topicId": "_25850443",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2264942503.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "史蒂夫·乔布斯",
					"show": true,
					"index": 3,
					"pid": "1687",
					"movieId": 25850443,
					"id": 7615,
					"v3Show": true
				}
			],
			"name": "2016第73届【金球奖】电影类获奖名单",
			"id": "1687"
		},
		{
			"subjects": [
				{
					"score": 7.4,
					"doubanId": "26259635",
					"topicId": "_26259635",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2315270637.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "恋人们2015",
					"show": true,
					"index": 1,
					"pid": "1680",
					"movieId": 26259635,
					"id": 7649,
					"v3Show": true
				},
				{
					"score": 8.6,
					"doubanId": "25895901",
					"topicId": "_25895901",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2232247487.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "海街日记",
					"show": true,
					"index": 2,
					"pid": "1680",
					"movieId": 25895901,
					"id": 7650,
					"v3Show": true
				},
				{
					"score": 6.4,
					"doubanId": "25851628",
					"topicId": "_25851628",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2256819465.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "岸边之旅",
					"show": true,
					"index": 3,
					"pid": "1680",
					"movieId": 25851628,
					"id": 7651,
					"v3Show": true
				}
			],
			"name": "日本《电影旬报》2015年电影十佳",
			"id": "1680"
		},
		{
			"subjects": [
				{
					"score": 7.8,
					"doubanId": "5327268",
					"topicId": "_5327268",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2323258429.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "还魂者",
					"show": true,
					"index": 1,
					"pid": "1591",
					"movieId": 5327268,
					"id": 7658,
					"v3Show": true
				},
				{
					"score": 8.4,
					"doubanId": "25864085",
					"topicId": "_25864085",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2280097442.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "火星救援",
					"show": true,
					"index": 2,
					"pid": "1591",
					"movieId": 25864085,
					"id": 7659,
					"v3Show": true
				},
				{
					"score": 7.2,
					"doubanId": "25850443",
					"topicId": "_25850443",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2264942503.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "史蒂夫·乔布斯",
					"show": true,
					"index": 3,
					"pid": "1591",
					"movieId": 25850443,
					"id": 7660,
					"v3Show": true
				}
			],
			"name": "第73届【金球奖】完整提名名单",
			"id": "1591"
		},
		{
			"subjects": [
				{
					"score": 9.1,
					"doubanId": "26276373",
					"topicId": "_26276373",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2286660380.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "攀登梅鲁峰",
					"show": true,
					"index": 1,
					"pid": "1548",
					"movieId": 26276373,
					"id": 7694,
					"v3Show": true
				},
				{
					"score": 8.8,
					"doubanId": "26582012",
					"topicId": "_26582012",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2287790296.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "人类2015",
					"show": true,
					"index": 2,
					"pid": "1548",
					"movieId": 26582012,
					"id": 7695,
					"v3Show": false
				},
				{
					"score": 7.8,
					"doubanId": "26366465",
					"topicId": "_26366465",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2285115802.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "我的少女时代",
					"show": true,
					"index": 3,
					"pid": "1548",
					"movieId": 26366465,
					"id": 7696,
					"v3Show": false
				}
			],
			"name": "11月豆瓣电影口碑榜Top20",
			"id": "1548"
		},
		{
			"subjects": [
				{
					"score": 8.2,
					"doubanId": "10757577",
					"topicId": "_10757577",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2312679154.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "卡萝尔电影",
					"show": true,
					"index": 1,
					"pid": "1535",
					"movieId": 10757577,
					"id": 7710,
					"v3Show": true
				},
				{
					"score": 8.5,
					"doubanId": "3592854",
					"topicId": "_3592854",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2236181653.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "疯狂的麦克斯4：狂暴之路",
					"show": true,
					"index": 2,
					"pid": "1535",
					"movieId": 3592854,
					"id": 7711,
					"v3Show": true
				},
				{
					"score": 6.9,
					"doubanId": "21323277",
					"topicId": "_21323277",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2266671669.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "幻梦墓园",
					"show": true,
					"index": 4,
					"pid": "1535",
					"movieId": 21323277,
					"id": 7713,
					"v3Show": true
				}
			],
			"name": "《视与听》2015年度电影二十佳",
			"id": "1535"
		},
		{
			"subjects": [
				{
					"score": 7.3,
					"doubanId": "25966085",
					"topicId": "_25966085",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2283225569.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "踏血寻梅",
					"show": true,
					"index": 3,
					"pid": "1522",
					"movieId": 25966085,
					"id": 7727,
					"v3Show": true
				},
				{
					"score": 7.7,
					"doubanId": "26337866",
					"topicId": "_26337866",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2366570716.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "路边野餐",
					"show": true,
					"index": 4,
					"pid": "1522",
					"movieId": 26337866,
					"id": 7728,
					"v3Show": true
				},
				{
					"score": 7.8,
					"doubanId": "25890005",
					"topicId": "_25890005",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2274320140.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "山河故人",
					"show": true,
					"index": 5,
					"pid": "1522",
					"movieId": 25890005,
					"id": 7729,
					"v3Show": true
				}
			],
			"name": "第52届金马奖获奖名单",
			"id": "1522"
		},
		{
			"subjects": [
				{
					"score": 8.0,
					"doubanId": "25958704",
					"topicId": "_25958704",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2240337400.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "超新约全书",
					"show": true,
					"index": 3,
					"pid": "1445",
					"movieId": 25958704,
					"id": 7735,
					"v3Show": false
				},
				{
					"score": 6.2,
					"doubanId": "25886314",
					"topicId": "_25886314",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2257837251.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "六百英里",
					"show": true,
					"index": 4,
					"pid": "1445",
					"movieId": 25886314,
					"id": 7736,
					"v3Show": true
				},
				{
					"score": 7.8,
					"doubanId": "26356488",
					"topicId": "_26356488",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2235658882.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "1944",
					"show": true,
					"index": 5,
					"pid": "1445",
					"movieId": 26356488,
					"id": 7737,
					"v3Show": false
				}
			],
			"name": "2016年奥斯卡外语片申报名单",
			"id": "1445"
		},
		{
			"subjects": [
				{
					"score": 7.3,
					"doubanId": "11524967",
					"topicId": "_11524967",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2356015154.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "海底总动员2",
					"show": true,
					"index": 1,
					"pid": "1444",
					"movieId": 1291586,
					"id": 8705,
					"v3Show": true
				},
				{
					"score": 7.1,
					"doubanId": "6875863",
					"topicId": "_6875863",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2271505111.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "恐龙当家",
					"show": true,
					"index": 2,
					"pid": "1444",
					"movieId": 6875863,
					"id": 7757,
					"v3Show": true
				},
				{
					"score": 8.7,
					"doubanId": "10533913",
					"topicId": "_10533913",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2266293606.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "头脑特工队",
					"show": true,
					"index": 3,
					"pid": "1444",
					"movieId": 10533913,
					"id": 7758,
					"v3Show": true
				}
			],
			"name": "动画，还是要看皮克斯！",
			"id": "1444"
		},
		{
			"subjects": [
				{
					"score": 9.6,
					"doubanId": "1393859",
					"topicId": "_1393859",
					"img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2186920269.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
					"album": false,
					"name": "老友记 第一季",
					"show": true,
					"index": 1,
					"pid": "1410",
					"movieId": 1393859,
					"id": 7773,
					"v3Show": false
				},
				{
					"score": 9.2,
					"doubanId": "1887452",
					"topicId": "_1887452",
					"img": "https://img1.doubanio.com/lpic/s2397818.jpg",
					"album": false,
					"name": "周六夜现场 第一季",
					"show": true,
					"index": 2,
					"pid": "1410",
					"movieId": 1887452,
					"id": 7774,
					"v3Show": false
				},
				{
					"score": 9.0,
					"doubanId": "1418197",
					"topicId": "_1418197",
					"img": "https://img5.doubanio.com/lpic/s3204836.jpg",
					"album": false,
					"name": "辛普森一家  第一季",
					"show": true,
					"index": 3,
					"pid": "1410",
					"movieId": 1418197,
					"id": 7775,
					"v3Show": false
				}
			],
			"name": "好莱坞电视剧集100佳",
			"id": "1410"
		}
	]
}

```

## 推荐更多

### 请求示例

#### 参数说明

* id=movie_score

> http://116.62.150.164/newmovie/api/more_douban_topic_items?id=movie_score&page=1&pageSize=15

### 返回示例

```json

{
  "code": 0,
  "message": "return more douban topic items",
  "body": [
    {
      "score": 8.3,
      "doubanId": "25765735",
      "topicId": "_25765735",
      "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2431980130.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "金刚狼3：殊死一战",
      "show": true,
      "index": 2,
      "pid": "movie_score",
      "movieId": 25765735,
      "id": 8828,
      "v3Show": true
    },
    {
      "score": 8.1,
      "doubanId": "26145033",
      "topicId": "_26145033",
      "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2417949761.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "乐高蝙蝠侠大电影",
      "show": true,
      "index": 3,
      "pid": "movie_score",
      "movieId": 26145033,
      "id": 8949,
      "v3Show": true
    },
    {
      "score": 8.1,
      "doubanId": "26389928",
      "topicId": "_26389928",
      "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2394211986.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "二十世纪女人",
      "show": true,
      "index": 7,
      "pid": "movie_score",
      "movieId": 26389928,
      "id": 8753,
      "v3Show": true
    },
    {
      "score": 8.0,
      "doubanId": "26357945",
      "topicId": "_26357945",
      "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2407206525.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "爱国者日",
      "show": true,
      "index": 7,
      "pid": "movie_score",
      "movieId": 26357945,
      "id": 8805,
      "v3Show": true
    },
    {
      "score": 8.3,
      "doubanId": "25921812",
      "topicId": "_25921812",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2393044761.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "驴得水",
      "show": true,
      "index": 11,
      "pid": "movie_score",
      "movieId": 25921812,
      "id": 6793,
      "v3Show": true
    },
    {
      "score": 8.5,
      "doubanId": "5327189",
      "topicId": "_5327189",
      "img": "https://qnmob.doubanio.com/view/photo/large/public/p2393950202.jpg?imageView2/2/q/80/w/400/h/633/format/webp",
      "album": false,
      "name": "埃塞尔与欧内斯特",
      "show": true,
      "index": 13,
      "pid": "movie_score",
      "movieId": 5327189,
      "id": 8632,
      "v3Show": true
    },
    {
      "score": 8.1,
      "doubanId": "25815034",
      "topicId": "_25815034",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2380677316.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "湄公河行动",
      "show": true,
      "index": 14,
      "pid": "movie_score",
      "movieId": 25815034,
      "id": 6794,
      "v3Show": true
    },
    {
      "score": 8.3,
      "doubanId": "26354572",
      "topicId": "_26354572",
      "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2411622136.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "欢乐好声音",
      "show": true,
      "index": 18,
      "pid": "movie_score",
      "movieId": 26354572,
      "id": 8754,
      "v3Show": false
    },
    {
      "score": 8.3,
      "doubanId": "26416603",
      "topicId": "_26416603",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2403319543.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "萨利机长",
      "show": true,
      "index": 19,
      "pid": "movie_score",
      "movieId": 26416603,
      "id": 6795,
      "v3Show": true
    },
    {
      "score": 8.7,
      "doubanId": "25980443",
      "topicId": "_25980443",
      "img": "https://qnmob.doubanio.com/view/photo/large/public/p2377575984.jpg?imageView2/2/q/80/w/1079/h/1600/format/webp",
      "album": false,
      "name": "海边的曼彻斯特",
      "show": true,
      "index": 20,
      "pid": "movie_score",
      "movieId": 25980443,
      "id": 8635,
      "v3Show": true
    },
    {
      "score": 7.9,
      "doubanId": "26616719",
      "topicId": "_26616719",
      "img": "https://qnmob.doubanio.com/view/photo/large/public/p2383307897.jpg?imageView2/2/q/80/w/1174/h/1600/format/webp",
      "album": false,
      "name": "弗兰兹2016",
      "show": true,
      "index": 22,
      "pid": "movie_score",
      "movieId": 26616719,
      "id": 8636,
      "v3Show": true
    },
    {
      "score": 8.9,
      "doubanId": "25934014",
      "topicId": "_25934014",
      "img": "https://qnmob.doubanio.com/view/photo/large/public/p2411858267.jpg?imageView2/2/q/80/w/1127/h/1600/format/webp",
      "album": false,
      "name": "爱乐之城",
      "show": true,
      "index": 23,
      "pid": "movie_score",
      "movieId": 25934014,
      "id": 8637,
      "v3Show": true
    },
    {
      "score": 8.6,
      "doubanId": "26683290",
      "topicId": "_26683290",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2395733377.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "你的名字",
      "show": true,
      "index": 24,
      "pid": "movie_score",
      "movieId": 26683290,
      "id": 6796,
      "v3Show": true
    },
    {
      "score": 8.2,
      "doubanId": "25986180",
      "topicId": "_25986180",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2360940399.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "釜山行",
      "show": true,
      "index": 29,
      "pid": "movie_score",
      "movieId": 25986180,
      "id": 6801,
      "v3Show": true
    },
    {
      "score": 8.2,
      "doubanId": "26779555",
      "topicId": "_26779555",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2339616226.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "name": "柠檬水",
      "show": true,
      "index": 31,
      "pid": "movie_score",
      "movieId": 26779555,
      "id": 6802,
      "v3Show": false
    }
  ]
}

```

## 发现好电影更多

### 请求示例

> http://116.62.150.164/newmovie/api/more_doulist?page=1&pageSize=15

### 返回示例

```json

{
  "code": 0,
  "message": "return more_doubantopic_list.",
  "body": [
    {
      "followers_count": 186349,
      "id": "968362",
      "title": "同时入选IMDB250和豆瓣电影250的电影",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/968362/20161004213224?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 51239,
      "id": "16002",
      "title": "带你进入不正常的世界",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/16002/20170306154617?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 21302,
      "id": "190343",
      "title": "用电【影】来祭奠逝去的岁月",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/190343/20170410231828?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 13469,
      "id": "1125971",
      "title": "女孩们的故事【电影】",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/1125971/20170430201124?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 16261,
      "id": "4253902",
      "title": "科幻是未来的钥匙——科幻启示录【科幻题材】",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/4253902/20150614015846?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 14926,
      "id": "121326",
      "title": "美国生活面面观",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/121326/20160815053658?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 3247,
      "id": "37479562",
      "title": "2015终极期待",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/37479562/20160329111912?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 14382,
      "id": "458087",
      "title": "经典韩国电影——收集100部",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/458087/20161020184334?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 23991,
      "id": "168119",
      "title": "电影上的“三部曲”系列~~",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/168119/20150513103114?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 176644,
      "id": "1760163",
      "title": "看过多少烂片才能捞出这些好片",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/1760163/20170504212208?imageView2/2/q/80/w/300/h/300/format/webp"
    },
    {
      "followers_count": 119198,
      "id": "38005034",
      "title": "10分钟就让你【欲罢不能】的高分电影",
      "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/38005034/20170418235553?imageView2/2/q/80/w/300/h/300/format/webp"
    }
  ]
}

```

## 发现好电影列表详情

### 请求示例

> http://116.62.150.164/newmovie/api/doulist_info?id=968362

### 返回示例

```json

{
  "code": 0,
  "message": "return more douban list info",
  "body": {
    "followers_count": 186349,
    "id": "968362",
    "title": "同时入选IMDB250和豆瓣电影250的电影",
    "merged_cover_url": "https://qnmob2.doubanio.com/dae/frodo/img_handler/doulist_cover/968362/20161004213224?imageView2/2/q/80/w/300/h/300/format/webp",
    "desc": "同时入选IMDB250和豆瓣电影250的电影\r\n2016年3月30日更新\r\n感谢影迷朋友对这个豆列的支持，已经有超过50000人关注了，今天根据IMDB250和豆瓣电影250最新排名进行更新，并增加了其他只进入IMDBtop100或豆瓣电影top100的影片，希望大家继续支持。\r\n\r\n超过3 部电影入选的导演统计：\r\n克里斯托弗·诺兰 （6部）：同时入选IMDB250和豆瓣电影250的电影 盗梦空间   蝙蝠侠：黑暗骑士  蝙蝠侠：黑暗骑士崛起  星际穿越  致命魔术  记忆碎片\r\n宫崎骏 （6部）：同时入选IMDB250和豆瓣电影250的电影   千与千寻  龙猫  幽灵公主  天空之城  哈尔的移动城堡  进入IMDBtop100或豆瓣电影top100的电影   风之谷\r\n斯坦利·库布里克（6部）：同时入选IMDB250和豆瓣电影250的电影   发条橙   进入IMDBtop100或豆瓣电影top100的电影  2001太空漫游  奇爱博士  闪灵  光荣之路  全金属外壳\r\n昆汀·塔伦蒂诺 （5部）：同时入选IMDB250和豆瓣电影250的电影：低俗小说  无耻混蛋  被解救的姜戈   罪恶之城（合拍）进入IMDBtop100或豆瓣电影top100的电影  落水狗\r\n史蒂文·斯皮尔伯格（4部）：同时入选IMDB250和豆瓣电影250的电影：辛德勒的名单  拯救大兵瑞恩  猫鼠游戏  进入IMDBtop100或豆瓣电影top100的电影  夺宝奇兵  \r\n大卫·芬奇（4部）：同时入选IMDB250和豆瓣电影250的电影：搏击俱乐部  七宗罪   消失的爱人  进入IMDBtop100或豆瓣电影top100的电影  本杰明·巴顿奇事\r\n查理·卓别林（4部）：同时入选IMDB250和豆瓣电影250的电影：城市之光  摩登时代 进入IMDBtop100或豆瓣电影top100的电影 大独裁者  寻子遇仙记\r\n希区柯克（4部）：同时入选IMDB250和豆瓣电影250的电影：惊魂记  进入IMDBtop100或豆瓣电影top100的电影  后窗 迷魂记  西北偏北\r\n赛尔乔·莱翁内（4部）：同时入选IMDB250和豆瓣电影250的电影：美国往事  黄金三镖客 进入IMDBtop100或豆瓣电影top100的电影  西部往事  黄昏双镖客\r\n詹姆斯·卡梅隆（4部）：同时入选IMDB250和豆瓣电影250的电影：终结者2   进入IMDBtop100或豆瓣电影top100的电影 泰坦尼克号 阿凡达  异形2\r\n比利·怀尔德（4部）：同时入选IMDB250和豆瓣电影250的电影：控方证人   进入IMDBtop100或豆瓣电影top100的电影 日落大道  双重赔偿  桃色公寓\r\n马丁·斯科塞斯 （4部）：进入IMDBtop100或豆瓣电影top100的电影  出租车司机  好家伙   禁闭岛  无间道风云"
  }
}

```

## 发现好电影详情

### 请求示例

> http://116.62.150.164/newmovie/api/doulist_items?id=968362&page=1&pageSize=15

### 返回示例

```json

{
  "code": 0,
  "message": "return doulist items.",
  "body": [
    {
      "movieDesc": "弗兰克·德拉邦特(导演)/蒂姆·罗宾斯/摩根·弗里曼/鲍勃·冈顿/犯罪/剧情/1994-09-10(多伦多电影节)",
      "doubanId": "1292052",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p480747492.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 1,
      "pid": "968362",
      "movieId": 1292052,
      "v3Show": true,
      "score": 9.6,
      "topicId": "_1292052",
      "name": "肖申克的救赎",
      "comment": "同时进入IMDBtop10和豆瓣电影top10的电影：\r\n豆瓣电影250NO.1  IMDB250NO.1  ",
      "id": 2076
    },
    {
      "movieDesc": "史蒂文·斯皮尔伯格(导演)/连姆·尼森/本·金斯利/拉尔夫·费因斯/剧情/历史/战争/1993-11-30(华盛顿首映)",
      "doubanId": "1295124",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p492406163.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 2,
      "pid": "968362",
      "movieId": 1295124,
      "v3Show": false,
      "score": 9.4,
      "topicId": "_1295124",
      "name": "辛德勒的名单",
      "comment": "豆瓣电影250NO.7, IMDB250NO.5",
      "id": 2077
    },
    {
      "movieDesc": "西德尼·吕美特(导演)/亨利·方达/马丁·鲍尔萨姆/约翰·菲尔德/剧情/1957-04-13(美国)",
      "doubanId": "1293182",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2173577632.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 7,
      "pid": "968362",
      "movieId": 1293182,
      "v3Show": false,
      "score": 9.3,
      "topicId": "_1293182",
      "name": "十二怒汉美版",
      "comment": "豆瓣电影250NO.26, IMDB250NO.6",
      "id": 2082
    },
    {
      "movieDesc": "克里斯托弗·诺兰(导演)/莱昂纳多·迪卡普里奥/约瑟夫·高登-莱维特/艾伦·佩吉/剧情/动作/科幻/2010-09-01(中国大陆)",
      "doubanId": "3541415",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p513344864.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 9,
      "pid": "968362",
      "movieId": 3541415,
      "v3Show": false,
      "score": 9.2,
      "topicId": "_3541415",
      "name": "盗梦空间",
      "comment": "豆瓣电影250NO.10, IMDB250NO.14",
      "id": 2084
    },
    {
      "movieDesc": "彼得·杰克逊(导演)/维果·莫腾森/伊利亚·伍德/西恩·奥斯汀/剧情/动作/奇幻/2004-03-12(中国大陆)",
      "doubanId": "1291552",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p1910825503.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 10,
      "pid": "968362",
      "movieId": 1291552,
      "v3Show": true,
      "score": 9.1,
      "topicId": "_1291552",
      "name": "魔戒3：王者归来",
      "comment": "豆瓣电影250NO.24, IMDB250NO.8",
      "id": 2085
    },
    {
      "movieDesc": "克里斯托弗·诺兰(导演)/克里斯蒂安·贝尔/希斯·莱杰/艾伦·艾克哈特/剧情/动作/科幻/2008-07-14(纽约首映)",
      "doubanId": "1851857",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p462657443.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 11,
      "pid": "968362",
      "movieId": 1851857,
      "v3Show": true,
      "score": 9.0,
      "topicId": "_1851857",
      "name": "蝙蝠侠前传2：黑暗骑士",
      "comment": "豆瓣电影250NO.38, IMDB250NO.4",
      "id": 2086
    },
    {
      "movieDesc": "安德鲁·斯坦顿(导演)/本·贝尔特/艾丽莎·奈特/杰夫·格尔林/喜剧/爱情/科幻/2008-06-27(美国)",
      "doubanId": "2131459",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p449665982.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 13,
      "pid": "968362",
      "movieId": 2131459,
      "v3Show": false,
      "score": 9.3,
      "topicId": "_2131459",
      "name": "机器人总动员",
      "comment": "豆瓣电影250NO.9, IMDB250NO.61",
      "id": 2088
    },
    {
      "movieDesc": "米洛斯·福尔曼(导演)/杰克·尼科尔森/丹尼·德维托/克里斯托弗·洛伊德/剧情/1975-11-21(美国)",
      "doubanId": "1292224",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p792238287.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 15,
      "pid": "968362",
      "movieId": 1292224,
      "v3Show": false,
      "score": 9.0,
      "topicId": "_1292224",
      "name": "飞越疯人院",
      "comment": "豆瓣电影250NO.33, IMDB250NO.16",
      "id": 2090
    },
    {
      "movieDesc": "彼得·杰克逊(导演)/伊利亚·伍德/西恩·奥斯汀/伊恩·麦克莱恩/剧情/动作/奇幻/2002-04-04(中国大陆)",
      "doubanId": "1291571",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p1354436051.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 17,
      "pid": "968362",
      "movieId": 1291571,
      "v3Show": true,
      "score": 8.9,
      "topicId": "_1291571",
      "name": "魔戒1：护戒联盟",
      "comment": "豆瓣电影250NO.45, IMDB250NO.11",
      "id": 2092
    },
    {
      "movieDesc": "彼得·杰克逊(导演)/伊利亚·伍德/西恩·奥斯汀/伊恩·麦克莱恩/剧情/动作/奇幻/2003-04-25(中国大陆)",
      "doubanId": "1291572",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p909265336.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 18,
      "pid": "968362",
      "movieId": 1291572,
      "v3Show": true,
      "score": 8.9,
      "topicId": "_1291572",
      "name": "魔戒2：双塔奇谋",
      "comment": "豆瓣电影250NO.46, IMDB250NO.15",
      "id": 2093
    },
    {
      "movieDesc": "奥利维·那卡什(导演)/艾力克·托兰达(导演)/弗朗索瓦·克鲁塞/奥玛·赛/安乐妮/剧情/喜剧/2011-11-02(法国)",
      "doubanId": "6786002",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p1454261925.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 19,
      "pid": "968362",
      "movieId": 6786002,
      "v3Show": false,
      "score": 9.1,
      "topicId": "_6786002",
      "name": "触不可及",
      "comment": "豆瓣电影250NO.23, IMDB250NO.38",
      "id": 2094
    },
    {
      "movieDesc": "莉莉·沃卓斯基(导演)/拉娜·沃卓斯基(导演)/基努·里维斯/凯瑞-安·莫斯/劳伦斯·菲什伯恩/动作/科幻/1999-03-31(美国)",
      "doubanId": "1291843",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p1910908765.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 21,
      "pid": "968362",
      "movieId": 1291843,
      "v3Show": true,
      "score": 8.8,
      "topicId": "_1291843",
      "name": "黑客帝国",
      "comment": "豆瓣电影250NO.68, IMDB250NO.18",
      "id": 2096
    },
    {
      "movieDesc": "乔纳森·戴米(导演)/朱迪·福斯特/安东尼·霍普金斯/斯科特·格伦/剧情/犯罪/惊悚/1991-02-14(美国)",
      "doubanId": "1293544",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p1593414327.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 23,
      "pid": "968362",
      "movieId": 1293544,
      "v3Show": true,
      "score": 8.7,
      "topicId": "_1293544",
      "name": "沉默的羔羊",
      "comment": "豆瓣电影250NO.65, IMDB250NO.23",
      "id": 2098
    },
    {
      "movieDesc": "克里斯托弗·诺兰(导演)/马修·麦康纳/安妮·海瑟薇/杰西卡·查斯坦/剧情/科幻/悬疑/2014-11-12(中国大陆)",
      "doubanId": "1889243",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2206088801.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 25,
      "pid": "968362",
      "movieId": 1889243,
      "v3Show": true,
      "score": 9.1,
      "topicId": "_1889243",
      "name": "星际穿越",
      "comment": "豆瓣电影250NO.67 IMDB250NO.31",
      "id": 2100
    },
    {
      "movieDesc": "史蒂文·斯皮尔伯格(导演)/汤姆·汉克斯/汤姆·塞兹摩尔/爱德华·伯恩斯/剧情/历史/战争/1998-07-24(美国)",
      "doubanId": "1292849",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p1014542496.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "album": false,
      "show": true,
      "index": 26,
      "pid": "968362",
      "movieId": 1292849,
      "v3Show": true,
      "score": 8.8,
      "topicId": "_1292849",
      "name": "拯救大兵瑞恩",
      "comment": "豆瓣电影250NO.69, IMDB250NO.30",
      "id": 2101
    }
  ]
}

```

## 影片详情

### 请求示例

#### 参数说明

* isAlbum=True(剧集)

> http://116.62.150.164/newmovie/api/video?isAlbum=false&videoId=25765735

### 返回示例

```json

{
  "code": 0,
  "message": "return movieInfo",
  "body": {
    "img": "https://qnmob2.doubanio.com/view/movie_poster_cover/lpst/public/p2395733377.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
    "topicId": "_26683290",
    "album": false,
    "movieId": 26683290,
    "videos": [
      {
        "vid": 26683290,
        "playerUrl": "http://43.241.227.35/btmovie/MoviePlay.m3u8?movieid=26683290",
        "infoUrl": "http://www.kankanwu.com/Animation/nidemingzi/",
        "videoName": "你的名字",
        "index": 0,
        "aid": 26683290
      }
    ],
    "desc": "<div class=\"module movie-info\">\n    <div class=\"info\">\n        <span>上映：</span>2016\n        </br>\n        <span class=\"zt\">状态：</span>HD高清\n        </br>\n        <span>类型：</span>动漫 恋爱 剧场 \n        </br>\n        <span>主演：</span>神木隆之介 成田凌 悠木碧 岛崎信长 石川界人 上白石萌音 长泽雅美 市原悦子 \n        </br>\n        <span>地区：</span>日本\n        </br>\n        <span>影片评分：</span>\n        <span>8.5分</span>\n        </br>\n        <span>更新日期：</span>\n        <span>2017-02-23 14:00:15</span>\n        </br>\n    </div>\n    <div class=\"des\">\n        <span>简介：</span>\n        <span class=\"des-all\">　　千年后再度回归的彗星造访地球的一个月前，日本深山的某个乡下小镇。女高中生三叶每天都过着忧郁的生活，而她烦恼的不光有担任镇长的父亲所举行的选举运动，还有家传神社的古老习俗。三叶身居这小镇之中，又处于过多在意周围人目光的年龄，因此对大都市的憧憬日益强烈。 然而某一天，自己做了一 个变成男孩子的梦。这儿有着陌生的房间、陌生的朋友。而眼前出现的则是东京的街道。三叶虽然感到困惑，但是能够来到朝思暮想的都市生活，让她觉得神清气爽。另一方面在东京生活的男高中生立花泷也做了个奇怪的梦。他在一个从未去过的深山小镇中，变成了女高中生。两人就这样在梦中邂逅了彼此。</span>\n\n    </div>\n</div>"
  }
}

```

## 获取影片详情（豆瓣）

### 请求示例

> https://api.douban.com/v2/movie/subject/26577206

### 返回JSON

```json

{
  "rating": {
    "max": 10,
    "average": 8.5,
    "stars": "45",
    "min": 0
  },
  "reviews_count": 4841,
  "wish_count": 104788,
  "douban_site": "",
  "year": "2016",
  "images": {
    "small": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2395733377.webp",
    "large": "https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2395733377.webp",
    "medium": "https://img1.doubanio.com/view/movie_poster_cover/spst/public/p2395733377.webp"
  },
  "alt": "https://movie.douban.com/subject/26683290/",
  "id": "26683290",
  "mobile_url": "https://movie.douban.com/subject/26683290/mobile",
  "title": "你的名字。",
  "do_count": null,
  "share_url": "https://m.douban.com/movie/subject/26683290",
  "seasons_count": null,
  "schedule_url": "",
  "episodes_count": null,
  "countries": [
    "日本"
  ],
  "genres": [
    "剧情",
    "爱情",
    "动画"
  ],
  "collect_count": 380718,
  "casts": [
    {
      "alt": "https://movie.douban.com/celebrity/1185637/",
      "avatars": {
        "small": "https://img1.doubanio.com/img/celebrity/small/13768.jpg",
        "large": "https://img1.doubanio.com/img/celebrity/large/13768.jpg",
        "medium": "https://img1.doubanio.com/img/celebrity/medium/13768.jpg"
      },
      "name": "神木隆之介",
      "id": "1185637"
    },
    {
      "alt": "https://movie.douban.com/celebrity/1316660/",
      "avatars": {
        "small": "https://img1.doubanio.com/img/celebrity/small/1445093052.07.jpg",
        "large": "https://img1.doubanio.com/img/celebrity/large/1445093052.07.jpg",
        "medium": "https://img1.doubanio.com/img/celebrity/medium/1445093052.07.jpg"
      },
      "name": "上白石萌音",
      "id": "1316660"
    },
    {
      "alt": "https://movie.douban.com/celebrity/1018667/",
      "avatars": {
        "small": "https://img3.doubanio.com/img/celebrity/small/183.jpg",
        "large": "https://img3.doubanio.com/img/celebrity/large/183.jpg",
        "medium": "https://img3.doubanio.com/img/celebrity/medium/183.jpg"
      },
      "name": "长泽雅美",
      "id": "1018667"
    },
    {
      "alt": "https://movie.douban.com/celebrity/1008549/",
      "avatars": {
        "small": "https://img3.doubanio.com/img/celebrity/small/40111.jpg",
        "large": "https://img3.doubanio.com/img/celebrity/large/40111.jpg",
        "medium": "https://img3.doubanio.com/img/celebrity/medium/40111.jpg"
      },
      "name": "市原悦子",
      "id": "1008549"
    }
  ],
  "current_season": null,
  "original_title": "君の名は。",
  "summary": "在远离大都会的小山村，住着巫女世家出身的高中女孩宫水三叶（上白石萌音 配音）。校园和家庭的原因本就让她充满烦恼，而近一段时间发生的奇怪事件，又让三叶摸不清头脑。不知从何时起，三叶在梦中就会变成一个住在东京的高中男孩。那里有陌生的同学和朋友，有亲切的前辈和繁华的街道，一切都是如此诱人而真实。另一方面，住在东京的高中男孩立花泷（神木隆之介 配音）则总在梦里来到陌生的小山村，以女孩子的身份过着全新的生活。许是受那颗神秘彗星的影响，立花和三叶在梦中交换了身份。他们以他者的角度体验着对方的人生，这期间有愤怒、有欢笑也有暖心。只是两人并不知道，身份交换的背后隐藏着重大而锥心的秘密……\n本片为2016年度日本本土影片票房冠军。©豆瓣",
  "subtype": "movie",
  "directors": [
    {
      "alt": "https://movie.douban.com/celebrity/1005177/",
      "avatars": {
        "small": "https://img1.doubanio.com/img/celebrity/small/39258.jpg",
        "large": "https://img1.doubanio.com/img/celebrity/large/39258.jpg",
        "medium": "https://img1.doubanio.com/img/celebrity/medium/39258.jpg"
      },
      "name": "新海诚",
      "id": "1005177"
    }
  ],
  "comments_count": 159514,
  "ratings_count": 357504,
  "aka": [
    "你的名字",
    "君之名",
    "Your Name"
  ]
}

```
## 搜索

### 请求示例

> http://116.62.150.164/newmovie/api/videos?keywords=海贼王

### 返回JSON

```json

{
  "code": 0,
  "message": "return movies.",
  "body": [
    {
      "publishTime": 2016,
      "score": 6.5,
      "topicId": "_26834930",
      "doubanId": "26834930",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2386161084.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "movieTypeName": "动漫",
      "album": false,
      "name": "海贼王特别篇黄金之心",
      "movieId": 26834930,
      "status": "HD高清",
      "lastUpdateTime": "2016-07-23 17:32:22"
    },
    {
      "publishTime": 2014,
      "score": 8.1,
      "topicId": "_25975887",
      "doubanId": "25975887",
      "img": "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2198458197.jpg?imageView2/2/q/80/w/600/h/3000/format/webp",
      "movieTypeName": "电影",
      "album": false,
      "name": "海贼王15周年纪念特别篇——幻之篇章「3D2Y 跨越艾斯之死！与路飞伙伴的誓言」",
      "movieId": 25975887,
      "status": "网盘高清",
      "lastUpdateTime": null
    },
    {
      "score": 5.6,
      "img": "http://p4.qhimg.com/d/dy_1cf688c4fd8403a25dc03e6b8ddad9b5.jpg",
      "movieTypeName": "动漫",
      "album": true,
      "name": "航海王",
      "movieId": 1947344084,
      "status": "更新至791集"
    },
    {
      "score": 5.6,
      "img": "http://p6.qhimg.com/d/dy_ab06956a87a4d3e73b9804ec74ed8689.jpg",
      "movieTypeName": "动漫",
      "album": true,
      "name": "海贼王剧场版13",
      "movieId": 1333118431,
      "status": "全1集"
    },
    {
      "score": 5.6,
      "img": "http://p5.qhimg.com/d/dy_b90d77e6f83cc023533267e4f0daa106.jpg",
      "movieTypeName": "动漫",
      "album": true,
      "name": "航海王 TV特别篇 萨博的故事",
      "movieId": 612262450,
      "status": "全1集"
    },
    {
      "score": 5.6,
      "img": "http://p6.qhimg.com/d/dy_eddccba2795ce99915f2fec5321dbe4b.jpg",
      "movieTypeName": "动漫",
      "album": true,
      "name": "航海王 角色日志",
      "movieId": -393831081,
      "status": "全9集"
    },
    {
      "score": 5.6,
      "img": "http://p8.qhimg.com/d/dy_945a3609ab2aeac925c5db76c730729c.jpg",
      "movieTypeName": "动漫",
      "album": true,
      "name": "航海王 TV特别篇 雾之岛冒险",
      "movieId": 491393558,
      "status": "全1集"
    },
    {
      "score": 7.8,
      "img": "http://p2.qhimg.com/d/dy_19224b78a149504f52873b0b7a86f7b5.jpg",
      "movieTypeName": "电影",
      "album": false,
      "name": "航海王之黄金城",
      "movieId": 683000371,
      "status": "电影"
    },
    {
      "score": 5.6,
      "img": "http://p2.qhimg.com/d/dy_ba97cf4656df974aa3480fd7cbdb5579.jpg",
      "movieTypeName": "动漫",
      "album": true,
      "name": "航海王3D2Y",
      "movieId": -1155084028,
      "status": "全1集"
    },
    {
      "score": 5.6,
      "img": "http://p3.qhimg.com/t016dbe46be69c10db8.jpg",
      "movieTypeName": "动漫",
      "album": true,
      "name": "魔侦探洛基",
      "movieId": 45541517,
      "status": "全26集"
    },
    {
      "score": 5.6,
      "img": "http://p4.qhimg.com/d/dy_9c9a499fd8bd3b9d016186f7d60eac58.jpg",
      "movieTypeName": "动漫",
      "album": true,
      "name": "星际海盗",
      "movieId": 1691961051,
      "status": "全12集"
    }
  ]
}

```

## 获取播放串（剧集）

> http://43.241.227.35/btmovie/vparse?url=http://www.le.com/ptv/vplay/26937055.html?ch=360_kan

http://192.168.1.100:8902/MoviePlay?path=http%3A%2F%2F43.241.227.35%2Fbtmovie%2FMoviePlay.m3u8%3Fmovieid%3D1023348483%26index%3D1

转义

http://192.168.1.100:8902/MoviePlay?path=http://43.241.227.35/btmovie/MoviePlay.m3u8?movieid=1023348483&index=1