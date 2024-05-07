import { FC } from "react";
import Link from "next/link";
import { ITestListItem } from "@/forPages/MainPage/components/TestListItem/types";
import "@/forPages/MainPage/style.scss";

const TestListItem: FC<ITestListItem> = ({ test }) => {
  return (
    <li>
      <Link href={`/test/${test.id}`} className="listOfUsers__user">
        <span>{test.title}</span>
        <div style={{ width: "50px", height: "50px" }}>
          <img
            width={50}
            height={50}
            src={"https://avatars.githubusercontent.com/u/86207804?v=4"}
            alt={`${test.title}`}
          />
        </div>
        <span>Test Id: {test.id.slice(0, 4)}</span>
      </Link>
    </li>
  );
};

export default TestListItem;
