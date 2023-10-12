import LoginStage from "login/LoginStage";
import Register from "login/Register";

export default function Home() {
  return (
    <div>
      <LoginStage/>
      <Register />
      <p class="border border-danger-subtle">
      
      기본화면띄울 곳.</p>

    </div>
  )
}
