import axios from "axios";

const URL =
  "https://0x057hq0se.execute-api.ap-northeast-2.amazonaws.com/api";

export const searchNails = async (input: string, size: number = 10) => {
    const response = await axios.get(`${URL}/v1/search/nails`, {
      params: {
        input,
        size,
      },
    });
    return response.data;
};

export const searchHashtags = async (input: string, size: number = 10) => {
    const response = await axios.get(`${URL}/v1/search/hashtags`, {
      params: {
        input,
        size,
      },
    });
    return response.data;
};

export const searchRecommendList = async (input: string) => {
  const response = await axios.get(`${URL}/v1/search`, {
    params: {
      input,
    },
  });
  return response.data;
};
