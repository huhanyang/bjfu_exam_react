import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Button, Modal, Form, Radio, Input, Tag } from 'antd';
import "antd/dist/antd.css"
import { PlusOutlined } from '@ant-design/icons';

import '../common/Common.css'
import * as Ajax from '../../util/Ajax'
import * as ProblemTypeEnum from '../../enum/ProblemTypeEnum'

const { TextArea } = Input;

class AddProblem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: null,
            collection: [],
            inputVisible: false,
            inputValue: '',
        }
    }

    onFinish = (values) => {
        Ajax.PUT('/exam/paper/addProblem', {
            paperId: this.props.paperId,
            fatherProblemId: this.props.fatherProblemId,
            title: values.title,
            material: values.material,
            type: values.type,
            answer: JSON.stringify(this.state.collection)
        }, (res) => {
            this.props.refreshProblems(this.props.paperId)
            this.props.visibleChange()
        }, this.props.history)
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
        const { collection, inputVisible, inputValue } = this.state;
        if (props.type === ProblemTypeEnum.CHOICE_PROBLEM) {
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

    problemTypeRadio = (fatherProblemId) => {
        if (fatherProblemId != null) {
            return (
                <>
                    <Radio.Button value={ProblemTypeEnum.CHOICE_PROBLEM}>选择题</Radio.Button>
                    <Radio.Button value={ProblemTypeEnum.MATERIAL_PROBLEM}>材料题</Radio.Button>
                </>
            )
        } else {
            return (
                <>
                    <Radio.Button value={ProblemTypeEnum.CHOICE_PROBLEM}>选择题</Radio.Button>
                    <Radio.Button value={ProblemTypeEnum.MATERIAL_PROBLEM}>材料题</Radio.Button>
                    <Radio.Button value={ProblemTypeEnum.FATHER_PROBLEM}>组合题</Radio.Button>
                </>
            )
        }
    }

    render() {
        return (
            <div>
                <Modal
                    title="创建试题"
                    visible={this.props.visible}
                    onOk={()=>this.props.visibleChange()}
                    onCancel={()=>this.props.visibleChange()}
                >
                    <Form
                        name="create-problem-form"
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            label="题目类型"
                            name="type"
                            rules={[{ required: true, message: '选择要创建的题目类型' }]}
                        >
                            <Radio.Group onChange={e => {
                                this.setState({
                                    type: e.target.value
                                })
                            }}
                            >
                                {this.problemTypeRadio(this.props.fatherProblemId)}
                            </Radio.Group>
                        </Form.Item>
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
                        <this.otherForm type={this.state.type}></this.otherForm>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="component-content-button">
                                创建试题
                        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default withRouter(AddProblem)