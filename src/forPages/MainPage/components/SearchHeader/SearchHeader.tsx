import "./style.scss";
import Link from "next/link";

const SearchHeader = () => {
  return (
    <div className="titleContainer">
      <h1 className="title">Test creator</h1>
      <Link href="/create-new-test">Add new Test</Link>
    </div>
  );
};

export default SearchHeader;
