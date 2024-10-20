import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const useDayjs = (postCreatedDate) => {
  return dayjs(postCreatedDate.toDate()).fromNow();
};

export default useDayjs;
