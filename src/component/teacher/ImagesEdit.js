import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css"
import * as Ajax from '../../util/Ajax' 

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class ImagesEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: []
        }
    }

    componentDidMount() {
        if (this.props.problemId != null && this.props.images != null) {
            let fileList = new Array();
            let fileUrls = JSON.parse(this.props.images);
            for (let index = 0; index < fileUrls.length; index++) {
                const fileUrl = fileUrls[index];
                fileList.push({
                    uid: 0-index,
                    name: 'image'+index+'.png',
                    status: 'done',
                    url: '/exam-img/'+fileUrl
                })
            }
            this.setState({
                fileList: fileList
            })
        }
    }

    deleteImageRequest = (file) => {
        for (let sort = 0; sort < this.state.fileList.length; sort++) {
            const element = this.state.fileList[sort];
            if(element.uid === file.uid) {
                Ajax.DELETE('/exam/paper/deleteImageInProblem?'+
                    'problemId='+this.props.problemId+
                    '&index='+sort, (res)=>{
                        this.setState({
                            fileList: this.state.fileList.filter(item => item.status!="removed")
                        })
                    }, this.props.history);
                    break;
            }
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action={'/exam/paper/addImageInProblem'+
                        '?problemId=' + this.props.problemId + 
                        '&index=' + this.state.fileList.length
                    }
                    name="imgFile"
                    method="PUT"
                    withCredentials
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.deleteImageRequest}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

export default withRouter(ImagesEdit)