import { useEffect, useState } from "react";
import axios from "axios"
import{useParams, Link } from "react-router-dom"
import Detail from "./Detail";

function ListComment(props){
	function scroll(e){
		props.IdSubComment(e.target.id)
		const element = document.getElementById('ms');
		if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
    	}
	}
	
	function fetchData(){
		if (props.listComment instanceof Object) {
			return Object.keys(props.listComment).map((key, value) => { 
				if(props.listComment[key].id_comment == 0){
					return(
						<>
						<li class="media">
							<a class="pull-left" href="#">
								<img class="media-object" style={{ width: '50px' }}
								src={"http://localhost/laravel/laravel/public/upload/user/avatar/"+props.listComment[key].image_user} alt=""
								/>
							</a>
							<div class="media-body">
								<ul class="sinlge-post-meta">
									<li><i class="fa fa-user"></i>{props.listComment[key].name_user}</li>
									<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
									<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
								</ul>
								<p>{props.listComment[key].comment}</p>
								<a onClick={scroll} id={props.listComment[key].id} class="btn btn-primary"><i class="fa fa-reply"></i>Replay</a>
							</div>
						</li>
						{
							Object.keys(props.listComment).map((key2, value2) => {
								if(props.listComment[key].id == props.listComment[key2].id_comment){
									return(
										<li class="media second-media">
										<a class="pull-left" href="#">
											<img class="media-object" style={{ width: '50px' }}
											src={"http://localhost/laravel/laravel/public/upload/user/avatar/"+props.listComment[key2].image_user} alt=""
											/>
										</a>
											<div class="media-body">
												<ul class="sinlge-post-meta">
													<li><i class="fa fa-user"></i>{props.listComment[key2].name_user}</li>
													<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
													<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
												</ul>
												<p>{props.listComment[key2].comment}</p>
												<a onClick={scroll} id={props.listComment[key2].id} class="btn btn-primary"><i class="fa fa-reply"></i>Replay</a>
											</div>
										</li>
									)
								}
							})
						}
						</>
					)
				}
				
			})
		}
	}

    return(
        <div class="response-area">
			<h2>3 RESPONSES</h2>
			<ul class="media-list">
				{fetchData()}
			</ul>					
		</div>
    )
}
export default ListComment