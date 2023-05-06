import { Navigate, useNavigate } from "react-router-dom";

function MenuAcc() {
	const navigate = useNavigate();
	function account(){
		navigate('/account')
	}
	function product(){
		navigate('/account/product/list')
	}
    return(
		<div class="col-sm-3">
			<div class="left-sidebar">
				<h2>Category</h2>
				<div class="panel-group category-products" id="accordian">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordian" href="" onClick={account}>
									<span class="badge pull-right"><i class="fa fa-plus"></i></span>
									ACCOUNT
								</a>
							</h4>
						</div>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordian" href="" onClick={product}>
									<span class="badge pull-right"><i class="fa fa-plus"></i></span>
									MY PRODUCT
								</a>
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
}
export default MenuAcc;