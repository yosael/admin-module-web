import { useAppSelector } from "../hooks/storeHooks";
import { selectUser } from "../store/userSlice";

export default function Home() {
  const logged = useAppSelector(selectUser);
  return (
    <div className="container">
      <div className="d-flex">
        <h1 className="py-4">Welcome to Admin Module: {logged.name}</h1>
      </div>
    </div>
  );
}
