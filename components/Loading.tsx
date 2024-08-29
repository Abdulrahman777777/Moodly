import { Ellipsis } from "react-css-spinners";

const Loading = () => {
  return (
    <div className="loader fixed w-screen h-screen flex justify-center items-center">
      <Ellipsis size={200} color="blue" />
    </div>
  );
};
export default Loading;
