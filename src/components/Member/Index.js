import Register from './Register';
import Login from './Login';
function Index(props) {
  return (
    <>
      <Login/>
      <div class="col-sm-1">
			  <h2 class="or">OR</h2>
		  </div>
      <Register/>
    </>
  )
}
export default Index;