import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Button, Modal, Form, Radio, Input, Tag } from 'antd';
import "antd/dist/antd.css"
import { PlusOutlined } from '@ant-design/icons';

import '../common/Common.css'
import * as Ajax from '../../util/Ajax'
import * as ProblemTypeEnum from '../../enum/ProblemTypeEnum'

const { TextArea } = Input;

class EditProblem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collection: [],
            inputVisible: false,
            inputValue: '',
        }
    }

    componentDidMount() {
        if(this.props.editProblem != null) {
            this.setState({collection: JSON.parse(this.props.editProblem.answer)})
        }
    }

    onFinish = (values) => {
        var answer = null;
        if(this.props.editProblem!=null && this.props.editProblem.type === ProblemTypeEnum.CHOICE_PROBLEM) {
            answer = JSON.stringify(this.state.collection);
        }
        Ajax.POST('/exam/paper/editProblem', {
            problemId: this.props.editProblem.id,
            title: values.title,
            material: values.material,
            answer: answer
        }, (res) => {
            this.props.refreshProblems(this.props.paperId)
            this.props.visibleChange()
        }, this.props.history);
    }

    handleClose = removedTag => {
        const collection = this.state.collection.filter(tag => tag !== removedTag);
        this.setState({ collection });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { collection } = this.state;
        if (inputValue && collection.indexOf(inputValue) === -1) {
            collection = [...collection, inputValue];
        }
        this.setState({
            collection,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => {
        this.input = input;
    };

    forMap = tag => {
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                <Tag
                    closable
                    onClose={e => {
                        e.preventDefault();
                        this.handleClose(tag);
                    }}
                >
                    {tag}
                </Tag>
            </span>
        );
    };

    otherForm = (props) => {
        if(props.editProblem == null) {
            return <div/>
        }
        const { collection, inputVisible, inputValue } = this.state;
        if (props.editProblem.type === ProblemTypeEnum.CHOICE_PROBLEM) {
            return (
                <Form.Item label="选项">
                    <div style={{ marginBottom: 16 }}>
                        {collection.map(this.forMap)}
                        {inputVisible && (
                            <Input
                                ref={this.saveInputRef}
                                type="text"
                                size="small"
                                style={{ width: 78 }}
                                value={inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}
                                onPressEnter={this.handleInputConfirm}
                            />
                        )}
                        {!inputVisible && (
                            <Tag onClick={this.showInput} className="site-tag-plus">
                                <PlusOutlined /> 添加新的选项
                            </Tag>
                        )}
                    </div>
                </Form.Item>
            );
        } else {
            return (<div />);
        }
    }

    render() {
        var title = null;
        var material = null;
        if(this.props.editProblem != null) {
            title = this.props.editProblem.title;
            material = this.props.editProblem.material;
        }
        return (
            <div>
                <Modal
                    title="修改试题"
                    visible={this.props.editProblem != null}
                    footer={null}
                    onOk={()=>this.props.visibleChange()}
                    onCancel={()=>this.props.visibleChange()}
                >
                    <Form
                        name="create-problem-form"
                        onFinish={this.onFinish}
                        initialValues={{
                            title: title,
                            material: material
                        }}
                    >
                        <Form.Item
                            name="title"
                            label="题目标题"
                            rules={[{ required: true, message: '请输入标题' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="material"
                            label="题目材料"
                            rules={[{ required: true, message: '请输入材料' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <this.otherForm editProblem={this.props.editProblem}></this.otherForm>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="component-content-button">
                                修改
                        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default withRouter(EditProblem)