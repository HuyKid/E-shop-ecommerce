import { useEffect, useState } from "react";
import axios from "axios"
import{ Link } from "react-router-dom"

function Blog() {
	const [getItem, setItem] = useState([]);
	useEffect(() => {
		axios.get('http://localhost/laravel/laravel/public/api/blog')
		.then(response => {
			setItem(response.data.blog.data)
		})
		.catch(function (error) {
			console.log(error);
		})
	},[])
	
	function fetchData () {
		if (getItem.length > 0) {
			return getItem.map((value, key) => {
				return(
					<div class="single-blog-post" >
						<h3>{value.title}</h3>
						<div class="post-meta">
							<ul>
								<li><i class="fa fa-user"></i> Mac Doe</li>
								<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
								<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
							</ul>
							<span>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star"></i>
								<i class="fa fa-star-half-o"></i>
							</span>
						</div>
						<a href="">
							<img src={"http://localhost/laravel/laravel/public/upload/Blog/image/"+value.image} alt=""/>
						</a>
						<p>{value.description}</p>
						<a  class="btn btn-primary" href=""><Link to={"/blog/list/detail/"+value.id}>Read more</Link></a>
					</div>
				)
			})
		}
	}
    return(
		<div class="col-sm-9">
			<div class="blog-post-area">
				<h2 class="title text-center">Latest From our Blog</h2>
				{fetchData()}
				<div class="pagination-area">
					<ul class="pagination">
						<li><a href="" class="active">1</a></li>
						<li><a href="">2</a></li>
						<li><a href="">3</a></li>
						<li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
					</ul>
				</div>
			</div>
		</div>
    );
}
export default Blog;
