import axios from "axios";
import ReadTest from "./components/ReadTest";

export default async function Test({ params }) {
  const response = await axios.get(
    `${process.env.BASE_API_URL}/exercise/${params.id}`,
  )
  return <ReadTest test={response.data} />;
}
