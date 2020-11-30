import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Row, Col, Input, Button, PageHeader, Statistic, Form } from 'antd';
import "antd/dist/antd.css"

import '../common/Common.css'
import * as Ajax from '../../util/Ajax'
import * as PaperStateEnum from '../../enum/PaperStateEnum';

const { Search } = Input;

class SearchPaper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            paper: null
        }
    }

    searchPaperRequest = (code) => {
        Ajax.GET('/exam/paper/getByCode?code=' + code, (res) => {
            this.setState({
                paper: res.data.object
            })
        }, this.props.history)
    }

    showPaper = (props) => {
        if (props.paper == null) {
            return (<></>)
        } else {
            let paper = props.paper
            return (
                <div>
                    <Row>
                        <Col span={6}>
                            <Statistic title="试卷标题" value={paper.title} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="作答时长" value={paper.time + '分钟'} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="创建人" value={paper.creator.name} />
                        </Col>
                        <Col span={6}>
                            <br></br>
                            {(paper.state === PaperStateEnum.ANSWERING || paper.state === PaperStateEnum.READY_TO_ANSWERING) ?
                                <Button type="primary" onClick={() => {
                                    this.props.history.push({
                                        pathname: '/createPaperAnswer',
                                        paper: this.state.paper
                                    })
                                }}>开始作答</Button>
                                :
                                <Button type="primary" disabled>试卷作答结束</Button>
                            }
                        </Col>
                    </Row>
                </div>
            )
        }
    }

    render() {
        return (
            <div>

                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="搜索试卷"
                />
                <div className="component-content">
                    <Form
                        className="searchPaper-form"
                    >
                        <Search
                            placeholder="输入试卷编号"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            onSearch={this.searchPaperRequest}
                            onChange={() => {
                                this.setState({
                                    paper: null
                                })
                            }}
                            maxLength='6'
                        />
                        <this.showPaper paper={this.state.paper} />
                    </Form>
                </div>
            </div>
        );
    }

}

export default withRouter(SearchPaper)
