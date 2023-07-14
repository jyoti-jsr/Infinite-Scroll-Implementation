import "./poststyle.css";

const Post = (props) => {
  const { img, title } = props;
  // Create a new Date object with the current date and time
  const date = new Date();
  // Create an options object for the date formatting
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Format the date string using the options object
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);

  const splitFormattedDate = formattedDate.split(",");
  const data =
    splitFormattedDate[0] + "," + splitFormattedDate[1] + splitFormattedDate[2];

  return (
    <div className="card">
      <div className="img-container">
        <img src={img} height="100%" width="100%" />
      </div>
      <div className="post-container">
        <h4 style={{ color: "#282a2e" }}>{title.substring(0, 70)}...</h4>
        <p style={{ fontWeight: 500, color: "gray" }}>{data} IST</p>
      </div>
    </div>
  );
};
export default Post;
