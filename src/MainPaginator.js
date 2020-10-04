/*
 * Copyright 2020 Inspire-Software.com
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */


import React from 'react';

import Pagination from 'react-bootstrap/Pagination'

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class MainPaginator extends React.Component {
  
	
  render(){	   	
  
    //console.info('Renderer ' , this.props.totalItems, this.props.onPage, this.props.currentPage, this.props.length, this.props.onSelect);
	
	
	let onSelectHandler = this.props.onSelect;
	let pages = Math.ceil(this.props.totalItems / this.props.onPage) ;
	
	let lastPageIdx = pages - 1;
	
	let nextPageIdx = this.props.currentPage + 1;
	if (nextPageIdx > lastPageIdx) {
		nextPageIdx = lastPageIdx;
	}
	let prevPageIdx = this.props.currentPage - 1;
	if (prevPageIdx < 0) {
		prevPageIdx = 0;
	}
	
	let startPageIdx = this.props.currentPage - Math.round(this.props.length / 2);
	if (startPageIdx < 0) {
		startPageIdx = 0;
	}
	
	let endPageIdx = startPageIdx + this.props.length;
	if (endPageIdx > lastPageIdx) {
		endPageIdx = lastPageIdx;
	}

	let arr = [];	   
	for (var i = startPageIdx; i <= endPageIdx; i++) {
		arr.push( {idx : i ,  className : ( (i === this.props.currentPage)?'active':''  ) } );
	}
	
		
    return (
      <React.Fragment>
	  {
		<Pagination>
			<Pagination.First onClick={ () => onSelectHandler(0)} />
			<Pagination.Prev onClick={ () => onSelectHandler(prevPageIdx)} />  
			{
				arr.map(function(item, index){
					return <Pagination.Item onClick={ () => onSelectHandler(item.idx)} className={item.className} key={index}>{item.idx + 1}</Pagination.Item>
				})
			}
		    <Pagination.Next onClick={ () => onSelectHandler(nextPageIdx)}/>
		    <Pagination.Last onClick={ () => onSelectHandler(endPageIdx)}/>
		</Pagination>
		  
	  }
      </React.Fragment>
    );
  }  
}


export default MainPaginator;



