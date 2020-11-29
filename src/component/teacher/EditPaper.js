import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Collapse, PageHeader, Button, Checkbox, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "antd/dist/antd.css"

import '../common/Common.css'
import * as Ajax from '../../util/Ajax'
import * as ProblemTypeEnum from '../../enum/ProblemTypeEnum'
import AddProblem from './AddProblem'

const { Panel } = Collapse

class EditPaper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            paper: null,
            fatherProblemId: null
        }
    }

    componentDidMount() {
        if (this.props.history.location.paperId != null) {
            this.getProblemsRequest(this.props.history.location.paperId)
        } else {
            message.warn('请先选择要编辑的试卷！');
            this.props.history.push('/paperList')
        }
    }

    getProblemsRequest = (paperId) => {
        Ajax.GET('/exam/paper/getByPaperId?paperId='+paperId, (res) => {
            this.setState({
                paper: res.data.object
            })
        }, this.props.history)
    }

    deleteProblemRequest = (paperId, problem) => {
        Ajax.DELETE('/exam/paper/deleteProblem?paperId='+paperId+'&problemId='+problem.id, (res) => {
            this.getProblemsRequest(paperId)
        }, this.props.history)
    }

    deleteButton = (problem) => (
        <DeleteOutlined onClick={(e) => {
            this.deleteProblemRequest(this.props.history.location.paperId, problem)
            e.stopPropagation()
        }} />
    );

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    subProblemList = (fatherProblem) => {
        let subProblems = fatherProblem.subProblems
        let other = (problem) => {
            if (problem.type === ProblemTypeEnum.CHOICE_PROBLEM) {
                let choices = JSON.parse(problem.answer)
                return choices.map((choice) => <Checkbox>{choice}</Checkbox>);
            } else {
                return null;
            }
        }
        let problemList = subProblems.map((problem) =>
            <Panel 
                header={'第' + problem.sort + '小题'} 
                key={problem.sort} 
                extra={this.deleteButton(problem)
            }>
                <h1>{problem.title}</h1>
                <p>{problem.material}</p>
                {other(problem)}
            </Panel>
        )
        return (
            <div>
                <Collapse>
                    {problemList}
                </Collapse>
                <br />
                <Button className="component-content-button" type="primary" onClick={() => {
                    this.setState({
                        visible: true,
                        fatherProblemId: fatherProblem.id
                    })
                }}>创建新试题</Button>
            </div>
        )
    }



    problemList = () => {
        if (this.state.paper != null) {
            let problems = this.state.paper.problems;
            let other = (problem) => {
                if (problem.type === ProblemTypeEnum.CHOICE_PROBLEM) {
                    let choices = JSON.parse(problem.answer)
                    return choices.map((choice) => <Checkbox>{choice}</Checkbox>);
                } else if (problem.type === ProblemTypeEnum.FATHER_PROBLEM) {
                    return this.subProblemList(problem);
                }
            }
            return (
                <Collapse>
                    {problems.map((problem) =>
                        <Panel 
                            header={'第' + problem.sort + '题'} 
                            key={problem.sort} 
                            extra={this.deleteButton(problem)}
                        >
                            <h1>{problem.title}</h1>
                            <p>{problem.material}</p>
                            {other(problem)}
                        </Panel>
                    )}
                </Collapse>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="createPaper">
                <PageHeader
                    className="site-page-header"
                    title="编辑试题"
                    onBack={() => this.props.history.goBack()}
                />
                <div className="component-content">
                    <this.problemList></this.problemList>
                    <br />
                    <Button className="component-content-button" type="primary" onClick={() => {
                        this.setState({
                            visible: true,
                            fatherProblemId: null
                        })
                    }}>创建新试题</Button>
                    <AddProblem
                        visible={this.state.visible}
                        paperId={this.props.history.location.paperId}
                        fatherProblemId={this.state.fatherProblemId}
                        visibleChange={() => {
                            this.setState({
                                visible: !this.state.visible,
                                fatherProblemId: null
                            })
                        }}
                        refreshProblems={this.getProblemsRequest}
                    />
                </div>
            </div>
        )
    }

}

export default withRouter(EditPaper)
