import React, {useState, useEffect} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import Rate from "./Rate";
import Comment from "./Comment";
import ListComment from "./ListComment";

function Detail(props) {
	let params = useParams();
	const [data, setData] = useState('');
	const [comment, setComment] = useState([]);
	const [listComment, setlistComment] = useState([]);
	const [idRely, setIdRely] = useState('');
	
	useEffect(() => {
		axios.get('http://localhost/laravel/laravel/public/api/blog/detail/'+params.id)
		.then(response => {
			setData(response.data.data);
			setlistComment(response.data.data.comment)
		})
		.catch(function (error){
			console.log(error);
		})
	},[])

	function IdSubComment(Idrep){
		setIdRely(Idrep);
	}

	function getCmt(data){
		console.log(data)
		setlistComment(listComment.concat(data))
	}

	function fetchData () {
		return(
			<div class="single-blog-post">
				<h3>{data.title}</h3>
				<div class="post-meta">
					<ul>
						<li><i class="fa fa-user"></i> Mac Doe</li>
						<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
						<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
					</ul>
				</div>
				<a href=""><img src={"http://localhost/laravel/laravel/public/upload/blog/image/"+data.image} alt=""/></a>
				<p>{data.description}</p> <br/>
				<div class="pager-area">
					<ul class="pager pull-right">
						<li><a href="#">Pre</a></li>
						<li><a href="#">Next</a></li>
					</ul>
				</div>
			</div>
		)
	}
	return(
		<div class="col-sm-9">
			<div class="blog-post-area">
				<h2 class="title text-center">Latest From our Blog</h2>
				{fetchData()}
			</div>
			<Rate/>
			<div class="socials-share">
				<a href=""><img src="images/blog/socials.png" alt=""/></a>
			</div>
			<ListComment listComment={listComment} IdSubComment = {IdSubComment}/>
			<Comment getCmt={getCmt} idRely={idRely}/>
		</div>
    );
}
export default Detail;