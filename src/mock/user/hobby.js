export default {
  url: "/api/hobby", // 匹配的请求 URL 和真实请求的URL完全一致
  method: "post", // 请求方法
  response: (request) => {
    const options = [
      {
        label: "唱歌",
        value: "1",
      },
      {
        label: "跳舞",
        value: "2",
      },
      {
        label: "篮球",
        value: "3",
      },
    ];
    return {
      code: 0,
      msg: "获取字典成功",
      data: options,
    };
  },
};
