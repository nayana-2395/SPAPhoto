import React, { Component } from 'react';

import { photoService } from '@/_services';

class ListPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            photos: [],
            comaparisionList: []
        };
    }

	componentDidMount() {
        this.getPhoto();
    }
    
    getPhoto = () => {
        photoService.getAll().then(response => {
            // var photos=[];
            // if(response.length>0){
            //     for(var i=0;i<=5;i++){
            //         photos.push(response[i])
            //     }
            // }
            this.setState({photos: response})
		}).catch(error => {
			console.log(error);
		})
    }

    handleButtonClickEvent = (event , details) => {
        var comaparisionList = this.state.comaparisionList;
        var photoId = event.target.value;
        if($('#box_'+photoId).text() == 'COMPARE'){
            comaparisionList.push(details);
            $('#box_'+photoId).html('REMOVE');
        }
        else{
            var index = comaparisionList.findIndex(function(item){
                return item.id == photoId;
            })
            if (index !== -1) comaparisionList.splice(index, 1);
            $('#box_'+photoId).html('COMPARE');
        }
        this.setState({comaparisionList: comaparisionList})
    }
	
    render () {
        const {photos, isloading, comaparisionList} = this.state;
        return (
			<div>
				<div className="min-height" style={{background:'#f4f6f9'}}>
                    <div className="content-header">
                        <div className="container">
                            <section className="content">
                        
                                <div style={{paddingTop:'30px',paddingBottom:'30px'}}>
									<div className="text-center">
										<h3>Image/Photo Comparison SPA</h3>
                                        
									</div>
                                    <div>
                                        {comaparisionList.length > 0 ? 
                                    <table className="striped bordered hover">
                                        <thead>
                                            <tr>
                                            <th>#</th>
                                            <th>Photo title</th>
                                            <th>Photo URL</th>
                                            <th>Thumbnail URL</th>
                                            <th>Photo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comaparisionList && comaparisionList.length > 0 &&
                                            comaparisionList.map((photo, index) =>
                                                <tr key={index}>
                                                    <td>{photo.id}</td>
                                                    <td>{photo.title}</td>
                                                    <td>{photo.url}</td>
                                                    <td>{photo.thumbnailUrl}</td>
                                                    <td><img src={photo.thumbnailUrl} /></td>
                                                </tr>
                                            )}
                                         
                                        </tbody>
                                        </table>
                                    :"No Record Added"}
                                    </div>
                                    <div className="row">
                                        {isloading?
                                            <div>Loading... Please wait</div>
                                        :
                                            photos && photos.length > 0 ?
                                            photos.map((photo, index) =>
                                              <div className="col-lg-4" key={index}>
                                                  <div>
                                                      <img src={photo.thumbnailUrl} />
                                                  </div>
                                                  <div>{photo.title}</div>
                                                  <div>{photo.id}</div>
                                                  <div>{photo.url}</div>
                                                  <div>
                                                      <button id={'box_'+photo.id} value={photo.id} onClick={(e) => this.handleButtonClickEvent(e, photo)}>COMPARE</button>
                                                  </div>
                                              </div>
                                            )
                                        : "No record Found!"
                                        }
                                    </div>
                                    
                                </div>
                            </section>
                            
                        </div>
                    </div>
                </div>
			</div>
        )
    }
}

export { ListPhoto };