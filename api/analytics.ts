import api from "./client";
import { User } from "types/model";

const postConfig = (dataToSend) => {
  return {
    method: "post",
    data: dataToSend,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
  };
};

const getConfig = () => {
  return {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export const fetchUserAnalytics = async (
  startDate: string,
  endDate: string
) => {
  const config = getConfig();
  try {
    const result = await api.call(`admin/v1/analytics/users?start_date=` + startDate + `&end_date=` + endDate, config);
    return result;
  } catch (error) {
    throw error;
  }
};
